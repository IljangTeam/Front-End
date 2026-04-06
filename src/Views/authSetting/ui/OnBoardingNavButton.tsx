"use client";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { ArrowRightIcon } from "@/shared/assets/icons";

interface OnBoardingNavButtonProps {
  state?: "default" | "selected";
  direction: "next" | "prev";
  onClick: () => void;
}

export default function OnBoardingNavButton({
  direction,
  state = "default",
  onClick,
}: OnBoardingNavButtonProps) {
  return (
    <>
      {direction === "next" && (
        <NextContainer type="button" state={state} onClick={onClick}>
          <ArrowRightIcon />
          다음
        </NextContainer>
      )}
      {direction === "prev" && (
        <PrevContainer type="button" onClick={onClick}>
          이전
        </PrevContainer>
      )}
    </>
  );
}

const selected_color = css`
  background: var(--color-interactive-primary);
`;

const NextContainer = styled.button<{
  state: OnBoardingNavButtonProps["state"];
}>`
  cursor: pointer;

  display: inline-flex;
  padding: var(--space-3, 12px) var(--space-5, 20px);
  justify-content: center;
  align-items: center;
  /* 텍스트에 비례하여 늘어나도록 */
  width: fit-content; /* 콘텐츠 크기에 맞춤 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  gap: var(--space-2, 8px);
  border-radius: var(--space-3, 12px);
  color: var(--color-text-inverse);

  ${({ state }) =>
    state === "selected"
      ? selected_color
      : `background: var(--color-status-neutral);`}

  &:hover, &:active {
    ${selected_color}
  }
`;

const PrevContainer = styled.button`
  cursor: pointer;
  display: inline-flex;
  padding: var(--space-3, 12px) var(--space-5, 20px);
  align-items: center;
  /* 텍스트에 비례하여 늘어나도록 */
  width: fit-content; /* 콘텐츠 크기에 맞춤 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  gap: var(--space-2, 8px);
  border-radius: var(--space-3, 12px);

  color: var(--color-text-tertiary);
  border: 1px solid var(--color-border-default, #e8e6ed);
  background: var(--color-surface-default, #fff);
`;
