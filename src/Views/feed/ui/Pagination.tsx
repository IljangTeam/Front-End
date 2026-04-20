"use client";

import styled from "@emotion/styled";
import { ChevronLeftIcon, ChevronRightIcon } from "@/shared/assets/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: transparent;
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? "700" : "400")};
  color: ${({ isActive }) =>
    isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)"};

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center gap-4" aria-label="페이지 탐색">
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
          <ChevronLeftIcon className="block size-full" />
        </div>
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
          <ChevronRightIcon className="block size-full" />
        </div>
      </PageButton>
    </nav>
  );
}
