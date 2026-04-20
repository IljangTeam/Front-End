"use client";

import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { TAG_CATEGORY } from "@/shared/types/SettingTagType";
import { ChevronDownIcon, ChevronUpIcon } from "@/shared/assets/icons";
import { useChipDropdownState } from "../model/useChipDropdownState";

const FILTER_DATA: Record<TAG_CATEGORY, { label: string; tags: string[] }> = {
  location: {
    label: "지역",
    tags: ["홍대", "성수", "마포", "혜화", "구로", "신촌", "이대", "강남", "종로", "명동", "여의도"],
  },
  time: {
    label: "시간",
    tags: ["오전", "오후", "저녁", "밤"],
  },
  goal: {
    label: "목표",
    tags: ["독서", "작업", "공부", "취미"],
  },
};

const TAG_COLOR_STYLES: Record<TAG_CATEGORY, ReturnType<typeof css>> = {
  location: css`
    color: var(--color-tag-location);
    background: var(--color-tag-location-bg);
    box-shadow: inset 0 0 0 1.5px var(--color-tag-location);
  `,
  time: css`
    color: var(--color-tag-time);
    background: var(--color-tag-time-bg);
    box-shadow: inset 0 0 0 1.5px var(--color-tag-time);
  `,
  goal: css`
    color: var(--color-tag-goal);
    background: var(--color-tag-goal-bg);
    box-shadow: inset 0 0 0 1.5px var(--color-tag-goal);
  `,
};

const FilterTag = styled.button<{ category: TAG_CATEGORY; isSelected: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  transition: box-shadow 0.1s;

  ${({ category, isSelected }) =>
    isSelected
      ? TAG_COLOR_STYLES[category]
      : css`
          color: var(--color-text-tertiary);
          background: var(--color-surface-default);
        `}
`;

type SelectedTags = Record<TAG_CATEGORY, Set<string>>;

const CATEGORIES: TAG_CATEGORY[] = ["location", "time", "goal"];

export default function TagChipDropdown() {
  const { state, expand, showOverlay, collapse, shrink } = useChipDropdownState();
  const [selectedTags, setSelectedTags] = useState<SelectedTags>({
    location: new Set(),
    time: new Set(),
    goal: new Set(),
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const totalSelected = CATEGORIES.reduce(
    (acc, cat) => acc + selectedTags[cat].size,
    0,
  );

  const allSelectedTags = CATEGORIES.flatMap((cat) =>
    [...selectedTags[cat]].map((tag) => ({ tag, category: cat })),
  );

  function toggleTag(category: TAG_CATEGORY, tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev[category]);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return { ...prev, [category]: next };
    });
  }

  // ESC 키 → collapsed
  useEffect(() => {
    if (state !== "overlay") return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        collapse();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, collapse]);

  const HIDDEN_THRESHOLD = 3;
  const visibleTags = allSelectedTags.slice(0, HIDDEN_THRESHOLD);
  const hiddenCount = allSelectedTags.length - HIDDEN_THRESHOLD;

  if (state === "collapsed") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5 py-4">
        <span className="text-body-small text-(--color-text-secondary) shrink-0">
          필터 {totalSelected}개 선택됨
        </span>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {visibleTags.map(({ tag, category }) => (
              <FilterTag
                key={`${category}-${tag}`}
                category={category}
                isSelected
              >
                #{tag}
              </FilterTag>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          {hiddenCount > 0 && (
            <button
              className="text-body-small text-(--color-text-accent) font-semibold"
              onClick={showOverlay}
            >
              +{hiddenCount}
            </button>
          )}
          <button
            className="flex size-5 shrink-0 items-center justify-center"
            onClick={expand}
            aria-label="필터 펼치기"
          >
            <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
              <ChevronDownIcon className="block size-full text-(--color-text-secondary)" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (state === "expanded") {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5 py-4">
        {CATEGORIES.map((cat) => (
          <div key={cat} className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-(--color-text-tertiary)">
              {FILTER_DATA[cat].label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_DATA[cat].tags.map((tag) => (
                <FilterTag
                  key={tag}
                  category={cat}
                  isSelected={selectedTags[cat].has(tag)}
                  onClick={() => toggleTag(cat, tag)}
                >
                  #{tag}
                </FilterTag>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-1">
          {hiddenCount > 0 && (
            <button
              className="text-body-small text-(--color-text-accent) font-semibold"
              onClick={showOverlay}
            >
              +{hiddenCount}개 더 보기
            </button>
          )}
          <button
            className="ml-auto flex items-center justify-center"
            onClick={collapse}
            aria-label="필터 접기"
          >
            <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
              <ChevronUpIcon className="block size-full text-(--color-text-secondary)" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  // overlay 상태
  return (
    <>
      {/* 스크림 */}
      <div
        className="fixed inset-0 z-10 bg-[#000]/10"
        onClick={collapse}
        aria-hidden="true"
      />

      {/* 드롭다운 패널 */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="태그 필터"
        className="relative z-20 flex flex-col gap-3 rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5 py-4 shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]"
      >
        {CATEGORIES.map((cat) => (
          <div key={cat} className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-(--color-text-tertiary)">
              {FILTER_DATA[cat].label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_DATA[cat].tags.map((tag) => (
                <FilterTag
                  key={tag}
                  category={cat}
                  isSelected={selectedTags[cat].has(tag)}
                  onClick={() => toggleTag(cat, tag)}
                >
                  #{tag}
                </FilterTag>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-1">
          <button
            className="text-body-small text-(--color-text-accent) font-semibold"
            onClick={shrink}
          >
            − 줄이기
          </button>
          <button
            className="ml-auto flex items-center justify-center"
            onClick={collapse}
            aria-label="필터 접기"
          >
            <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
              <ChevronUpIcon className="block size-full text-(--color-text-secondary)" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
