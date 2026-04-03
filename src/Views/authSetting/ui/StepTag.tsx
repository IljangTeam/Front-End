"use client";

import styled from "@emotion/styled";
import { axisColors } from "@/shared/ui";
import { MapPinIcon, ClockIcon, TargetIcon } from "@/shared/assets/icons";
import { TAG_AXIS } from "@/shared/types/SettingTagType";

interface StepTagProps {
  axis: TAG_AXIS;
}

const TAG_CONTENTS = {
  location: "지역",
  time: "시간",
  goal: "목표",
};

export default function StepTag({ axis }: StepTagProps) {
  return (
    <Container axis={axis}>
      {axis === "location" && <MapPinIcon />}
      {axis === "time" && <ClockIcon />}
      {axis === "goal" && <TargetIcon />}

      {TAG_CONTENTS[axis]}
    </Container>
  );
}

const Container = styled.div<{ axis: StepTagProps["axis"] }>`
  display: flex;
  flex-direction: row;
  padding: var(--space-2, 8px) var(--space-3, 12px) var(--space-2, 8px)
    var(--space-2, 8px);
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;

  /* 텍스트에 비례하여 늘어나도록 */
  width: fit-content; /* 콘텐츠 크기에 맞춤 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  ${({ axis }) => axisColors[axis]}
`;
