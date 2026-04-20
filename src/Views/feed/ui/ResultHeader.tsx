import styled from "@emotion/styled";
import { GridIcon, ListIcon } from "@/shared/assets/icons";

interface ResultHeaderProps {
  meetingCount: number;
}

const ViewButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  border: none;
  cursor: ${({ isActive }) => (isActive ? "default" : "pointer")};
  background: ${({ isActive }) =>
    isActive ? "var(--color-surface-default)" : "transparent"};
  box-shadow: ${({ isActive }) =>
    isActive ? "inset 0 0 0 1px var(--color-border-default)" : "none"};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.4)};
`;

export default function ResultHeader({ meetingCount }: ResultHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      {/* 좌: 카운트 + 실시간 배지 */}
      <div className="flex items-center gap-3">
        <p className="text-[13px] text-(--color-text-secondary)">
          <span className="font-bold text-(--color-text-primary)">
            {meetingCount}개
          </span>
          의 모임이 열려 있어요
        </p>

        <div className="flex items-center gap-1.5">
          <div
            className="size-1.5 rounded-full bg-(--color-status-success) opacity-60"
            aria-hidden="true"
          />
          <span className="text-[12px] text-(--color-text-secondary)">
            실시간 업데이트
          </span>
        </div>
      </div>

      {/* 우: ViewToggle */}
      <div className="flex items-center gap-0.5 rounded-lg bg-(--color-bg-default) p-1">
        <ViewButton isActive aria-label="그리드 보기" aria-pressed="true">
          <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
            <GridIcon className="block size-full text-(--color-text-primary)" />
          </div>
        </ViewButton>
        <ViewButton isActive={false} aria-label="리스트 보기" aria-pressed="false">
          <div className="size-4 shrink-0 overflow-hidden" aria-hidden="true">
            <ListIcon className="block size-full text-(--color-text-secondary)" />
          </div>
        </ViewButton>
      </div>
    </div>
  );
}
