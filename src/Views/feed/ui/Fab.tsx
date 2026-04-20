import { PlusIcon } from "@/shared/assets/icons";

export default function Fab() {
  return (
    <button
      className="absolute right-4 bottom-4 flex size-[54px] items-center justify-center rounded-xl bg-(--color-interactive-primary) shadow-[0_2px_10px_0_rgba(0,0,0,0.2)]"
      aria-label="모임 개설"
    >
      <div className="size-6 shrink-0 overflow-hidden" aria-hidden="true">
        <PlusIcon className="block size-full text-(--color-text-inverse)" />
      </div>
    </button>
  );
}
