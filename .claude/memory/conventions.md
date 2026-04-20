# Conventions

팀이 합의한 코드/프로세스 규칙.

---

### CONV-001
- **category**: `code-style`
- **rule**: Tailwind CSS는 레이아웃/정적 스타일링, Emotion은 상태 기반 동적 스타일링(hover, active, 조건부 스타일)에 사용한다.
- **rationale**: 두 시스템이 EmotionCacheProvider를 통해 공존하며, Emotion이 unlayered이므로 Tailwind @layer보다 항상 우선.
- **confidence**: 0.95
- **source_prs**: [seed]
- **status**: active

### CONV-002
- **category**: `naming`
- **rule**: React 컴포넌트 파일은 `PascalCase.tsx`, 훅은 `use` 접두사 + camelCase, 타입은 UPPER_SNAKE_CASE (예: `TAG_CATEGORY`).
- **rationale**: 코드베이스 전반의 기존 패턴 유지.
- **confidence**: 0.9
- **source_prs**: [seed]
- **status**: active

### CONV-003
- **category**: `code-style`
- **rule**: `src/app/` 페이지 파일은 최소한의 래퍼로, View 컴포넌트를 import해서 렌더링만 한다. 모든 로직과 UI는 `Views/`에 위치.
- **rationale**: FSD 레이어 구조 준수. 페이지는 라우팅 레이어.
- **confidence**: 0.95
- **source_prs**: [seed]
- **status**: active

### CONV-004
- **category**: `code-style`
- **rule**: 아이콘은 무조건 SVGR 방식으로 사용한다. `shared/assets/icons/`에 SVG 파일을 두고 import하여 React 컴포넌트로 사용. hand-coded 아이콘 컴포넌트는 금지.
- **rationale**: SVGR이 turbopack에 설정되어 있고, hand-coded 방식은 유지보수 비용이 높다.
- **confidence**: 0.95
- **source_prs**: [#23]
- **status**: active

### CONV-005
- **category**: `code-style`
- **rule**: SVG 파일에 width/height를 하드코딩하지 않고 viewBox만 남긴다. 크기는 사용처에서 CSS(`size-*` + `overflow-hidden` 컨테이너)로 제어한다.
- **rationale**: width/height 하드코딩 시 SVGR에서 CSS 크기 조절이 깨진다.
- **confidence**: 0.9
- **source_prs**: [#23]
- **status**: active

### CONV-006
- **category**: `pr-etiquette`
- **rule**: 커밋 메시지는 `<type>(<scope>): #<issue> <subject>` 형식. type은 `feat | fix | refactor | docs | style | chore | setting | add`. 이슈 번호를 반드시 포함한다.
- **examples**: `style: #22 hero섹션 그라데이션 배경을 png에서 동적 애니메이션으로 변경`, `refactor: #22 랜딩 내 아이콘 컴포넌트를 SVGR import 방식으로 전환`
- **rationale**: 이슈 추적성 + 릴리스 노트 자동 생성.
- **confidence**: 0.9
- **source_prs**: [seed]
- **status**: active

### CONV-007
- **category**: `code-style`
- **rule**: Tailwind CSS 4 문법을 사용한다. bracket notation 대신 v4 네이티브 문법 (예: `bg-(--color-*)`, `max-w-345`).
- **rationale**: 프로젝트가 Tailwind v4를 사용하며, v3 문법은 호환되지 않을 수 있다.
- **confidence**: 0.95
- **source_prs**: [seed]
- **status**: active

### CONV-008
- **category**: `code-style`
- **rule**: 디자인 토큰(컬러)은 `globals.css`의 CSS 커스텀 프로퍼티를 사용한다. 하드코딩 색상 금지 (gradient 등 디자인 시스템 외 값은 예외).
- **rationale**: 3계층 토큰 시스템(Primitive → Semantic → Legacy) 일관성.
- **confidence**: 0.9
- **source_prs**: [seed]
- **status**: active

### CONV-009
- **category**: `naming`
- **rule**: 장식용 아이콘에는 `aria-hidden="true"`를 추가한다.
- **rationale**: 웹 접근성(a11y) 기본 준수.
- **confidence**: 0.9
- **source_prs**: [#23]
- **status**: active

### CONV-010
- **category**: `code-style`
- **rule**: Figma 디자인의 간격/크기/색상은 근사치가 아닌 정확한 값으로 구현한다.
- **rationale**: 디자인 QA 시 1px 차이도 수정 요청이 오므로 처음부터 정확히 맞춘다.
- **confidence**: 0.95
- **source_prs**: [seed]
- **status**: active
