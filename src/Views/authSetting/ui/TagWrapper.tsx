import TagChip from "@/shared/ui/TagChip";
import { TAG_CATEGORY } from "@/shared/types/SettingTagType";

interface TagWrapper {
  axis: TAG_CATEGORY;
}

const TEMP_CONTENTS = {
  location: [
    "온라인",
    "성수",
    "홍대",
    "고터",
    "건대",
    "마포",
    "구로디지털",
    "서울대입구",
    "용산",
    "혜화",
    "사당",
  ],
  time: ["아침", "오전", "오후", "저녁", "새벽"],
  goal: ["공부", "작업", "독서", "자기계발"],
};

export default function TagWrapper({ axis }: TagWrapper) {
  return (
    <div className="flex flex-row items-start content-start self-stretch flex-wrap gap-2.5">
      {TEMP_CONTENTS[axis].map((item, index) => (
        <TagChip key={index} axis={axis} state="disabled" content={item} />
      ))}
    </div>
  );
}
