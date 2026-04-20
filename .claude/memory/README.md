# 에이전트 메모리

이 디렉토리는 에이전트가 **읽고** 학습하는 팀 지식 저장소다. `memory-curator`가 머지된 PR의 피드백에서 새 항목을 추출해 업데이트 PR을 자동 제안하고, 사람이 검토 후 머지한다.

## 파일

| 파일 | 내용 | 업데이트 빈도 | 승인 |
|---|---|---|---|
| `conventions.md` | 코드/네이밍/에러/테스트 규칙 | 머지된 PR마다 | 사람 승인 |
| `decisions.md` | 아키텍처 결정 기록 (ADR) | 큰 결정 시 | 사람 작성 |
| `lessons.md` | 과거 실수와 교훈 | 머지된 PR마다 | 자동 가능 |
| `patterns.md` | 승인된 설계 패턴 + 예시 | 새 패턴 합의 시 | 사람 승인 |
| `CHANGELOG.md` | 메모리 변경 이력 | 업데이트마다 | 자동 |

## 항목 ID 규칙

- 컨벤션: `CONV-001`, `CONV-002`, ...
- ADR: `ADR-001`, `ADR-002`, ...
- 교훈: `LESSON-001`, `LESSON-002`, ...
- 패턴: `PATTERN-001`, `PATTERN-002`, ...

ID는 삭제/재사용하지 않는다. deprecated된 항목은 `status: deprecated`로 표기만 하고 남겨둔다 (과거 PR의 인용 깨지지 않도록).

## 신뢰도 (confidence)

`conventions.md`의 각 항목에는 0.0~1.0 사이의 신뢰도가 있다.

- **0.0~0.4**: 권고. BLOCK 사유로 사용 불가. `REQUEST_CHANGES`까지.
- **0.5~0.7**: 표준. 반박 가능하지만 근거 필요.
- **0.8~1.0**: 강제. BLOCK 가능. 변경은 ADR 필요.

자동 업데이트는 0.7까지만 가능하다. 그 이상은 사람 승인.

## 에이전트별 읽기 권장 전략

| 에이전트 | 주로 참조 |
|---|---|
| planner | decisions.md, patterns.md, conventions.md |
| implementer | conventions.md, patterns.md, lessons.md |
| architect-reviewer | decisions.md, patterns.md |
| security-reviewer | conventions.md (security), lessons.md (보안 태그) |
| performance-reviewer | conventions.md (performance), lessons.md (성능 태그) |
| convention-keeper | 전부 |
| test-engineer | conventions.md (testing), lessons.md (테스트 누락 태그) |
| memory-curator | 전부 (업데이트 대상 식별) |

## 과학습 방지

- 한 PR에서 추가되는 항목 수 제한: convention 5개, lesson 3개, pattern 2개
- 프로젝트-특수 1회성 지적은 추가 금지
- 서로 모순되는 규칙은 `decisions.md`에 ADR로 올려 사람 결정

## 수동 편집

사람이 수동으로 편집할 때는:

1. 변경 사유를 `CHANGELOG.md`에 기록
2. PR로 제출 (직접 push 금지)
3. `confidence` 조정 시 이유 명시
