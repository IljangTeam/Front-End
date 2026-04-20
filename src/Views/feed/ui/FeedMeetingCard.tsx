import type { ComponentType, ReactNode, SVGProps } from "react";
import type { TAG_CATEGORY } from "@/shared/types/SettingTagType";
import { TagIcon, ClockIcon, FlagIcon, UsersIcon } from "@/shared/assets/icons";

interface TagItem {
  label: string;
  category: TAG_CATEGORY;
}

export interface FeedMeetingCardProps {
  title: string;
  round: number;
  tags: TagItem[];
  date: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  hostName: string;
  hostInitial: string;
}

const TAG_CATEGORY_STYLES: Record<TAG_CATEGORY, string> = {
  location: "bg-(--color-tag-location-bg) text-(--color-tag-location)",
  time: "bg-(--color-tag-time-bg) text-(--color-tag-time)",
  goal: "bg-(--color-tag-goal-bg) text-(--color-tag-goal)",
};

function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-[0.8em] py-[0.1em]">
      <div className="flex items-center gap-[0.4em]">
        <div className="size-[1.1em] shrink-0 overflow-hidden" aria-hidden="true">
          <Icon className="block size-full text-(--color-text-secondary)" />
        </div>
        <span className="text-[0.85em] text-(--color-text-secondary)">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function CardTagChip({ category, children }: { category: TAG_CATEGORY; children: ReactNode }) {
  return (
    <span
      className={`rounded-full px-[0.5em] py-[0.1em] text-[0.78em] font-semibold ${TAG_CATEGORY_STYLES[category]}`}
    >
      {children}
    </span>
  );
}

function HostChip({ initial, name }: { initial: string; name: string }) {
  return (
    <div className="flex items-center gap-[0.4em]">
      <div className="flex size-[1.4em] items-center justify-center rounded-full bg-(--color-accent-subtle)" aria-hidden="true">
        <span className="text-[0.7em] text-(--color-text-accent)">
          {initial}
        </span>
      </div>
      <span className="text-[0.78em] text-(--color-text-secondary)">
        {name}
      </span>
    </div>
  );
}

export default function FeedMeetingCard({
  title,
  round,
  tags,
  date,
  location,
  currentMembers,
  maxMembers,
  hostName,
  hostInitial,
}: FeedMeetingCardProps) {
  const remaining = Math.max(0, maxMembers - currentMembers);

  return (
    <div className="flex h-full flex-col gap-[0.35em] rounded-[1em] border border-(--color-border-default) bg-(--color-bg-default) px-[0.5em] pt-[0.6em] pb-[0.4em] backdrop-blur-[2px]">
      {/* 카드 헤더 */}
      <div className="flex items-center justify-between px-[0.4em]">
        <span className="text-[1em] font-bold text-(--color-text-primary) truncate">
          {title}
        </span>
        <div className="flex shrink-0 items-center gap-[0.7em]">
          <span className="text-[0.78em] font-semibold text-(--color-text-tertiary)">
            #{round}회차
          </span>
          <span className="text-[0.78em] font-semibold text-(--color-status-success)">
            {currentMembers}/{maxMembers}명
          </span>
        </div>
      </div>

      {/* 카드 바디 */}
      <div className="flex flex-1 flex-col gap-[0.25em] rounded-[0.7em] border border-(--color-border-default) bg-(--color-surface-default) px-[0.8em] pt-[0.6em] pb-[0.4em]">
        <div className="flex flex-col gap-[0.25em]">
          <MetaRow icon={TagIcon} label="태그">
            <div className="flex items-center gap-[0.25em]">
              {tags.map((tag) => (
                <CardTagChip key={`${tag.category}-${tag.label}`} category={tag.category}>
                  {tag.label}
                </CardTagChip>
              ))}
            </div>
          </MetaRow>
          <MetaRow icon={ClockIcon} label="일시">
            <span className="text-[0.85em] text-(--color-text-primary)">{date}</span>
          </MetaRow>
          <MetaRow icon={FlagIcon} label="장소">
            <span className="text-[0.85em] text-(--color-text-primary)">{location}</span>
          </MetaRow>
          <MetaRow icon={UsersIcon} label="인원">
            <div className="flex items-center gap-[0.25em]">
              <span className="text-[0.85em] text-(--color-text-primary)">{currentMembers}/{maxMembers}명</span>
              <span className="text-[0.85em] text-(--color-text-primary)">·</span>
              <span className="text-[0.85em] font-semibold text-(--color-status-success)">{remaining}자리 남았어요</span>
            </div>
          </MetaRow>
        </div>

        <div className="mt-auto flex flex-col items-end border-t border-(--color-border-subtle) pt-[0.4em]">
          <HostChip initial={hostInitial} name={hostName} />
        </div>
      </div>
    </div>
  );
}
