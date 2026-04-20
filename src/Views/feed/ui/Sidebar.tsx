"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import {
  HomeIcon,
  MessageCircleIcon,
  UserIcon,
  PlusIcon,
} from "@/shared/assets/icons";

interface NavItemProps {
  isActive?: boolean;
}

const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 12px;
  border-radius: 12px;
  background: ${({ isActive }) =>
    isActive ? "var(--color-interactive-primary)" : "transparent"};
  color: ${({ isActive }) =>
    isActive ? "var(--color-text-inverse)" : "var(--color-text-secondary)"};
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 500;

  svg {
    color: ${({ isActive }) =>
      isActive ? "var(--color-text-inverse)" : "var(--color-text-secondary)"};
  }
`;

const NAV_ITEMS = [
  { id: "home", label: "홈", Icon: HomeIcon, isActive: true },
  { id: "messages", label: "대화함", Icon: MessageCircleIcon, isActive: false },
  { id: "mypage", label: "마이페이지", Icon: UserIcon, isActive: false },
];

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col bg-(--color-bg-default)">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 pt-6 pb-4">
        <Image
          src="/assets/icons/logo-landing.svg"
          alt="GAKALMO 로고"
          width={36}
          height={36}
          className="rounded"
        />
        <span className="text-[24px] font-bold text-(--color-text-primary)">
          GAKALMO
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col px-3 py-4">
        {NAV_ITEMS.map(({ id, label, Icon, isActive }) => (
          <NavItem key={id} isActive={isActive}>
            <div
              className="size-4.5 shrink-0 overflow-hidden"
              aria-hidden="true"
            >
              <Icon className="block size-full" />
            </div>
            {label}
          </NavItem>
        ))}

        <div className="my-3 border-t border-(--color-border-subtle) w-48.75 mx-auto" />

        <NavItem isActive={false}>
          <div
            className="size-4.5 shrink-0 overflow-hidden"
            aria-hidden="true"
          >
            <PlusIcon className="block size-full" />
          </div>
          모임 개설
        </NavItem>
      </nav>

      {/* Account — 하단에 고정 */}
      <div className="mt-auto p-3">
        <div className="flex items-center gap-2">
          <div
            className="flex size-7 shrink-0 items-center justify-center rounded-[15px] bg-(--color-accent-subtle)"
            aria-hidden="true"
          >
            <span className="text-[16px] font-bold text-(--color-text-accent)">
              김
            </span>
          </div>
          <span className="text-[14px] font-semibold text-(--color-text-secondary)">
            김가칼모
          </span>
        </div>
      </div>
    </div>
  );
}
