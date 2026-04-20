"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { TAG_CATEGORY } from "@/shared/types/SettingTagType";

interface HeroTagChipProps {
  type: TAG_CATEGORY;
}

const TAG_VALUES: Record<TAG_CATEGORY, string[]> = {
  time: ["# 아침", "# 점심", "# 저녁", "# 새벽"],
  location: ["# 홍대", "# 강남", "# 연남", "# 성수", "# 온라인"],
  goal: ["# 토익공부", "# 독서", "# 코딩", "# 운동", "# 드로잉"],
};

/** 설계서: 시간 2초 / 지역 2.7초 / 목표 3.4초 (비동기) */
const INTERVALS: Record<TAG_CATEGORY, number> = {
  time: 2000,
  location: 2700,
  goal: 3400,
};

/** 축별 gradient border + bg 색상 (Figma 시안 기준) */
const TAG_STYLES: Record<
  TAG_CATEGORY,
  { borderGradient: string; from: string; to: string; text: string; shadow: string }
> = {
  time: {
    borderGradient: "linear-gradient(220deg, #DCEFFF, #F2F6FA, #C8E0F1)",
    from: "rgba(232,243,252,0.5)",
    to: "rgba(221,231,239,0.5)",
    text: "var(--color-tag-time)",
    shadow: "0px 3px 5px rgba(58,136,200,0.3)",
  },
  location: {
    borderGradient: "linear-gradient(180deg, #FFE6D8, #FFFEE4, #F2D8C9)",
    from: "rgba(254,240,232,0.5)",
    to: "rgba(252,235,226,0.5)",
    text: "var(--color-tag-location)",
    shadow: "0px 3px 5px rgba(232,117,58,0.3)",
  },
  goal: {
    borderGradient: "linear-gradient(185deg, #D1F4E4, #EDF2F0, #C1DBCF)",
    from: "rgba(232,247,240,0.25)",
    to: "rgba(203,216,210,0.25)",
    text: "var(--color-tag-goal)",
    shadow: "0px 5px 5px rgba(61,168,112,0.3)",
  },
};

/** 태그 랜덤 셔플 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroTagChip({ type }: HeroTagChipProps) {
  const values = TAG_VALUES[type];
  // SSR hydration 안전: 고정 배열로 초기화, 첫 interval 콜백에서 셔플 시작
  const [shuffled, setShuffled] = useState<string[]>(values);
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= shuffled.length) {
        setShuffled(shuffle(values));
        return 0;
      }
      return next;
    });
  }, [shuffled.length, values]);

  useEffect(() => {
    const id = setInterval(advance, INTERVALS[type]);
    return () => clearInterval(id);
  }, [advance, type]);

  const style = TAG_STYLES[type];
  const currentValue = shuffled[index];

  return (
    <span
      className="relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-[28px] text-[52px] font-bold leading-normal tracking-[-0.8px]"
      style={{
        padding: "12px 28px",
        /* 1. 레이아웃 크기 유지를 위해 투명 테두리 설정 */
        border: "4px solid transparent",
        
        /* 2. 내부 반투명 배경 (테두리 안쪽까지만 채우도록 설정) */
        backgroundImage: `linear-gradient(to bottom, ${style.from}, ${style.to})`,
        backgroundClip: "padding-box", 
        
        color: style.text,
        textShadow: style.shadow,
      }}
    >
      {/* 3. 그라데이션 테두리 전용 독립 레이어 (Mask 기법 적용) */}
      <span
        className="absolute inset-0 rounded-[28px] pointer-events-none"
        style={{
          border: "4px solid transparent",
          backgroundImage: style.borderGradient,
          backgroundOrigin: "border-box",
          backgroundClip: "border-box",
          /* 마스크를 씌워서 안쪽 배경은 파내고(투명하게) 테두리만 남긴다 */
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          className="relative z-10"
          key={currentValue}
          initial={{ y: -20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          }}
        >
          {currentValue}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}