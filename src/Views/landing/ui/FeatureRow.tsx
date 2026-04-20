"use client";

import { motion } from "framer-motion";

interface FeatureRowProps {
  index: number;
  stepLabel: string;
  title: string;
  description: string;
}

export default function FeatureRow({
  index,
  stepLabel,
  title,
  description,
}: FeatureRowProps) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex h-110 items-center gap-5 ${isReversed ? "flex-row-reverse" : ""} max-md:h-96`}
    >
      {/* 텍스트 블록 */}
      <div className="flex h-full w-80 lg:w-120 shrink-0 flex-col items-start justify-center gap-3.5 rounded-4xl border border-(--color-border-default) bg-linear-to-b from-(--color-bg-default)/50 to-(--color-accent-muted)/50 px-6 lg:px-10">
        <span className="text-label font-bold text-(--color-accent-default)">
          {stepLabel}
        </span>
        <h3 className="whitespace-pre-line text-[22px] lg:text-[28px] leading-[1.4] font-black tracking-tight text-(--color-text-primary)">
          {title}
        </h3>
        <p className="whitespace-pre-line text-[15px] leading-[1.8] text-(--color-text-secondary)">
          {description}
        </p>
      </div>

      {/* 스크린샷 placeholder */}
      <div className="h-full flex-1 rounded-4xl border border-(--color-border-default) bg-white" />
    </motion.div>
  );
}
