"use client";

import styled from "@emotion/styled";

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: "all", label: "전체" },
  { id: "online", label: "온라인" },
  { id: "offline", label: "오프라인" },
];

const Tab = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  ${({ isActive }) =>
    isActive
      ? `
    background: var(--color-interactive-primary);
    color: var(--color-text-inverse);
    border: none;
  `
      : `
    background: var(--color-bg-default);
    color: var(--color-text-primary);
    border: 1.5px solid var(--color-border-default);
  `}
`;

export default function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map(({ id, label }) => (
        <Tab
          key={id}
          isActive={activeTab === id}
          onClick={() => onTabChange(id)}
        >
          {label}
        </Tab>
      ))}
    </div>
  );
}
