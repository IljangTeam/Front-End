import FeatureRow from "./FeatureRow";

const FEATURES = [
  {
    stepLabel: "STEP 01 — 태그 설정",
    title: "딱 3가지만 고르면 돼요\n지역, 시간, 목표",
    description:
      "복잡한 설정 없이 칩 3개 선택으로 끝.\n선택한 태그가 홈 피드를 바로 채워요.",
  },
  {
    stepLabel: "STEP 02 — 모임 찾기·개설",
    title: "내 태그에 맞는 모임이\n바로 보여요",
    description:
      "피드를 따로 뒤질 필요 없어요.\n태그 기반으로 자동 스크리닝된 모임이 홈에 올라와 있어요.",
  },
  {
    stepLabel: "STEP 03 — 각자 작업",
    title: "같이 있으면\n하게 돼요",
    description:
      "프로젝트 없어도 돼요. 각자 할 거 들고 와서,\n같은 공간에 있으면 그걸로 충분해요.",
  },
  {
    stepLabel: "STEP 04 — 회고",
    title: "같이 있으니까\n이만큼 했네",
    description:
      "모임 끝나고 한 줄만 남겨요.\n쌓이다 보면 나만의 작업 히스토리가 돼요.",
  },
] as const;

export default function FeatureSection() {
  return (
    <div className="mx-auto flex max-w-345 flex-col gap-5 px-7.5">
      {FEATURES.map((feature, i) => (
        <FeatureRow
          key={feature.stepLabel}
          index={i}
          stepLabel={feature.stepLabel}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
