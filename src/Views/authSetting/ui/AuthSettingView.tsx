"use client";
import SettingForm from "./SettingForm";
import StepBar from "./StepBar";
import MyTagWrapper from "./MyTagWrapper";

import { useSettingStep } from "../model/useSettingStep";
import { TAG_AXIS } from "@/shared/types/SettingTagType";

const STEP_NUMBER: Record<TAG_AXIS, 1 | 2 | 3> = {
  location: 1,
  time: 2,
  goal: 3,
};

export default function AuthSettingView() {
  const { currentStep, handleClickPrevButton, handleClickNextButton } =
    useSettingStep();

  return (
    <div className="flex flex-col justify-center items-center h-screen px-[460px] gap-8">
      <StepBar currentStep={STEP_NUMBER[currentStep]} totalSteps={3} />
      <SettingForm
        axis={currentStep}
        onClickPrev={() => handleClickPrevButton(currentStep)}
        onClickNext={() => handleClickNextButton(currentStep)}
      />
      {currentStep === "goal" && <MyTagWrapper />}
    </div>
  );
}
