import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#ebebeb] px-30 py-8">
      <div className="mx-auto flex max-w-345 items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-(--color-interactive-primary)">
            <span className="text-[11px] font-bold leading-normal text-white">
              각
            </span>
          </div>
          <span className="text-[13px] text-[#717182]">각할모</span>
        </div>

        {/* 슬로건 */}
        <p className="text-[12px] text-[#cbcbd4]">
          의지박약 현대인을 위한 각자 할 거 하는 모임 플랫폼
        </p>
      </div>
    </footer>
  );
}
