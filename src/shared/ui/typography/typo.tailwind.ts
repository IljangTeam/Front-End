/**
 * Typography - Tailwind Config
 *
 * tailwind.config.ts에서 import하여 사용
 *
 * 사용법:
 * <h1 className="font-pretendard text-heading-1">제목</h1>
 * <p className="text-body">본문</p>
 */

import {
  TYPO_BASE,
  TYPO_COMPUTED,
  type TypoTokenKey,
} from "@/shared/config/typo.tokens";

/* =============================================================
 * 1. fontFamily
 * ============================================================= */

export const tailwindFontFamily = {
  pretendard: TYPO_BASE.family,
};

/* =============================================================
 * 2. fontSize
 *    Tailwind v3 fontSize 튜플 형식:
 *    [fontSize, { lineHeight, letterSpacing, fontWeight }]
 * ============================================================= */

type TailwindFontSizeValue = [
  string,
  {
    lineHeight: string;
    letterSpacing?: string;
    fontWeight: string;
  },
];

export const tailwindFontSize = Object.fromEntries(
  Object.entries(TYPO_COMPUTED).map(([key, token]) => [
    key,
    [
      `${token.size}px`,
      {
        lineHeight: String(token.lineHeight),
        ...(token.letterSpacing ? { letterSpacing: token.letterSpacing } : {}),
        fontWeight: String(token.weight),
      },
    ] as TailwindFontSizeValue,
  ]),
) as Record<TypoTokenKey, TailwindFontSizeValue>;

/* =============================================================
 * 3. 전체 Typography Theme 객체
 *    tailwind.config.ts에서 spread로 사용 가능
 * ============================================================= */

export const tailwindTypography = {
  fontFamily: tailwindFontFamily,
  fontSize: tailwindFontSize,
};
