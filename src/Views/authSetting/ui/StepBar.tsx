import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { CheckIcon } from "@/shared/assets/icons";

interface StepBarProps {
  currentStep: 1 | 2 | 3;
  totalSteps?: number;
}

type StepState = "completed" | "current" | "upcoming";

const completed_color = css`
  color: var(--color-surface-default);
  background: var(--color-text-primary);
`;

const upcoming_color = css`
  color: var(--color-text-tertiary, #a09eaa);
  background: var(--color-border-default, #e8e6ed);
`;

export default function StepBar({ currentStep, totalSteps = 3 }: StepBarProps) {
  const getStepState = (step: number): StepState => {
    if (step < currentStep) return "completed";
    if (step === currentStep) return "current";
    return "upcoming";
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const state = getStepState(step);

        return (
          <div key={step} className="flex items-center justify-between gap-2">
            <CircleWrapper state={state}>
              {state === "completed" ? <CheckIcon /> : step}
            </CircleWrapper>

            {step < totalSteps && <BarLine isCompleted={step < currentStep} />}
          </div>
        );
      })}
    </div>
  );
}

const CircleWrapper = styled.div<{ state: StepState }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  width: 40px;
  height: 40px;

  ${({ state }) => (state === "upcoming" ? upcoming_color : completed_color)}
`;

const BarLine = styled.div<{ isCompleted: boolean }>`
  height: 2px;
  width: 32px;
  background: ${({ isCompleted }) =>
    isCompleted
      ? "var(--color-text-primary)"
      : "var(--color-border-default, #e8e6ed)"};
`;
