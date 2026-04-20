# Conventions

팀이 합의한 코드/프로세스 규칙. 각 항목은 `memory-curator`에 의해 자동 생성/업데이트되고 사람이 승인한다.

---

## 사용 방법

- 각 항목은 고유 ID(`CONV-XXX`), 카테고리, `confidence`, 소스 PR 목록을 가진다.
- 에이전트가 이 파일을 읽을 때는 카테고리와 태그로 필터링한다.
- 위반 지적 시 반드시 해당 ID를 인용해야 한다.

## 카테고리

`code-style`, `naming`, `error-handling`, `testing`, `pr-etiquette`, `api-design`, `security`, `performance`, `logging`, `documentation`

---

## 예시 시드 항목 (팀 상황에 맞게 교체)

### CONV-001
- **category**: `naming`
- **rule**: 파일/디렉토리 이름은 `kebab-case`로 작성한다. 단, React 컴포넌트 파일은 `PascalCase.tsx`를 쓴다.
- **rationale**: 팀 코드베이스 전반이 이미 이 컨벤션을 따르고 있어 일관성을 유지해야 한다.
- **confidence**: 0.9
- **source_prs**: [seed]
- **status**: active

### CONV-002
- **category**: `error-handling`
- **rule**: 도메인 레이어의 함수는 `Result<T, DomainError>` 타입을 반환한다. 예외를 던지는 방식 금지.
- **rationale**: 예외를 통한 흐름 제어는 상위 레이어에서 놓치기 쉽다. 과거 장애 LESSON-001 참고.
- **confidence**: 0.85
- **source_prs**: [seed]
- **status**: active

### CONV-003
- **category**: `testing`
- **rule**: 버그 수정 PR에는 **수정 없이 실행하면 실패하는 회귀 테스트**를 반드시 포함한다.
- **rationale**: 같은 버그의 재발을 막고, 수정이 실제로 원인을 잡았음을 증명한다.
- **confidence**: 0.9
- **source_prs**: [seed]
- **status**: active

### CONV-004
- **category**: `logging`
- **rule**: 로그에 PII(이메일/이름/주소/토큰)를 직접 기록하지 않는다. 필요 시 해시화하여 식별자만 남긴다.
- **rationale**: 개인정보보호 + 로그 노출 사고 방지. LESSON-002 참고.
- **confidence**: 0.95
- **source_prs**: [seed]
- **status**: active

### CONV-005
- **category**: `pr-etiquette`
- **rule**: 커밋 메시지는 `<type>: <subject> (#<issue>)` 형식을 따른다. `type`은 `feat | fix | refactor | docs | test | chore`.
- **rationale**: 릴리스 노트 자동 생성과 이슈 추적성.
- **confidence**: 0.8
- **source_prs**: [seed]
- **status**: active

### CONV-006
- **category**: `api-design`
- **rule**: 공개 API의 응답 필드는 `snake_case`, 내부 도메인 타입은 `camelCase`를 사용한다.
- **rationale**: 외부 계약과 내부 코드 컨벤션 분리.
- **confidence**: 0.7
- **source_prs**: [seed]
- **status**: active

### CONV-007
- **category**: `performance`
- **rule**: ORM에서 컬렉션을 순회하며 추가 쿼리를 발생시키는 코드는 작성하지 않는다. 반드시 사전 조회(join/preload)로 해결한다.
- **rationale**: N+1 쿼리 방지. LESSON-003 참고.
- **confidence**: 0.85
- **source_prs**: [seed]
- **status**: active

### CONV-008
- **category**: `security`
- **rule**: 외부 입력으로 받은 URL로 서버에서 HTTP 요청을 보낼 때는 반드시 allowlist 검증을 거친다.
- **rationale**: SSRF 방지.
- **confidence**: 0.9
- **source_prs**: [seed]
- **status**: active

---

## 업데이트 이력은 `CHANGELOG.md`에 기록

`memory-curator`가 항목을 추가/수정할 때마다 변경 요약을 남긴다.
