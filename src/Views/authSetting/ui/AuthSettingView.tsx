"use client";
import SettingForm from "./SettingForm";
import StepBar from "./StepBar";
import MyTagWrapper from "./MyTagWrapper";

import { useSettingStep } from "../model/useSettingStep";
import { TAG_CATEGORY } from "@/shared/types/SettingTagType";

const STEP_NUMBER: Record<TAG_CATEGORY, 1 | 2 | 3> = {
  location: 1,
  time: 2,
  goal: 3,
};

export default function AuthSettingView() {
  const { currentStep, handleClickPrevButton, handleClickNextButton } =
    useSettingStep();

  return (
    <div className="flex h-screen items-center justify-center bg-(--color-bg-default)">
      <div className="flex flex-col w-full max-w-130 gap-8">
        <StepBar currentStep={STEP_NUMBER[currentStep]} totalSteps={3} />
        <SettingForm
          axis={currentStep}
          onClickPrev={() => handleClickPrevButton(currentStep)}
          onClickNext={() => handleClickNextButton(currentStep)}
        />
        {currentStep === "goal" && <MyTagWrapper />}
      </div>
    </div>
  );
}
