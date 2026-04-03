import Image from "next/image";

const STEPS = [
  {
    icon: "/assets/icons/tag-landing-4step.svg",
    step: "STEP 01",
    title: "태그 설정",
    description:
      "지역 · 시간 · 목표 태그를 설정하면 나에게 맞는 모임이 자동으로 보여요.",
  },
  {
    icon: "/assets/icons/meeting-landing-4step.svg",
    step: "STEP 02",
    title: "모임 찾기 · 개설",
    description: "태그 기반 피드에서 모임을 찾거나,\n직접 모임을 열 수 있어요.",
  },
  {
    icon: "/assets/icons/link-landing-4step.svg",
    step: "STEP 03",
    title: "각자 작업",
    description:
      "같은 공간에서 각자 집중해요.\n방해 없이, 혼자보다 훨씬 잘돼요.",
  },
  {
    icon: "/assets/icons/pen-landing-4step.svg",
    step: "STEP 04",
    title: "회고",
    description:
      '"오늘 뭐 했나요?"\n한 줄 기록이 나만의 히스토리가 돼요.',
  },
] as const;

export default function HowItWorksSection() {
  return (
    <div className="mx-auto max-w-345 px-7.5">
      <div className="flex flex-col items-center gap-12 rounded-4xl border border-(--color-border-default) bg-(--color-bg-default) py-16 px-8">
        {/* 타이틀 */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-heading-1 text-(--color-text-primary)">
            딱 4단계예요
          </h2>
          <p className="text-body-large text-(--color-text-secondary)">
            어렵지 않아요. 태그 설정하고, 모임 찾고, 작업하고, 회고하면 돼요.
          </p>
        </div>

        {/* 4컬럼 그리드 */}
        <div className="grid w-300 grid-cols-4 gap-11.5">
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col items-center gap-2.75"
            >
              {/* 아이콘 */}
              <div className="flex size-14 items-center justify-center rounded-2xl bg-(--color-surface-default)">
                <Image
                  src={step.icon}
                  alt=""
                  width={22}
                  height={22}
                />
              </div>

              {/* STEP 라벨 */}
              <span className="text-label tracking-[0.5px] text-(--color-text-tertiary)">
                {step.step}
              </span>

              {/* 제목 */}
              <span className="text-[17px] font-bold leading-[1.5] text-(--color-text-primary)">
                {step.title}
              </span>

              {/* 설명 */}
              <p className="whitespace-pre-line text-center text-body text-(--color-text-secondary)">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
