"use client";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { TAG_CATEGORY } from "../types/SettingTagType";

interface TagChipProps {
  axis: TAG_CATEGORY;
  state: "default" | "selected" | "disabled";
  content: string;
}

/* TODO : API 연동 후 값에 맞게 변경 */
// const Temp_TagChipContents = {
//   location: "온라인",
//   time: "저녁",
//   goal: "독서",
// };

export default function TagChip({ axis, state, content }: TagChipProps) {
  return (
    <Container
      type="button"
      axis={axis}
      state={state}
      disabled={state === "disabled"} // HTML5 표준 비활성화 처리. focus 불가능 처리.
      aria-disabled={state === "disabled"} // 스크린 리더에게 해당 요소 비활성화 됨 전달.
    >
      {/* #{Temp_TagChipContents[axis]} */}# {content}
    </Container>
  );
}

// 색상만 정의 (border 제외)
export const axisColors = {
  location: css`
    color: var(--color-tag-location);
    fill: var(--color-tag-location);
    background: var(--color-tag-location-bg);
  `,
  time: css`
    color: var(--color-tag-time);
    fill: var(--color-tag-time);
    background: var(--color-tag-time-bg);
  `,
  goal: css`
    color: var(--color-tag-goal);
    fill: var(--color-tag-goal);
    background: var(--color-tag-goal-bg);
  `,
};

// border는 state에서 axis 색상을 참조하여 처리
const borderColors = {
  location: "var(--color-tag-location)",
  time: "var(--color-tag-time)",
  goal: "var(--color-tag-goal)",
};

const Container = styled.button<{
  axis: TagChipProps["axis"];
  state: TagChipProps["state"];
}>`
  display: inline-flex;
  padding: 4px 8px;
  align-items: center;
  gap: 10px;
  border-radius: 20px;

  min-height: 26px;

  /* 텍스트에 비례하여 늘어나도록 */
  width: fit-content; /* 콘텐츠 크기에 맞춤 */
  min-width: 55px; /* 최소 너비 보장 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */

  /* state별 전체 스타일을 한 곳에서 처리 */
  ${({ axis, state }) => {
    if (state === "disabled") {
      return css`
        cursor: not-allowed;
        color: var(--color-text-tertiary);
        background: var(--color-surface-default);
        border: 1px solid var(--color-border-default);
        opacity: 0.6;
      `;
    }

    if (state === "selected") {
      return css`
        ${axisColors[axis]}
        border: none;
        box-shadow: inset 0 0 0 1.5px ${borderColors[axis]};
      `;
    }

    // default
    return css`
      ${axisColors[axis]}
      border: none;
    `;
  }}

  &:hover, &:active, &:focus {
    // selected가 hover 시에도 동일하게 적용
    ${({ axis, state }) =>
      state !== "disabled" &&
      css`
        cursor: pointer;
        ${axisColors[axis]}
        box-shadow: inset 0 0 0 1.5px ${borderColors[axis]};
      `}
  }
`;
