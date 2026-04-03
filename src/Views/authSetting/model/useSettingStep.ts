"use client";
import { useState } from "react";
import { TAG_AXIS } from "@/shared/types/SettingTagType";

export function useSettingStep() {
  const [currentStep, setCurrentStep] = useState<TAG_AXIS>("location");

  const handleClickNextButton = (step: TAG_AXIS) => {
    if (step === "location") {
      setCurrentStep("time");
    }
    if (step === "time") {
      setCurrentStep("goal");
    }
    return;
  };

  const handleClickPrevButton = (step: TAG_AXIS) => {
    if (step === "time") {
      setCurrentStep("location");
    }
    if (step === "goal") {
      setCurrentStep("time");
    }
    return;
  };

  return {
    currentStep,
    setCurrentStep,
    handleClickPrevButton,
    handleClickNextButton,
  };
}
