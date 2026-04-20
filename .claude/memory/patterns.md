# Approved Patterns

팀이 표준으로 채택한 설계 패턴.

---

## PATTERN-001: SVGR 아이콘 사용
- **Category**: structural
- **Source PR**: #23
- **Status**: active

### When to Use
아이콘을 React 컴포넌트로 사용할 때.

### When NOT to Use
래스터 이미지(PNG/JPG) — Next.js `Image` 컴포넌트 사용.

### Example (Good)
```tsx
// 1. SVG 파일: viewBox만, width/height 없음
// src/shared/assets/icons/Tag.svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" fill="none" ...>

// 2. 배럴 export
export { default as TagIcon } from "./Tag.svg";

// 3. 사용처: 컨테이너로 크기 제어
<div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
  <TagIcon className="block size-full text-(--color-text-secondary)" />
</div>
```

### Anti-Example (Bad)
```tsx
// SVG에 width/height 하드코딩 → CSS 크기 조절 깨짐
<svg width="22" height="22" viewBox="0 0 22 22">

// hand-coded 컴포넌트 → 유지보수 비용 높음
export default function Tag({ size = 22 }: IconProps) {
  return <svg width={size} height={size}>...</svg>;
}
```

### Related
- CONV-004, CONV-005, LESSON-001

---

## PATTERN-002: Emotion styled + Tailwind 혼용
- **Category**: structural
- **Source PR**: #23
- **Status**: active

### When to Use
hover/active 등 상태 조합이 복잡해 Tailwind 클래스가 폭발할 때.

### When NOT to Use
단순 hover 색상 변경 하나 정도는 Tailwind `hover:` prefix로 충분.

### Example (Good)
```tsx
// Emotion: 상태 기반 동적 스타일
const NavLabel = styled.span<{ $active: boolean }>`
  transition: transform 0.3s;
  color: ${({ $active }) => $active ? "var(--color-text-primary)" : "var(--color-text-secondary)"};
  transform: ${({ $active }) => ($active ? "translateY(-4px)" : "none")};

  button:hover & {
    background-image: ${GRADIENT_ACCENT};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

// Tailwind: 레이아웃/정적 스타일
<NavLabel className="text-label-large" $active={isActive}>
```

### Anti-Example (Bad)
```tsx
// Tailwind로 상태 조합을 표현 → 읽기 어려움
<span className={`text-label-large transition-transform duration-300
  hover:bg-clip-text hover:text-transparent hover:[-webkit-background-clip:text]
  hover:bg-[linear-gradient(163deg,#764AE9,#D4B8D8)]
  ${isActive ? "text-(--color-text-primary) -translate-y-1" : "text-(--color-text-secondary)"}`}
>
```

### Related
- CONV-001, ADR-002, LESSON-002

---

## PATTERN-003: prefers-reduced-motion 대응
- **Category**: behavioral
- **Source PR**: #23
- **Status**: active

### When to Use
CSS keyframe 애니메이션을 사용하는 장식적 요소.

### When NOT to Use
사용자 인터랙션 피드백 (버튼 클릭 등) — 감소하되 완전 제거하지 않음.

### Example (Good)
```tsx
const Orb = styled.div`
  animation: ${drift} 8s ease-in-out infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
```

### Related
- CONV-009
