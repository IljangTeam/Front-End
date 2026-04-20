"""log.jsonl을 읽어 aggregated.json을 생성한다.

사용:
    python collect.py
    python collect.py --range "--last-30-days"
    python collect.py --range "--run 20260417T102300-issue-123"

산출물: .claude/metrics/aggregated.json
"""

from __future__ import annotations

import argparse
import json
import os
import re
import statistics
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any, Iterable

LOG_PATH = Path(os.environ.get(
    "CLAUDE_METRICS_LOG",
    ".claude/metrics/log.jsonl",
))
OUT_PATH = Path(os.environ.get(
    "CLAUDE_METRICS_AGG",
    ".claude/metrics/aggregated.json",
))


def _parse_ts(s: str) -> datetime:
    # "2026-04-17T10:23:45.123Z" 형식
    if s.endswith("Z"):
        s = s[:-1] + "+00:00"
    return datetime.fromisoformat(s)


def _iter_events(path: Path) -> Iterable[dict]:
    if not path.exists():
        return
    with path.open("r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                yield json.loads(line)
            except json.JSONDecodeError:
                continue


def _filter_by_range(events: list[dict], range_spec: str | None) -> list[dict]:
    if not range_spec:
        # 기본: 지난 30일
        cutoff = datetime.now(timezone.utc) - timedelta(days=30)
        return [e for e in events if _parse_ts(e["ts"]) >= cutoff]

    m = re.match(r"--last-(\d+)-days?", range_spec)
    if m:
        days = int(m.group(1))
        cutoff = datetime.now(timezone.utc) - timedelta(days=days)
        return [e for e in events if _parse_ts(e["ts"]) >= cutoff]

    m = re.match(r"--since\s+(.+)", range_spec)
    if m:
        cutoff = _parse_ts(m.group(1))
        return [e for e in events if _parse_ts(e["ts"]) >= cutoff]

    m = re.match(r"--run\s+(\S+)", range_spec)
    if m:
        run_id = m.group(1)
        return [e for e in events if e.get("run_id") == run_id]

    return events


def aggregate(events: list[dict]) -> dict[str, Any]:
    """이벤트 리스트에서 지표를 계산."""
    runs: dict[str, dict] = defaultdict(lambda: {
        "run_id": None,
        "trigger": None,
        "issue_number": None,
        "pr_url": None,
        "outcome": None,
        "duration_ms": None,
        "stages": {},
        "reviewer_verdicts": defaultdict(list),  # agent -> [verdict, ...]
        "counter_arguments": 0,
        "memory_reads": 0,
        "memory_read_ids": set(),
        "escalations": 0,
        "commits": 0,
        "failures": [],
        "start_ts": None,
        "end_ts": None,
    })

    for e in events:
        rid = e.get("run_id")
        if not rid:
            continue
        r = runs[rid]
        r["run_id"] = rid
        ts = e.get("ts")

        ev = e.get("event")

        if ev == "run_start":
            r["trigger"] = e.get("trigger")
            r["issue_number"] = e.get("issue_number")
            r["start_ts"] = ts
        elif ev == "run_end":
            r["outcome"] = e.get("outcome")
            r["pr_url"] = e.get("pr_url")
            r["duration_ms"] = e.get("duration_ms")
            r["end_ts"] = ts
        elif ev == "stage_end":
            stage = e.get("stage")
            r["stages"][stage] = {
                "outcome": e.get("outcome"),
                "rounds": e.get("rounds"),
                "duration_ms": e.get("duration_ms"),
            }
        elif ev == "agent_verdict":
            agent = e.get("agent")
            r["reviewer_verdicts"][agent].append({
                "round": e.get("round"),
                "verdict": e.get("verdict"),
                "concern_count": e.get("concern_count"),
            })
        elif ev == "counter_argument":
            r["counter_arguments"] += 1
        elif ev == "memory_read":
            r["memory_reads"] += 1
            for mid in e.get("ids", []) or []:
                r["memory_read_ids"].add(mid)
        elif ev == "escalation":
            r["escalations"] += 1
        elif ev == "commit_created":
            r["commits"] += 1
        elif ev == "stage_failure":
            r["failures"].append({
                "stage": e.get("stage"),
                "reason": e.get("reason"),
            })

    # 집계
    total_runs = len(runs)
    outcomes = Counter((r["outcome"] or "unknown") for r in runs.values())

    stage1_rounds = [
        r["stages"].get(1, {}).get("rounds")
        for r in runs.values()
        if r["stages"].get(1, {}).get("rounds") is not None
    ]
    stage3_rounds = [
        r["stages"].get(3, {}).get("rounds")
        for r in runs.values()
        if r["stages"].get(3, {}).get("rounds") is not None
    ]

    durations = [
        r["duration_ms"] for r in runs.values()
        if r["duration_ms"] is not None
    ]

    memory_hits = sum(1 for r in runs.values() if r["memory_reads"] > 0)

    # 리뷰어별 approve율 (마지막 verdict 기준)
    reviewer_stats: dict[str, dict] = defaultdict(lambda: {
        "approve": 0, "request_changes": 0, "block": 0, "total": 0
    })
    for r in runs.values():
        for agent, verdicts in r["reviewer_verdicts"].items():
            if not verdicts:
                continue
            last = verdicts[-1]["verdict"]
            reviewer_stats[agent]["total"] += 1
            if last == "APPROVE":
                reviewer_stats[agent]["approve"] += 1
            elif last == "REQUEST_CHANGES":
                reviewer_stats[agent]["request_changes"] += 1
            elif last == "BLOCK":
                reviewer_stats[agent]["block"] += 1

    def pct(n: int, d: int) -> float:
        return round(n / d * 100, 1) if d else 0.0

    # 사람-일치율 근사 (APPROVE+머지=일치, BLOCK+미머지=일치)
    # 정확한 계산은 GitHub API에서 각 PR의 merge 여부를 확인해야 함 → 여기선 run outcome으로 근사
    reviewer_agreement: dict[str, dict] = {}
    for agent, st in reviewer_stats.items():
        # 실제론 PR별 머지 여부와 비교해야 하지만 여기선 run outcome=approved일 때만 일치로 가정
        matched = 0
        total_with_outcome = 0
        for r in runs.values():
            agent_verdicts = r["reviewer_verdicts"].get(agent) or []
            if not agent_verdicts:
                continue
            last = agent_verdicts[-1]["verdict"]
            outcome = r.get("outcome")
            if outcome is None:
                continue
            total_with_outcome += 1
            if (last == "APPROVE" and outcome == "approved") or (
                last in ("BLOCK", "REQUEST_CHANGES") and outcome in ("blocked", "escalated")
            ):
                matched += 1
        reviewer_agreement[agent] = {
            "approve_rate": pct(st["approve"], st["total"]),
            "block_rate": pct(st["block"], st["total"]),
            "human_agreement": pct(matched, total_with_outcome) if total_with_outcome else None,
        }

    # 에스컬레이션 사유 top
    escalation_reasons = Counter()
    for e in events:
        if e.get("event") == "escalation":
            escalation_reasons[e.get("reason", "unknown")] += 1

    auto_merge_rate = pct(outcomes.get("approved", 0), total_runs)

    result = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_runs": total_runs,
        "outcomes": dict(outcomes),
        "auto_merge_rate_pct": auto_merge_rate,
        "avg_rounds_stage1": round(statistics.mean(stage1_rounds), 2) if stage1_rounds else None,
        "avg_rounds_stage3": round(statistics.mean(stage3_rounds), 2) if stage3_rounds else None,
        "median_duration_ms": statistics.median(durations) if durations else None,
        "p95_duration_ms": (
            round(statistics.quantiles(durations, n=20)[18])
            if len(durations) >= 20 else None
        ),
        "memory_hit_rate_pct": pct(memory_hits, total_runs),
        "reviewer_stats": dict(reviewer_stats),
        "reviewer_agreement": reviewer_agreement,
        "top_escalation_reasons": escalation_reasons.most_common(5),
        "runs": [
            {
                "run_id": r["run_id"],
                "outcome": r["outcome"],
                "issue_number": r["issue_number"],
                "pr_url": r["pr_url"],
                "start_ts": r["start_ts"],
                "end_ts": r["end_ts"],
                "duration_ms": r["duration_ms"],
                "rounds": {k: v.get("rounds") for k, v in r["stages"].items()},
                "memory_reads": r["memory_reads"],
                "memory_ids_count": len(r["memory_read_ids"]),
                "escalations": r["escalations"],
                "counter_arguments": r["counter_arguments"],
                "failures": r["failures"],
            }
            for r in runs.values()
        ],
        "warnings": _detect_warnings(runs, reviewer_agreement, auto_merge_rate),
    }

    return result


