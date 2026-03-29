/**
 * Typography Tokens (Single Source of Truth)
 *
 * Figma 복사값을 그대로 입력하면 자동 변환됨
 * - lineHeight: px → unitless (예: 31.2 → 1.3)
 * - letterSpacing: px → em (예: -0.24 → -0.01em)
 */

/* =============================================================
 * 1. 정적 속성 (공통)
 * ============================================================= */

export const TYPO_BASE = {
  family: ["Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
  style: "normal",
} as const;

export const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

/* =============================================================
 * 2. 가변 속성 (개별 토큰)
 *    Figma에서 복사한 px 값 그대로 입력
 * ============================================================= */

export type TypoTokenRaw = {
  size: number; // px
  weight: number;
  lineHeight: number; // px (자동 변환됨)
  letterSpacing?: number; // px (자동 변환됨), 0이면 생략 가능
};

export const TYPO_TOKENS = {
  /* ===== Display ===== */
  display: {
    size: 40,
    weight: FONT_WEIGHT.extrabold,
    lineHeight: 48, // 40 * 1.2
    letterSpacing: -0.8, // 40 * -0.02
  },

  /* ===== Headings ===== */
  "heading-1": {
    size: 32,
    weight: FONT_WEIGHT.extrabold,
    lineHeight: 40, // 32 * 1.25
    letterSpacing: -0.64, // 32 * -0.02
  },
  "heading-2": {
    size: 24,
    weight: FONT_WEIGHT.bold,
    lineHeight: 31.2, // 24 * 1.3
    letterSpacing: -0.24, // 24 * -0.01
  },
  "heading-3": {
    size: 20,
    weight: FONT_WEIGHT.bold,
    lineHeight: 27, // 20 * 1.35
    letterSpacing: -0.2, // 20 * -0.01
  },
  "heading-4": {
    size: 16,
    weight: FONT_WEIGHT.bold,
    lineHeight: 22.4, // 16 * 1.4
  },

  /* ===== Body ===== */
  "body-large": {
    size: 16,
    weight: FONT_WEIGHT.regular,
    lineHeight: 26.4, // 16 * 1.65
  },
  body: {
    size: 14,
    weight: FONT_WEIGHT.regular,
    lineHeight: 23.1, // 14 * 1.65
  },
  "body-small": {
    size: 13,
    weight: FONT_WEIGHT.regular,
    lineHeight: 20.8, // 13 * 1.6
  },

  /* ===== Labels ===== */
  "label-large": {
    size: 14,
    weight: FONT_WEIGHT.semibold,
    lineHeight: 19.6, // 14 * 1.4
  },
  label: {
    size: 12,
    weight: FONT_WEIGHT.semibold,
    lineHeight: 16.8, // 12 * 1.4
  },

  /* ===== Caption ===== */
  caption: {
    size: 11,
    weight: FONT_WEIGHT.regular,
    lineHeight: 16.5, // 11 * 1.5
  },
} as const satisfies Record<string, TypoTokenRaw>;

export type TypoTokenKey = keyof typeof TYPO_TOKENS;

/* =============================================================
 * 3. 변환 유틸
 * ============================================================= */

/** px lineHeight → unitless 변환 */
export const toUnitlessLH = (lineHeight: number, fontSize: number): number =>
  Math.round((lineHeight / fontSize) * 1000) / 1000;

/** px letterSpacing → em 변환 */
export const toEmLS = (letterSpacing: number, fontSize: number): string =>
  `${Math.round((letterSpacing / fontSize) * 1000) / 1000}em`;

/** 변환된 토큰 타입 */
export type TypoTokenComputed = {
  size: number;
  weight: number;
  lineHeight: number; // unitless
  letterSpacing?: string; // em
};

/** 단일 토큰 변환 */
export const computeToken = (raw: TypoTokenRaw): TypoTokenComputed => ({
  size: raw.size,
  weight: raw.weight,
  lineHeight: toUnitlessLH(raw.lineHeight, raw.size),
  ...(raw.letterSpacing
    ? { letterSpacing: toEmLS(raw.letterSpacing, raw.size) }
    : {}),
});

/** 전체 토큰 변환 */
export const TYPO_COMPUTED = Object.fromEntries(
  Object.entries(TYPO_TOKENS).map(([key, raw]) => [key, computeToken(raw)]),
) as Record<TypoTokenKey, TypoTokenComputed>;
