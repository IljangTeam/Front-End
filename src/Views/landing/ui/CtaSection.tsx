"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-(--color-interactive-primary) flex flex-col items-center gap-6 px-8 py-20"
    >
      <h2 className="text-center text-[36px] leading-normal font-extrabold tracking-[-0.5px] text-(--color-text-inverse)">
        오늘, 어디서 작업하세요?
      </h2>
      <p className="text-body-large text-(--color-text-tertiary)">
        혼자가 아닌 느낌. 그게 각할모예요.
      </p>
      <Link
        href="/auth"
        className="group rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5 py-3 opacity-50 transition-all duration-300 hover:border-[#764AE9] hover:bg-white"
      >
        <span className="text-label-large text-(--color-text-primary) transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:[-webkit-background-clip:text] group-hover:bg-[linear-gradient(165deg,#764AE9,#D4B8D8)]">
          무료로 시작하기
        </span>
      </Link>
    </motion.div>
  );
}
