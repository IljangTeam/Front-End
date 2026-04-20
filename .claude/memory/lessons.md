# Lessons Learned

과거 실수와 교훈. PR 머지 → `/update-memory` 사이클로 자동 축적.

---

## LESSON-001
- **Date**: 2026-04-20
- **Source PR**: #23
- **Tags**: [svgr, css, icon]

### Situation
hand-coded 아이콘 컴포넌트를 SVGR import로 전환한 후, 아이콘 크기가 Figma와 불일치.

### Mistake
SVG 파일에 `width="22" height="22"` 같은 하드코딩 값이 남아 있어 CSS `size-full`이 이를 override하지 못하고 overflow-hidden 컨테이너에서 잘려 보임.

### Correction
SVG 파일에서 width/height를 제거하고 viewBox만 남긴다. 크기는 사용처에서 `size-*` + `overflow-hidden` 컨테이너로 제어한다.

### Code Reference
`src/shared/assets/icons/*.svg` — viewBox만 유지

---

## LESSON-002
- **Date**: 2026-04-20
- **Source PR**: #23
- **Tags**: [css, animation, gradient]

### Situation
GNB 버튼에 gradient text hover를 적용한 후, hover-out 시 텍스트가 깜빡이는 현상 발생.

### Mistake
`transition: color 0.3s`를 gradient text (`background-clip: text` + `color: transparent`)와 함께 사용. `color`는 서서히 돌아가지만 `background-image`/`background-clip`은 transition 불가라 즉시 사라져, 중간에 "그라데이션 없이 반투명한 텍스트"가 보임.

### Correction
transition 대상에서 color/background를 제외하고 즉시 전환(snap)하도록 변경. transform/opacity만 부드럽게 애니메이션.

### Code Reference
`src/Views/landing/ui/LandingGNB.tsx` — NavLabel, NavDot styled components
