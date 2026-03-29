/**
 * Typography
 *
 * INDEX
 * 1. Style Generator
 * 2. CSS Styles (css prop용)
 * 3. Styled Components
 * 4. Utilities(선택)
 *
 * @example Emotion
 * import { Heading1, Body, typo } from "@/shared/ui/typography";
 * <Heading1>제목</Heading1>
 * <p css={typo["body-small"]}>텍스트</p>
 *
 * @example Tailwind
 * <h1 className="font-pretendard text-heading-1">제목</h1>
 */

import styled from "@emotion/styled";
import { css, type SerializedStyles, type CSSObject } from "@emotion/react";
import {
  TYPO_BASE,
  TYPO,
  type TypoKey,
  type TypoComputed,
} from "./typo.tokens";

// Re-export for Tailwind config
export { tailwindTypo } from "./typo.tokens";
export type { TypoKey } from "./typo.tokens";

/* =============================================================
 * 1. Style Generator
 * ============================================================= */

const base: CSSObject = {
  fontFamily: TYPO_BASE.family.join(", "),
  fontStyle: TYPO_BASE.style,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const toStyle = (t: TypoComputed): CSSObject => ({
  ...base,
  fontSize: `${t.size}px`,
  fontWeight: t.weight,
  lineHeight: t.lineHeight,
  ...(t.letterSpacing && { letterSpacing: t.letterSpacing }),
});

/* =============================================================
 * 2. CSS Styles (css prop용)
 * ============================================================= */

export const typo = Object.fromEntries(
  Object.entries(TYPO).map(([k, t]) => [k, css(toStyle(t))]),
) as Record<TypoKey, SerializedStyles>;

/* =============================================================
 * 3. Styled Components
 * ============================================================= */

const T = Object.fromEntries(
  Object.entries(TYPO).map(([k, t]) => [k, styled.span(toStyle(t))]),
) as Record<TypoKey, ReturnType<typeof styled.span>>;

// Named exports (PascalCase)
export const Display = T["display"];
export const Heading1 = T["heading-1"];
export const Heading2 = T["heading-2"];
export const Heading3 = T["heading-3"];
export const Heading4 = T["heading-4"];
export const BodyLarge = T["body-large"];
export const Body = T["body"];
export const BodySmall = T["body-small"];
export const LabelLarge = T["label-large"];
export const Label = T["label"];
export const Caption = T["caption"];

// Dynamic access (kebab-case)
export { T as Typo };

/* =============================================================
 * 4. Utilities(선택)
 * ============================================================= */

export const clampLines = (n: number) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${n};
  overflow: hidden;
  text-overflow: ellipsis;
`;
