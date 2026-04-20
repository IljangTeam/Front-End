# Architectural Decision Records (ADR)

큰 아키텍처/설계 결정을 기록한다.

---

## ADR-001: FSD(Feature-Sliced Design) 레이어 구조 채택
- **Status**: accepted
- **Date**: seed
- **Authors**: 팀

### Context
페이지, 비즈니스 로직, 공통 유틸이 뒤섞이면 파일 간 의존성 파악이 어려워진다.

### Decision
`app/` (라우팅) → `Views/` (피처 모듈) → `shared/` (공통) 3레이어 구조를 사용한다. `app/`은 View import만 하는 얇은 래퍼. 각 View는 `ui/`, `model/`, `index.ts` 배럴 구조.

### Alternatives Considered
- **pages 디렉토리에 로직 직접 배치**: 간단하지만 피처 간 경계가 없음.
- **Atomic Design**: 컴포넌트 분류 기준이 모호.

### Consequences
- Positive: 피처 단위 독립성, 배럴 export로 공개 API 명확.
- Negative: 디렉토리 깊이 증가.

---

## ADR-002: Tailwind CSS 4 + Emotion 공존
- **Status**: accepted
- **Date**: seed
- **Authors**: 팀

### Context
정적 스타일은 유틸리티 클래스가 빠르고, 상태 기반 동적 스타일은 CSS-in-JS가 표현력이 좋다.

### Decision
Tailwind CSS 4를 레이아웃/정적 스타일에, Emotion을 hover/active 등 상태 기반 동적 스타일에 사용한다. EmotionCacheProvider로 두 시스템 공존. Emotion 클래스 prefix는 `em`.

### Alternatives Considered
- **Tailwind only**: `group-hover`, arbitrary variants 등으로 복잡한 상태 표현 시 클래스가 폭발.
- **Emotion only**: 레이아웃 유틸리티 재작성 필요.

### Consequences
- Positive: 각 시스템의 강점 활용.
- Negative: 두 시스템의 우선순위 이해 필요 (Emotion unlayered > Tailwind @layer).
- Related: CONV-001

---

## ADR-003: SVGR을 통한 아이콘 관리
- **Status**: accepted
- **Date**: 2026-04-20
- **Authors**: 팀

### Context
hand-coded 아이콘 컴포넌트는 SVG 추가/수정 시 JSX 변환 작업이 필요하고, Figma에서 SVG를 바로 export해서 쓸 수 없다.

### Decision
`@svgr/webpack`을 turbopack에 설정하고, SVG 파일을 직접 import하여 React 컴포넌트로 사용한다. SVG 파일은 `shared/assets/icons/`에 viewBox만 유지.

### Alternatives Considered
- **hand-coded 컴포넌트**: 유지보수 비용 높음, SVGR 전환 과정에서 크기 불일치 문제 발생.
- **아이콘 폰트**: 색상 제어 제한, 번들 사이즈 비효율.

### Consequences
- Positive: Figma export → 바로 사용 가능. 크기는 CSS로 일관 제어.
- Negative: SVGR 빌드 의존성 추가.
- Related: CONV-004, CONV-005
