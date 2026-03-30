/**
 * Typography Tokens (Single Source of Truth)
 *
 * INDEX
 * 1. 정적 속성 (공통)
 * 2. 가변 속성 (개별 토큰)
 * 3. 변환 유틸
 * 4. Tailwind Config Export
 */

/* =============================================================
 * 1. 정적 속성 (공통)
 * ============================================================= */

export const TYPO_BASE = {
  family: ["Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
  style: "normal",
} as const;

const FONT_WEIGHT_MAP = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

type FontWeightName = keyof typeof FONT_WEIGHT_MAP;
type FontWeightNumber = (typeof FONT_WEIGHT_MAP)[FontWeightName];
type FontWeight = FontWeightName | FontWeightNumber;

/* =============================================================
 * 2. 가변 속성 (개별 토큰)
 *    Figma에서 복사한 값 그대로 입력
 *    weight: "bold" 또는 700 둘 다 가능
 * ============================================================= */

type TypoTokenRaw = {
  size: number;
  weight: FontWeight;
  lineHeight: number;
  letterSpacing?: number;
};

/* =============================================================
 * 새로운 값 추가시, Figma 값을 그대로 입력 → 아래 변환 유틸이 자동으로 계산해줌
 *
 * 1. weight: "bold" | 700 둘 다 허용
 *    - weight: "bold" → 700
 *    - weight: 700 → 700
 * 2. lineHeight: px → unitless (예: 31.2 → 1.3)
 *    → px 단위 없이 숫자만 입력하면 자동으로 size로 나눠서 계산해줌
 *    - lineHeight: 31.2, size: 24 → lineHeight: 1.3
 * 3. letterSpacing: px → em (예: -0.24 → -0.01em)
 *    → px 단위 없이 숫자만 입력하면 자동으로 size로 나눠서 계산해줌
 *    - letterSpacing: -0.24, size: 24 → letterSpacing: -0.01em
 * ============================================================= */

const TYPO_TOKENS = {
  /* ===== Display ===== */
  "display": {
    size: 40,
    weight: "extrabold",
    lineHeight: 48,
    letterSpacing: -0.8,
  },

  /* ===== Headings ===== */
  "heading-1": {
    size: 32,
    weight: "extrabold",
    lineHeight: 40,
    letterSpacing: -0.64,
  },
  "heading-2": {
    size: 24,
    weight: "bold",
    lineHeight: 31.2,
    letterSpacing: -0.24,
  },
  "heading-3": {
    size: 20,
    weight: "bold",
    lineHeight: 27,
    letterSpacing: -0.2,
  },
  "heading-4": {
    size: 16,
    weight: "bold",
    lineHeight: 22.4,
  },

  /* ===== Body ===== */
  "body-large": {
    size: 16,
    weight: "regular",
    lineHeight: 26.4,
  },
  "body": {
    size: 14,
    weight: "regular",
    lineHeight: 23.1,
  },
  "body-small": {
    size: 13,
    weight: "regular",
    lineHeight: 20.8,
  },
  "body-bold": {
    size: 14,
    weight: "bold",
    lineHeight: 23.1,
  },

  /* ===== Labels ===== */
  "label-large": {
    size: 14,
    weight: "semibold",
    lineHeight: 19.6,
  },
  "label": {
    size: 12,
    weight: "semibold",
    lineHeight: 16.8,
  },

  /* ===== Caption ===== */
  "caption": {
    size: 11,
    weight: "regular",
    lineHeight: 16.5,
  },
} as const satisfies Record<string, TypoTokenRaw>;

export type TypoKey = keyof typeof TYPO_TOKENS;

/* =============================================================
 * 3. 변환 유틸
 * ============================================================= */

const toWeightNumber = (weight: FontWeight): number =>
  typeof weight === "string" ? FONT_WEIGHT_MAP[weight] : weight;

const toUnitlessLH = (lh: number, size: number): number =>
  Math.round((lh / size) * 1000) / 1000;

const toEmLS = (ls: number, size: number): string =>
  `${Math.round((ls / size) * 1000) / 1000}em`;

export type TypoComputed = {
  size: number;
  weight: number;
  lineHeight: number;
  letterSpacing?: string;
};

const computeToken = (raw: TypoTokenRaw): TypoComputed => ({
  size: raw.size,
  weight: toWeightNumber(raw.weight),
  lineHeight: toUnitlessLH(raw.lineHeight, raw.size),
  ...(raw.letterSpacing !== undefined && {
    letterSpacing: toEmLS(raw.letterSpacing, raw.size),
  }),
});

export const TYPO = Object.fromEntries(
  Object.entries(TYPO_TOKENS).map(([key, raw]) => [key, computeToken(raw)]),
) as Record<TypoKey, TypoComputed>;

/* =============================================================
 * 4. Tailwind Config Export
 * ============================================================= */

export const tailwindTypo = {
  fontFamily: {
    pretendard: TYPO_BASE.family,
  },
  fontSize: Object.fromEntries(
    Object.entries(TYPO).map(([k, t]) => [
      k,
      [
        `${t.size}px`,
        {
          lineHeight: String(t.lineHeight),
          fontWeight: String(t.weight),
          ...(t.letterSpacing && { letterSpacing: t.letterSpacing }),
        },
      ],
    ]),
  ),
};