def _detect_warnings(
    runs: dict[str, dict],
    reviewer_agreement: dict[str, dict],
    auto_merge_rate: float,
) -> list[str]:
    warnings = []

    for agent, st in reviewer_agreement.items():
        ha = st.get("human_agreement")
        if ha is not None and ha < 60:
            warnings.append(
                f"[reviewer] {agent}의 사람-일치율이 {ha}%로 낮음. 프롬프트 튜닝 필요."
            )

    # 메모리 히트율
    total = len(runs)
    memory_hits = sum(1 for r in runs.values() if r["memory_reads"] > 0)
    hit_rate = (memory_hits / total * 100) if total else 0
    if total > 5 and hit_rate < 10:
        warnings.append(f"[memory] 히트율 {hit_rate:.1f}%. 메모리가 실효적으로 쓰이지 않음.")

    # 에스컬레이션 비율
    escalated = sum(1 for r in runs.values() if (r.get("outcome") == "escalated") or r["escalations"])
    if total > 5 and escalated / total > 0.25:
        warnings.append(
            f"[escalation] 에스컬레이션 비율 {escalated/total*100:.1f}%. 이슈가 너무 크거나 계획 품질 낮음."
        )

    if auto_merge_rate < 30 and total > 10:
        warnings.append(f"[outcome] 자동 머지율 {auto_merge_rate}%. 리뷰어 기준이 너무 엄격할 수 있음.")

    return warnings[:3]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--range", default=None,
                        help="예: --last-30-days, --since 2026-04-01T00:00:00Z, --run <id>")
    args = parser.parse_args()

    events = list(_iter_events(LOG_PATH))
    events = _filter_by_range(events, args.range)

    result = aggregate(events)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PATH.open("w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"집계 완료: {OUT_PATH}")
    print(f"총 실행 수: {result['total_runs']}, 자동 머지율: {result['auto_merge_rate_pct']}%")
    if result["warnings"]:
        print("경고:")
        for w in result["warnings"]:
            print(f"  - {w}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
