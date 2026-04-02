"use client";

import Image from "next/image";
import HeroTagChip from "./HeroTagChip";

export default function HeroSection() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-white pt-[12vh]">
      {/* 배경 — 좌우 30px 패딩으로 들어온 rounded 배경 + 이미지 */}
      <div className="pointer-events-none absolute inset-x-7.5 top-7 bottom-7 overflow-hidden rounded-4xl bg-(--color-bg-default)">
        <Image
          src="/assets/img/landing-hero.png"
          alt=""
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 flex w-140 flex-col items-center gap-[3vh]">
        {/* 라이브 뱃지 + 헤드라인 그룹 */}
        <div className="flex flex-col items-center gap-[2vh]">
          {/* 라이브 뱃지 */}
          <div className="flex items-center gap-2 rounded-full border border-(--color-border-default) bg-(--color-surface-default) px-4 py-2">
            <span className="size-2 animate-pulse rounded-full bg-(--color-status-success)" />
            <span className="text-body text-(--color-text-secondary)">
              지금 4개의 모임이 열려 있어요
            </span>
          </div>

          {/* 헤드라인 3행 */}
          <div className="flex flex-col items-center">
            <div className="relative w-125.5">
              {/* 행 1: #아침 + "에" */}
              <div className="ml-20 flex items-center gap-5">
                <HeroTagChip type="time" />
                <span className="text-[56px] leading-normal font-extrabold tracking-[-0.8px] text-(--color-text-primary)">
                  에
                </span>
              </div>

              {/* 행 2: #홍대 + "에서" */}
              <div className="ml-40 flex items-center gap-5">
                <HeroTagChip type="location" />
                <span className="text-[56px] leading-normal font-extrabold whitespace-nowrap tracking-[-0.8px] text-(--color-text-primary)">
                  에서
                </span>
              </div>

              {/* 행 3: #토익공부 + "할 사람?" */}
              <div className="flex items-center justify-center gap-5">
                <HeroTagChip type="goal" />
                <span className="text-[56px] leading-normal font-extrabold whitespace-nowrap tracking-[-0.8px] text-(--color-text-primary)">
                  할 사람?
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 서브카피 + CTA 그룹 */}
        <div className="flex flex-col items-center gap-[2.5vh]">
          {/* 서브카피 */}
          <div className="flex flex-col items-center text-center text-body-large text-(--color-text-secondary)">
            <p>의지박약 현대인을 위한 각자 할 거 하는 모임</p>
            <p>#지역 #시간 #목표 태그로 나에게 맞는 모임을 찾아요</p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex items-center gap-3">
            <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-(--color-interactive-primary) py-3 pr-3 pl-5 text-label-large text-(--color-text-inverse)">
              지금 시작하기
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="cursor-pointer rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5 py-3 text-label-large text-(--color-text-primary)">
              모임 둘러보기
            </button>
          </div>
        </div>
      </div>

      {/* 검색바 */}
      <div className="relative z-10 mt-[4vh] flex w-140 items-center gap-2 rounded-[14px] bg-(--color-surface-default) px-4 py-2 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="var(--color-text-tertiary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-body text-(--color-text-tertiary)">
          모임 이름, 스킬, 장소로 검색
        </span>
      </div>
    </div>
  );
}
