"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon, SearchIcon } from "@/shared/assets/icons";
import { useScroll, useTransform, motion } from "framer-motion";
import HeroTagChip from "./HeroTagChip";

// TODO: API 연동 후 실시간 모임 수를 받아오는 훅으로 교체
const OPEN_MEETING_COUNT: number | null = 4;

export default function HeroSection() {
  // 글로벌 scrollY — sticky 요소에서도 정확하게 동작
  const { scrollY } = useScroll();

  // 서브카피 / CTA / 검색바: 0~100px에 위로 올라가며 먼저 사라짐
  const bottomOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const bottomY = useTransform(scrollY, [0, 100], [0, -30]);

  // 뱃지: 서브카피와 같은 타이밍에 사라짐
  const badgeOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const badgeY = useTransform(scrollY, [0, 200], [0, -40]);

  // 헤드라인 태그칩: 200~500px에 위로 올라가면서 + 작아지면서 사라짐
  const headlineY = useTransform(scrollY, [200, 500], [0, -150]);
  const headlineScale = useTransform(scrollY, [200, 500], [1, 0.6]);
  const headlineOpacity = useTransform(scrollY, [200, 500], [1, 0]);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-white pt-[12vh]">
      {/* 배경 */}
      <motion.div
        style={{ opacity: headlineOpacity }}
        className="pointer-events-none absolute inset-x-7.5 top-7 bottom-7 overflow-hidden rounded-4xl bg-(--color-bg-default)"
      >
        <Image
          src="/assets/img/landing-hero.png"
          alt=""
          fill
          className="object-cover object-bottom"
          priority
        />
      </motion.div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex w-140 flex-col items-center gap-[3vh]">
        {/* 라이브 뱃지 + 헤드라인 그룹 */}
        <div className="flex flex-col items-center gap-[2vh]">
          {/* 라이브 뱃지 */}
          {OPEN_MEETING_COUNT != null && (
            <motion.div
              style={{ opacity: badgeOpacity, y: badgeY }}
              className="flex items-center gap-2 rounded-full border border-(--color-border-default) bg-(--color-surface-default) px-4 py-2"
            >
              <span className="size-2 animate-pulse rounded-full bg-(--color-status-success)" />
              <span className="text-body text-(--color-text-secondary)">
                지금 {OPEN_MEETING_COUNT}개의 모임이 열려 있어요
              </span>
            </motion.div>
          )}

          {/* 헤드라인 3행 */}
          <motion.div
            style={{
              y: headlineY,
              scale: headlineScale,
              opacity: headlineOpacity,
              transformOrigin: "center top",
            }}
            className="flex flex-col items-center"
          >
            <div className="relative h-80 w-125.5">
              {/* 행 1: 조사 "에" 고정 */}
              <span className="absolute top-3 left-62.5 text-[56px] leading-normal font-extrabold tracking-[-0.8px] text-(--color-text-primary)">
                에
              </span>
              <div className="absolute top-0 right-[calc(100%-240px)] flex justify-end">
                <HeroTagChip type="time" />
              </div>

              {/* 행 2: 조사 "에서" 고정 */}
              <span className="absolute top-32 left-96 whitespace-nowrap text-[56px] leading-normal font-extrabold tracking-[-0.8px] text-(--color-text-primary)">
                에서
              </span>
              <div className="absolute top-29 right-[calc(100%-378px)] flex justify-end">
                <HeroTagChip type="location" />
              </div>

              {/* 행 3: 조사 "할 사람?" 고정 */}
              <span className="absolute top-61 left-62.5 whitespace-nowrap text-[56px] leading-normal font-extrabold tracking-[-0.8px] text-(--color-text-primary)">
                할 사람?
              </span>
              <div className="absolute top-58 right-[calc(100%-240px)] flex justify-end">
                <HeroTagChip type="goal" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 서브카피 + CTA: 0~100px에 위로 올라가며 먼저 사라짐 */}
        <motion.div
          style={{ opacity: bottomOpacity, y: bottomY }}
          className="flex flex-col items-center gap-[2.5vh]"
        >
          <div className="flex flex-col items-center text-center text-body-large text-(--color-text-secondary)">
            <p>의지박약 현대인을 위한 각자 할 거 하는 모임</p>
            <p>#지역 #시간 #목표 태그로 나에게 맞는 모임을 찾아요</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auth"
              className="flex items-center gap-2 rounded-xl bg-(--color-interactive-primary) py-3 pr-3 pl-5 text-label-large text-(--color-text-inverse)"
            >
              지금 시작하기
              <ChevronRightIcon width={20} height={20} className="block" />
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("meetings")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="cursor-pointer rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5 py-3 text-label-large text-(--color-text-primary)"
            >
              모임 둘러보기
            </button>
          </div>
        </motion.div>
      </div>

      {/* 검색바 — 서브카피와 함께 사라짐 */}
      <motion.div
        style={{ opacity: bottomOpacity, y: bottomY }}
        className="relative z-10 mt-[4vh] flex w-140 items-center gap-2 rounded-[14px] bg-(--color-surface-default) px-4 py-2 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]"
      >
        <SearchIcon width={24} height={24} className="text-(--color-text-tertiary)" />
        <span className="text-body text-(--color-text-tertiary)">
          모임 이름, 스킬, 장소로 검색
        </span>
      </motion.div>
    </div>
  );
}
