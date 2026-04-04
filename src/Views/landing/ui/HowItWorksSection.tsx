"use client";

import { motion } from "framer-motion";
import { Tag, Zap, Link, Pen } from "@/shared/ui/icons";
import type { ComponentType } from "react";
import type { IconProps } from "@/shared/ui/icons";

const STEPS: {
  Icon: ComponentType<IconProps>;
  step: string;
  title: string;
  description: string;
}[] = [
  {
    Icon: Tag,
    step: "STEP 01",
    title: "태그 설정",
    description:
      "지역 · 시간 · 목표 태그를 설정하면 나에게 맞는 모임이 자동으로 보여요.",
  },
  {
    Icon: Zap,
    step: "STEP 02",
    title: "모임 찾기 · 개설",
    description: "태그 기반 피드에서 모임을 찾거나,\n직접 모임을 열 수 있어요.",
  },
  {
    Icon: Link,
    step: "STEP 03",
    title: "각자 작업",
    description:
      "같은 공간에서 각자 집중해요.\n방해 없이, 혼자보다 훨씬 잘돼요.",
  },
  {
    Icon: Pen,
    step: "STEP 04",
    title: "회고",
    description:
      '"오늘 뭐 했나요?"\n한 줄 기록이 나만의 히스토리가 돼요.',
  },
];

export default function HowItWorksSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="mx-auto max-w-345 px-7.5"
    >
      <div className="flex flex-col items-center gap-12 rounded-4xl border border-(--color-border-default) bg-(--color-bg-default) py-16 px-8">
        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-heading-1 text-(--color-text-primary)">
            딱 4단계예요
          </h2>
          <p className="text-body-large text-(--color-text-secondary)">
            어렵지 않아요. 태그 설정하고, 모임 찾고, 작업하고, 회고하면 돼요.
          </p>
        </div>

        {/* 4컬럼 그리드 */}
        <div className="grid w-full max-w-300 grid-cols-2 gap-11.5 xl:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col items-center gap-2.75"
            >
              {/* 아이콘 */}
              <div className="flex size-14 items-center justify-center rounded-2xl bg-(--color-surface-default)">
                <step.Icon size={22} />
              </div>

              {/* STEP 라벨 */}
              <span className="text-label tracking-[0.5px] text-(--color-text-tertiary)">
                {step.step}
              </span>

              {/* 제목 */}
              <span className="text-[17px] font-bold leading-normal text-(--color-text-primary)">
                {step.title}
              </span>

              {/* 설명 */}
              <p className="whitespace-pre-line text-center text-body text-(--color-text-secondary)">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
