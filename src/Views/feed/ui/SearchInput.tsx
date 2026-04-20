"use client";

import { SearchIcon } from "@/shared/assets/icons";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-(--color-border-default) bg-(--color-surface-default) px-4 py-2">
      <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
        <SearchIcon className="block size-full text-(--color-text-tertiary)" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="지역, 시간, 목표 태그로 검색해 보세요!"
        maxLength={100}
        className="flex-1 bg-transparent text-body text-(--color-text-primary) placeholder:text-(--color-text-tertiary) outline-none"
      />
    </div>
  );
}
