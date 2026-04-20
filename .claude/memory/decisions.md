# Architectural Decision Records (ADR)

큰 아키텍처/설계 결정을 기록한다. 에이전트는 **읽기만** 한다. 새 ADR은 사람이 작성하고 PR로 제출한다 (`memory-curator`는 제안만).

## 포맷

각 ADR은 아래 템플릿을 따른다:

```markdown
## ADR-XXX: <제목>
- **Status**: proposed | accepted | deprecated | superseded-by ADR-YYY
- **Date**: YYYY-MM-DD
- **Authors**: <이름들>

### Context
<문제 배경 — 왜 결정이 필요했나>

### Decision
<무엇을 결정했는가>

### Alternatives Considered
- **A**: 설명 + 선택하지 않은 이유
- **B**: 설명 + 선택하지 않은 이유

### Consequences
- Positive: ...
- Negative: ...
- Migration: <기존 코드에 대한 영향과 이행 계획>

### Related
- LESSON-XXX, PATTERN-XXX
```

---

## 예시 시드 ADR

## ADR-001: 도메인 레이어의 에러 전달 방식
- **Status**: accepted
- **Date**: seed
- **Authors**: 팀

### Context
도메인 로직에서 발생하는 실패(예: 유효성 오류, 도메인 규칙 위반)가 예외로 던져지면 상위 레이어에서 놓치거나 변환 비용이 크다.

### Decision
도메인 레이어 함수는 `Result<T, DomainError>` 타입을 반환한다. 인프라 레이어(DB, 외부 API)는 예외를 던질 수 있지만 반드시 어댑터에서 `Result`로 변환한다.

### Alternatives Considered
- **예외 기반**: 간단하지만 타입 시스템이 실패 경로를 드러내지 않음.
- **콜백 기반**: 중첩 증가.

### Consequences
- Positive: 타입 체커가 실패 처리 누락을 감지.
- Negative: 보일러플레이트 증가, `Result` 유틸리티 필요.
- Migration: 신규 코드부터 적용. 기존 코드는 건드리는 PR에서 점진 변환.

### Related
- CONV-002, LESSON-001

---

## ADR-002: 배포 단위
- **Status**: accepted
- **Date**: seed

### Context
서비스가 한 모놀리스로 배포되면서 사소한 변경에도 전체 배포가 필요했다.

### Decision
도메인 경계로 서비스를 분리하되, 공통 컴포넌트(인증, 로깅, 공통 유틸)는 모놀리스에 남긴다. 새 도메인은 분리된 서비스로 시작.

### Alternatives Considered
- 전체 마이크로서비스화 — 운영 비용 과다.
- 현상 유지 — 배포 병목 지속.

### Consequences
- Positive: 독립 배포, 장애 격리.
- Negative: 서비스 간 계약 관리 필요.
- Migration: 신규 도메인만 분리. 기존 도메인은 필요 시점에 분리 검토.

### Related
- CONV-006

---

## ADR 작성 트리거

`memory-curator`가 다음을 감지하면 ADR 작성을 제안한다:

- 동일 영역에서 서로 모순되는 컨벤션이 2개 이상 등록됨
- 같은 설계 결정을 놓고 여러 PR에서 반복 토론
- 기존 ADR에 충돌하는 구현이 머지됨
