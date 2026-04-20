"""에이전트가 이벤트를 log.jsonl에 append할 때 사용하는 헬퍼.

사용 예 (파이썬):
    from log_helpers import log_event
    log_event("agent_verdict", agent="architect-reviewer", round=1,
              verdict="BLOCK", concern_count=2, run_id=run_id, stage=3)

Bash에서 사용할 때는 log_event_cli()를 통해:
    python log_helpers.py agent_verdict --agent=architect-reviewer \\
        --round=1 --verdict=BLOCK --concern_count=2 \\
        --run_id="$RUN_ID" --stage=3
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

LOG_PATH = Path(os.environ.get(
    "CLAUDE_METRICS_LOG",
    ".claude/metrics/log.jsonl",
))


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def log_event(event: str, **fields: Any) -> None:
    """이벤트 한 줄을 JSONL로 append."""
    record: dict[str, Any] = {
        "ts": _now_iso(),
        "event": event,
    }
    # 흔히 쓰이는 상위 필드를 승격
    for key in ("run_id", "agent", "stage"):
        if key in fields:
            record[key] = fields.pop(key)
    record.update(fields)

    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")


def log_event_cli() -> int:
    """커맨드라인 진입점."""
    parser = argparse.ArgumentParser(
        description="한 이벤트를 log.jsonl에 append합니다."
    )
    parser.add_argument("event", help="event type (예: run_start, agent_verdict)")
    parser.add_argument(
        "--field",
        action="append",
        default=[],
        help="key=value 형식으로 여러 번 전달 가능 (값은 JSON으로 파싱 시도)",
    )
    args, _ = parser.parse_known_args()

    fields: dict[str, Any] = {}
    for kv in args.field:
        if "=" not in kv:
            print(f"잘못된 --field 형식: {kv}", file=sys.stderr)
            return 2
        key, value = kv.split("=", 1)
        # JSON으로 파싱 시도, 실패하면 문자열로
        try:
            fields[key] = json.loads(value)
        except json.JSONDecodeError:
            fields[key] = value

    log_event(args.event, **fields)
    return 0


if __name__ == "__main__":
    raise SystemExit(log_event_cli())
