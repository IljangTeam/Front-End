# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행 (flat config)
```

테스트 프레임워크는 아직 미구성.

## 아키텍처

**Next.js 16 App Router** + **FSD (Feature-Sliced Design)** 패턴.

### 레이어 구조

```text
src/
├── app/           # 라우팅 레이어 — Views를 import하는 얇은 페이지 파일
├── Views/         # 슬라이스 레이어 — 피처 모듈 (auth, landing, feed, authSetting)
│   └── <feature>/
│       ├── ui/        # React 컴포넌트
│       ├── model/     # 훅, 스토어(Zustand), 비즈니스 로직
│       └── index.ts   # 배럴 export (슬라이스의 공개 API)
└── shared/        # 공통 유틸리티 및 디자인 시스템
    └── ui/typography/ # 타이포그래피 토큰 시스템
```

`src/app/` 페이지는 최소한의 래퍼 — View 컴포넌트를 import해서 렌더링만 한다. 모든 로직과 UI는 `Views/`에 위치.

### 스타일링: Tailwind CSS 4 + Emotion

`EmotionCacheProvider`(루트 레이아웃)를 통해 두 시스템이 공존:

- **Tailwind CSS 4**: 레이아웃, 정적 스타일링 (간격, 크기, 색상 등 유틸리티 클래스)
- **Emotion** (CSS-in-JS): 상태 기반 동적 스타일링 (hover, active, 조건부 스타일 등), className prefix `em`
- Emotion 스타일은 unlayered이므로 Tailwind `@layer` 스타일보다 항상 우선

### 타이포그래피 시스템

`src/shared/ui/typography/typo.tokens.ts`가 단일 진실 공급원(Single Source of Truth). Figma 값을 raw px로 입력하면 unitless line-height, em letter-spacing으로 자동 변환. 두 가지로 export:

- `TYPO` — Emotion에서 사용하는 계산된 토큰 객체
- `tailwindTypo` — `tailwind.config.ts`에서 소비 (`text-heading-1`, `text-body` 등의 클래스)

### 디자인 토큰 (컬러)

`src/app/globals.css`에 CSS 커스텀 프로퍼티로 정의, 3계층:

1. **Primitive** (`--palette-*`) — 원시 색상값
2. **Semantic** (`--color-*`) — 용도별 별칭 (bg, text, interactive, tag, status)
3. **Legacy** (`--color-ink`, `--color-bg` 등) — 하위 호환

### 상태 관리

- **Zustand** — 클라이언트 상태
- **TanStack React Query** — 서버 상태 (구성 완료, 아직 본격 사용 전)

### 경로 별칭

`@/*` → `./src/*` (tsconfig paths)
