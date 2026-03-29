/**
 * Typography - Emotion Styled Components
 *
 * 사용법:
 * import { Heading1, Body } from "@/shared/ui/typography";
 * import { typoStyle } from "@/shared/ui/typography";
 *
 * <Heading1>제목</Heading1>
 * <div css={typoStyle["body"]}>본문</div>
 */

import styled from "@emotion/styled";
import { css, type SerializedStyles, type CSSObject } from "@emotion/react";
import {
  TYPO_BASE,
  TYPO_COMPUTED,
  type TypoTokenKey,
  type TypoTokenComputed,
} from "@/shared/config/typo.tokens";

/* =============================================================
 * 1. Base Style (정적 속성)
 * ============================================================= */

export const typoBase: CSSObject = {
  fontFamily: TYPO_BASE.family.join(", "),
  fontStyle: TYPO_BASE.style,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

/* =============================================================
 * 2. CSS Object 생성
 * ============================================================= */

const createTypoStyle = (token: TypoTokenComputed): CSSObject => ({
  ...typoBase,
  fontSize: `${token.size}px`,
  fontWeight: token.weight,
  lineHeight: token.lineHeight,
  ...(token.letterSpacing ? { letterSpacing: token.letterSpacing } : {}),
});

/** css prop으로 사용 가능한 스타일 객체 */
export const typoStyle = Object.fromEntries(
  Object.entries(TYPO_COMPUTED).map(([key, token]) => [
    key,
    css(createTypoStyle(token)),
  ]),
) as Record<TypoTokenKey, SerializedStyles>;

/* =============================================================
 * 3. Styled Components 생성
 * ============================================================= */

type StyledTypo = ReturnType<typeof styled.span>;

const createStyledTypo = (token: TypoTokenComputed): StyledTypo =>
  styled.span(createTypoStyle(token));

/** kebab-case 키로 접근 가능한 컴포넌트 맵 */
export const Typo = Object.fromEntries(
  Object.entries(TYPO_COMPUTED).map(([key, token]) => [
    key,
    createStyledTypo(token),
  ]),
) as Record<TypoTokenKey, StyledTypo>;

/* =============================================================
 * 4. Named Exports (PascalCase)
 * ============================================================= */

export const Display = Typo["display"];
export const Heading1 = Typo["heading-1"];
export const Heading2 = Typo["heading-2"];
export const Heading3 = Typo["heading-3"];
export const Heading4 = Typo["heading-4"];
export const BodyLarge = Typo["body-large"];
export const Body = Typo["body"];
export const BodySmall = Typo["body-small"];
export const LabelLarge = Typo["label-large"];
export const Label = Typo["label"];
export const Caption = Typo["caption"];

/* =============================================================
 * 5. Clamp Mixin (선택적 확장)
 * ============================================================= */

export const clampLines = (n: number) => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${n};
  overflow: hidden;
  text-overflow: ellipsis;
`;
