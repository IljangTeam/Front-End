import StepTag from "./StepTag";
import Header from "./Header";
import TagWrapper from "./TagWrapper";
import OnBoardingNavButton from "./OnBoardingNavButton";
import { TAG_AXIS } from "@/shared/types/SettingTagType";

interface SettingFormProps {
  axis: TAG_AXIS;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export default function SettingForm({
  axis,
  onClickPrev,
  onClickNext,
}: SettingFormProps) {
  return (
    <main
      className="
        flex flex-col items-start p-10 gap-5 self-stretch 
        rounded-2xl border border-[0.667px] border-[var(--color-border-default)] 
        bg-[var(--color-surface-default)] shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] 
        "
    >
      <StepTag axis={axis} />
      <Header axis={axis} />
      <TagWrapper axis={axis} />
      <div className="flex flex-row justify-between items-center w-full">
        <OnBoardingNavButton direction="prev" onClick={onClickPrev} />
        <OnBoardingNavButton direction="next" onClick={onClickNext} />
      </div>
    </main>
  );
}
