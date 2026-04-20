"use client";

import { useEffect } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import type { TAG_CATEGORY } from "@/shared/types/SettingTagType";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@/shared/assets/icons";
import { useChipDropdownState } from "../model/useChipDropdownState";

const FILTER_DATA: Record<TAG_CATEGORY, { label: string; tags: string[] }> = {
  location: {
    label: "지역",
    tags: [
      "홍대", "성수", "마포", "혜화", "구로", "신촌",
      "이대", "강남", "종로", "명동", "여의도",
      "가리봉", "압구정", "부암동", "신사동", "청담동", "광명", "온라인", "용산", "건대", "합정", "상수", "연남", "성신여대", "동대문", "왕십리", "노원", "수유", "인천", "부산",
    ],
  },
  time: { label: "시간", tags: ["오전", "오후", "저녁", "밤", "새벽"] },
  goal: { label: "목표", tags: ["독서", "작업", "공부", "취미"] },
};

const TAG_STYLES: Record<TAG_CATEGORY, { color: string; bg: string; border: string }> = {
  location: { color: "var(--color-tag-location)", bg: "var(--color-tag-location-bg)", border: "var(--color-tag-location)" },
  time: { color: "var(--color-tag-time)", bg: "var(--color-tag-time-bg)", border: "var(--color-tag-time)" },
  goal: { color: "var(--color-tag-goal)", bg: "var(--color-tag-goal-bg)", border: "var(--color-tag-goal)" },
};

const FilterTag = styled.button<{ $category: TAG_CATEGORY; $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  line-height: 1.5;

  ${({ $category, $selected }) =>
    $selected
      ? css`
          color: ${TAG_STYLES[$category].color};
          background: ${TAG_STYLES[$category].bg};
          border: 1.5px solid ${TAG_STYLES[$category].border};
        `
      : css`
          color: var(--color-text-tertiary);
          background: var(--color-bg-default);
          border: 1.5px solid transparent;
        `}
`;

const CATEGORIES: TAG_CATEGORY[] = ["location", "time", "goal"];

interface TagChipDropdownProps {
  selectedTags: Record<TAG_CATEGORY, Set<string>>;
  onToggleTag: (category: TAG_CATEGORY, tag: string) => void;
  onResetAll: () => void;
}

export default function TagChipDropdown({ selectedTags, onToggleTag, onResetAll }: TagChipDropdownProps) {
  const { isOpen, open, close, expandCategory, collapseCategory, isCategoryExpanded } =
    useChipDropdownState();

  const totalSelected = CATEGORIES.reduce((acc, cat) => acc + selectedTags[cat].size, 0);
  const allSelectedChips = CATEGORIES.flatMap((cat) =>
    [...selectedTags[cat]].map((tag) => ({ tag, category: cat })),
  );

  // ESC → 닫기
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return (
    <div className="relative">
      {/* ── collapsed bar ── */}
      <div className="flex h-14 w-full items-center gap-2 overflow-hidden rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5">
        <span className="text-[11px] font-bold text-(--color-text-tertiary) shrink-0">
          필터{totalSelected > 0 ? `  ${totalSelected}개 선택됨` : ""}
        </span>

        {allSelectedChips.length > 0 && (
          <div className="flex items-center gap-3 min-w-0 overflow-hidden">
            {allSelectedChips.map(({ tag, category }) => (
              <FilterTag
                key={`${category}-${tag}`}
                $category={category}
                $selected
                onClick={() => onToggleTag(category, tag)}
              >
                {tag}
              </FilterTag>
            ))}
          </div>
        )}

        <div className="ml-auto flex items-center gap-2 shrink-0">
          {totalSelected > 0 && (
            <button
              onClick={onResetAll}
              className="text-[11px] text-(--color-text-tertiary) hover:text-(--color-text-secondary)"
            >
              필터 초기화
            </button>
          )}
          <button
            onClick={isOpen ? close : open}
            className="size-6 overflow-hidden"
            aria-label={isOpen ? "필터 접기" : "필터 펼치기"}
          >
            {isOpen ? (
              <ChevronUpIcon className="block size-full text-(--color-text-secondary)" />
            ) : (
              <ChevronDownIcon className="block size-full text-(--color-text-secondary)" />
            )}
          </button>
        </div>
      </div>

      {/* ── 드롭다운 패널 (absolute로 아래 요소 위를 덮음) ── */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-5 py-4 shadow-[0_0_16px_0_rgba(0,0,0,0.06)]"
        >
          <div className="flex flex-col gap-2">
            {CATEGORIES.map((cat) => {
              const tags = FILTER_DATA[cat].tags;
              const expanded = isCategoryExpanded(cat);
              // 첫 줄은 overflow-hidden + max-h로 1행만 보여줌, expanded시 전체 표시
              const needsExpand = tags.length > 10;

              return (
                <div key={cat} className="flex items-start gap-3">
                  <span className="text-[11px] font-bold text-(--color-text-tertiary) shrink-0 w-7 pt-1">
                    {FILTER_DATA[cat].label}
                  </span>

                  <div
                    className={`flex flex-1 flex-wrap items-center gap-3 ${
                      !expanded && needsExpand ? "max-h-8 overflow-hidden" : ""
                    }`}
                  >
                    {tags.map((tag) => (
                      <FilterTag
                        key={tag}
                        $category={cat}
                        $selected={selectedTags[cat].has(tag)}
                        onClick={() => onToggleTag(cat, tag)}
                      >
                        {tag}
                      </FilterTag>
                    ))}
                  </div>

                  {needsExpand && (
                    <button
                      onClick={() => expanded ? collapseCategory(cat) : expandCategory(cat)}
                      className="flex shrink-0 items-center gap-1 text-body-small text-(--color-text-secondary) whitespace-nowrap pt-0.5"
                    >
                      {expanded ? (
                        <>닫기 <span>−</span></>
                      ) : (
                        <>
                          <span>{tags.length - 10}</span>
                          <div className="size-3 overflow-hidden" aria-hidden="true">
                            <PlusIcon className="block size-full" />
                          </div>
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}
