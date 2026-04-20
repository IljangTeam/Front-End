"use client";

import { useState } from "react";
import FeedMeetingCard from "./FeedMeetingCard";
import type { FeedMeetingCardProps } from "./FeedMeetingCard";
import type { TAG_CATEGORY } from "@/shared/types/SettingTagType";
import { PlusIcon } from "@/shared/assets/icons";
import Sidebar from "./Sidebar";
import FilterTabs from "./FilterTabs";
import TagChipDropdown from "./TagChipDropdown";
import SearchInput from "./SearchInput";
import ResultHeader from "./ResultHeader";
import Pagination from "./Pagination";


const MOCK_MEETINGS: FeedMeetingCardProps[] = [
  { title: "주말 오전 각자 작업 모임", round: 12, tags: [{ label: "#연남", category: "location" }, { label: "#아침", category: "time" }, { label: "#독서", category: "goal" }], date: "3/8(일) 오전 10:00", location: "콘하스 연남점", currentMembers: 4, maxMembers: 8, hostName: "호스트A", hostInitial: "A" },
  { title: "평일 저녁 코딩 모임", round: 8, tags: [{ label: "#강남", category: "location" }, { label: "#저녁", category: "time" }, { label: "#코딩", category: "goal" }], date: "3/10(화) 오후 7:00", location: "스타벅스 강남R점", currentMembers: 5, maxMembers: 6, hostName: "호스트B", hostInitial: "B" },
  { title: "새벽 드로잉 챌린지", round: 3, tags: [{ label: "#온라인", category: "location" }, { label: "#새벽", category: "time" }, { label: "#드로잉", category: "goal" }], date: "3/11(수) 오전 6:00", location: "Zoom 온라인", currentMembers: 3, maxMembers: 10, hostName: "호스트C", hostInitial: "C" },
  { title: "홍대 카페 스터디", round: 5, tags: [{ label: "#홍대", category: "location" }, { label: "#오후", category: "time" }, { label: "#공부", category: "goal" }], date: "3/12(목) 오후 2:00", location: "할리스 홍대점", currentMembers: 6, maxMembers: 8, hostName: "호스트D", hostInitial: "D" },
  { title: "성수 독서 모임", round: 15, tags: [{ label: "#성수", category: "location" }, { label: "#저녁", category: "time" }, { label: "#독서", category: "goal" }], date: "3/13(금) 오후 6:00", location: "언더스탠드에비뉴", currentMembers: 7, maxMembers: 10, hostName: "호스트E", hostInitial: "E" },
  { title: "온라인 새벽 작업방", round: 20, tags: [{ label: "#온라인", category: "location" }, { label: "#새벽", category: "time" }, { label: "#작업", category: "goal" }], date: "3/14(토) 오전 5:00", location: "Discord", currentMembers: 2, maxMembers: 5, hostName: "호스트F", hostInitial: "F" },
  { title: "마포 운동 모임", round: 2, tags: [{ label: "#마포", category: "location" }, { label: "#아침", category: "time" }, { label: "#운동", category: "goal" }], date: "3/15(일) 오전 8:00", location: "마포구민체육센터", currentMembers: 4, maxMembers: 6, hostName: "호스트G", hostInitial: "G" },
  { title: "혜화 글쓰기 모임", round: 7, tags: [{ label: "#혜화", category: "location" }, { label: "#오후", category: "time" }, { label: "#글쓰기", category: "goal" }], date: "3/16(월) 오후 3:00", location: "대학로 카페", currentMembers: 3, maxMembers: 4, hostName: "호스트H", hostInitial: "H" },
];

const ITEMS_PER_PAGE = 6;

export default function FeedView() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<Record<TAG_CATEGORY, Set<string>>>({
    location: new Set(),
    time: new Set(),
    goal: new Set(),
  });

  const totalPages = Math.ceil(MOCK_MEETINGS.length / ITEMS_PER_PAGE);
  const showPagination = MOCK_MEETINGS.length > ITEMS_PER_PAGE;
  const pagedMeetings = MOCK_MEETINGS.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  function toggleTag(category: TAG_CATEGORY, tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev[category]);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return { ...prev, [category]: next };
    });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-(--color-bg-default)">
      {/* Sidebar */}
      <div className="w-60 shrink-0">
        <Sidebar />
      </div>

      {/* Content 영역 — h-screen 내에서 완결 */}
      <div className="relative flex-1 py-4 pr-4">
        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-(--color-surface-default) shadow-[0_0_16px_0_rgba(0,0,0,0.06)]">
          {/* 상단: 헤더 + 필터 (고정) */}
          <div className="shrink-0 py-6 pl-7 pr-6">
            {/* 헤더 */}
            <div className="flex items-center justify-between">
              <h1 className="text-heading-2 text-(--color-text-primary)">모임 피드</h1>
              <button className="flex items-center gap-1.5 rounded-xl bg-(--color-interactive-primary) px-4 py-2 text-label-large text-(--color-text-inverse)">
                <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
                  <PlusIcon className="block size-full" />
                </div>
                모임 개설
              </button>
            </div>

            {/* 필터 영역 */}
            <div className="mt-4 flex flex-col gap-4">
              <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <TagChipDropdown
                selectedTags={selectedTags}
                onToggleTag={toggleTag}
                onResetAll={() => setSelectedTags({ location: new Set(), time: new Set(), goal: new Set() })}
              />
              <SearchInput value={searchValue} onChange={setSearchValue} />
            </div>
          </div>

          {/* 하단: 결과 + 카드 + 페이지네이션 */}
          <div className="flex min-h-0 flex-1 flex-col pl-7 pr-6">
            <div className="shrink-0 ">
              <ResultHeader meetingCount={MOCK_MEETINGS.length} />
            </div>

            {/* 카드 그리드 — 남은 공간 안에서 aspect로 축소 */}
            <div className="mt-3 min-h-0 flex-1 overflow-hidden">
              <div className="grid h-full grid-cols-3 grid-rows-2 gap-x-3.5 gap-y-3 text-[clamp(12px,1.8vh,16px)]">
                {pagedMeetings.map((meeting) => (
                  <FeedMeetingCard key={meeting.title} {...meeting} />
                ))}
              </div>
            </div>
          </div>

          {/* 페이지네이션 — content-card 바닥 고정 */}
          {showPagination && (
            <div className="flex shrink-0 justify-center py-3">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
