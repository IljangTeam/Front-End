import { TAG_AXIS } from "@/shared/types/SettingTagType";

interface HeaderProps {
  axis: TAG_AXIS;
}

const ESSENTIAL_MESSAGE: string = `최소 1개 선택 필수`;

const HEADER_CONTENTS = {
  location: {
    title: "어디서 만나고 싶어요?",
    caption: "선호하는 위치를 모두 선택해주세요",
  },
  time: {
    title: "언제 모이고 싶어요?",
    caption: "선호하는 시간대를 모두 선택해주세요",
  },
  goal: {
    title: "주로 뭘 하러 오실 예정이에요?",
    caption: "해당하는 것을 모두 선택해주세요",
  },
};

export default function Header({ axis }: HeaderProps) {
  return (
    <header className="flex flex-col justify-center items-start gap-3">
      <p className="text-heading-2">{HEADER_CONTENTS[`${axis}`].title}</p>
      {/* TODO : 토큰 시스템 추가되면 변경 예정 */}
      <div className=" flex flex-row justify-center text-[var(--color-text-tertiary)] gap-3">
        <span>{HEADER_CONTENTS[`${axis}`].caption}</span>
        <span className="text-[var(--color-interactive-danger)]">
          {ESSENTIAL_MESSAGE}
        </span>
      </div>
    </header>
  );
}
