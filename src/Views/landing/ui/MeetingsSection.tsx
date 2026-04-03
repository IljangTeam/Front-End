"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import MeetingCard from "./MeetingCard";
import type { MeetingCardProps } from "./MeetingCard";

// TODO: API 연동 후 TanStack Query 훅으로 교체
// ex) const { data: meetings, error } = useLatestMeetings(3);
const MOCK_MEETINGS: MeetingCardProps[] = [
  {
    title: "주말 오전 각자 작업 모임",
    round: 12,
    tags: [
      { label: "#연남", axis: "location" },
      { label: "#저녁", axis: "time" },
      { label: "#독서", axis: "goal" },
    ],
    date: "3/8(일) 오전 10:00",
    location: "콘하스 연남점",
    currentMembers: 4,
    maxMembers: 8,
    hostName: "이서연",
    hostInitial: "이",
  },
  {
    title: "평일 저녁 코딩 모임",
    round: 8,
    tags: [
      { label: "#강남", axis: "location" },
      { label: "#저녁", axis: "time" },
      { label: "#코딩", axis: "goal" },
    ],
    date: "3/10(화) 오후 7:00",
    location: "스타벅스 강남R점",
    currentMembers: 5,
    maxMembers: 6,
    hostName: "박지훈",
    hostInitial: "박",
  },
  {
    title: "새벽 드로잉 챌린지",
    round: 3,
    tags: [
      { label: "#온라인", axis: "location" },
      { label: "#새벽", axis: "time" },
      { label: "#드로잉", axis: "goal" },
    ],
    date: "3/11(수) 오전 6:00",
    location: "Zoom 온라인",
    currentMembers: 3,
    maxMembers: 10,
    hostName: "김하은",
    hostInitial: "김",
  },
];

export default function MeetingsSection() {
  // TODO: API 에러 시 안내 문구 처리
  // if (error) return <p>지금은 모임을 불러오지 못했어요.</p>;

  return (
    <div className="mx-auto max-w-345 px-7.5 py-7">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-[22px] font-bold leading-normal tracking-[-0.2px] text-(--color-text-primary)">
            지금 이런 모임이 열리고 있어요
          </h2>
          <p className="text-body text-(--color-text-secondary)">
            회원가입 없이 미리 살펴볼 수 있어요
          </p>
        </div>
        <Link
          href="/feed"
          className="flex items-center gap-1 text-body text-(--color-text-secondary) animate-pulse"
        >
          전체 보기
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* 카드 그리드 — 차례대로 위로 올라오는 stagger */}
      <div className="grid grid-cols-3 gap-5">
        {MOCK_MEETINGS.map((meeting, i) => (
          <motion.div
            key={`${meeting.title}-${meeting.round}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="transition-transform duration-200 hover:-translate-y-0.75">
              <MeetingCard {...meeting} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
