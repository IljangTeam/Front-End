# Metrics & Observability

모든 에이전트 실행의 이벤트를 JSONL 로그로 남기고, 집계해서 HTML 대시보드로 본다.

## 파일

| 파일 | 역할 |
|---|---|
| `log_helpers.py` | 에이전트가 이벤트를 한 줄씩 append할 때 쓰는 헬퍼 |
| `collect.py` | `log.jsonl`을 집계해 `aggregated.json` 생성 |
| `dashboard.html` | `aggregated.json`을 fetch해 차트로 렌더링 |
| `log.jsonl` | 런타임에 생성되는 이벤트 로그 (gitignore) |
| `aggregated.json` | `collect.py` 산출물 (gitignore) |

## 이벤트 스키마

`log.jsonl`의 각 줄은 JSON 객체.

### 공통 필드

```json
{
  "ts": "2026-04-17T10:23:45.123Z",
  "run_id": "20260417T102300-issue-123",
  "event": "<event_type>",
  "agent": "<agent_name or 'orchestrator'>",
  "stage": 1 | 2 | 3 | null
}
```

### 이벤트 종류

#### `run_start`
```json
{"event": "run_start", "run_id": "...", "trigger": "manual|label|schedule", "issue_number": 123}
```

#### `run_end`
```json
{"event": "run_end", "run_id": "...", "outcome": "approved|blocked|escalated|failed", "pr_url": "...", "duration_ms": 12345}
```

#### `stage_start` / `stage_end`
```json
{"event": "stage_end", "stage": 1, "outcome": "approved_round_2", "rounds": 2, "duration_ms": 4567}
```

#### `agent_verdict`
```json
{"event": "agent_verdict", "agent": "architect-reviewer", "round": 1, "verdict": "BLOCK", "concern_count": 2, "concerns_critical": 1}
```

#### `counter_argument`
```json
{"event": "counter_argument", "round": 2, "concern_id": "c-042", "response": "COUNTER", "evidence_count": 2}
```

#### `memory_read`
```json
{"event": "memory_read", "agent": "implementer", "file": "conventions.md", "ids": ["CONV-002", "CONV-007"]}
```

#### `memory_write`
```json
{"event": "memory_write", "file": "conventions.md", "added": 1, "updated": 2, "source_pr": 456}
```

#### `escalation`
```json
{"event": "escalation", "stage": 3, "reason": "deadlock_between_architect_and_security", "round": 3}
```

#### `commit_created`
```json
{"event": "commit_created", "sha": "abc1234", "unit_index": 2, "message": "feat: ..."}
```

#### `stage_failure`
```json
{"event": "stage_failure", "stage": 2, "reason": "tests_failed_after_3_retries"}
```

## 핵심 지표 정의

- **자동 머지율** = 사람 수정 없이 머지된 PR 수 / 전체 머지 PR 수
- **사람-일치율(리뷰어별)** = 리뷰어의 verdict와 사람의 최종 판단이 일치한 건 / 해당 리뷰어 전체 verdict
  - APPROVE vs 사람이 머지 → 일치
  - BLOCK vs 사람이 머지 거부/큰 수정 → 일치
- **평균 토론 라운드** = Stage별 `stage_end.rounds`의 평균
- **메모리 히트율** = `memory_read`가 최소 1회 발생한 run 수 / 전체 run 수

## 가독성을 위한 규칙

- 숫자에만 의존하지 말 것: 경고 패턴이 감지되면 원인 샘플을 같이 보여준다.
- 기간 비교를 항상 포함: 이번 주 vs 지난 주, 이번 달 vs 지난 달.
- **프라이버시**: 사용자 이름/이메일/이슈 본문은 로그에 기록하지 말고 이슈/PR 번호만.

## 보존/로테이션

- `log.jsonl`이 100MB를 초과하면 `log.YYYYMMDD.jsonl.gz`로 압축 이동.
- `aggregated.json`은 최근 90일 + 전체 요약 두 블록으로 구성.
