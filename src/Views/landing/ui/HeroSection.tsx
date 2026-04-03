"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import HeroTagChip from "./HeroTagChip";

// TODO: API 연동 후 실시간 모임 수를 받아오는 훅으로 교체
// ex) const { data: count } = useOpenMeetingCount();
const OPEN_MEETING_COUNT: number | null = 4;

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
          {/* 라이브 뱃지 — API 실패(null) 시 미노출 */}
          {OPEN_MEETING_COUNT != null && (
            <div className="flex items-center gap-2 rounded-full border border-(--color-border-default) bg-(--color-surface-default) px-4 py-2">
              <span className="size-2 animate-pulse rounded-full bg-(--color-status-success)" />
              <span className="text-body text-(--color-text-secondary)">
                지금 {OPEN_MEETING_COUNT}개의 모임이 열려 있어요
              </span>
            </div>
          )}

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
            <Link
              href="/auth"
              className="flex items-center gap-2 rounded-xl bg-(--color-interactive-primary) py-3 pr-3 pl-5 text-label-large text-(--color-text-inverse)"
            >
              지금 시작하기
              <ChevronRight size={20} />
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
        </div>
      </div>

      {/* 검색바 */}
      <div className="relative z-10 mt-[4vh] flex w-140 items-center gap-2 rounded-[14px] bg-(--color-surface-default) px-4 py-2 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
        <Search size={24} className="text-(--color-text-tertiary)" />
        <span className="text-body text-(--color-text-tertiary)">
          모임 이름, 스킬, 장소로 검색
        </span>
      </div>
    </div>
  );
}
