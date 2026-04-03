import TagChip from "@/shared/ui/TagChip";

export default function MyTagWrapper() {
  return (
    <div
      className="
    flex flex-col items-start gap-2 self-stretch px-9 py-10 
    rounded-2xl border-[0.667px] border-[var(--color-border-default)] 
    bg-[var(--color-surface-default)] 
    shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]
    "
    >
      <span className="text-[var(--color-text-tertiary)] gap-2">
        설정된 나의 태그
      </span>
      <div className="flex flex-row justify-start items-center gap-2">
        <TagChip axis="location" state="default" content="홍대" />
        <TagChip axis="time" state="default" content="오후" />
        <TagChip axis="goal" state="default" content="작업" />
      </div>
    </div>
  );
}
