import { Tag, Clock, Flag, Users } from "lucide-react";

type TagAxis = "location" | "time" | "goal";

interface TagItem {
  label: string;
  axis: TagAxis;
}

export interface MeetingCardProps {
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

const TAG_AXIS_STYLES: Record<TagAxis, string> = {
  location:
    "bg-(--color-tag-location-bg) text-(--color-tag-location)",
  time: "bg-(--color-tag-time-bg) text-(--color-tag-time)",
  goal: "bg-(--color-tag-goal-bg) text-(--color-tag-goal)",
};

export default function MeetingCard({
  title,
  round,
  tags,
  date,
  location,
  currentMembers,
  maxMembers,
  hostName,
  hostInitial,
}: MeetingCardProps) {
  const remaining = Math.max(0, maxMembers - currentMembers);

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-(--color-border-default) bg-(--color-bg-default) px-2 pt-3 pb-2 backdrop-blur-[2px]">
      {/* 카드 헤더 */}
      <div className="flex items-center justify-between px-2">
        <span className="text-heading-3 text-(--color-text-primary)">
          {title}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-label text-(--color-text-tertiary)">
            #{round}회차
          </span>
          <span className="text-label text-(--color-status-success)">
            {currentMembers}/{maxMembers}명
          </span>
        </div>
      </div>

      {/* 카드 바디 */}
      <div className="flex flex-col gap-2 rounded-xl border border-(--color-border-default) bg-(--color-surface-default) px-4.25 pt-4.25 pb-3.25">
        {/* 메타 정보 */}
        <div className="flex flex-col gap-1">
          {/* 태그 행 */}
          <div className="flex items-center gap-4 py-1">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-(--color-text-secondary)" />
              <span className="text-body text-(--color-text-secondary)">
                태그
              </span>
            </div>
            <div className="flex items-center gap-1">
              {tags.map((tag) => (
                <span
                  key={`${tag.axis}-${tag.label}`}
                  className={`rounded-full px-2 py-1 text-label font-semibold ${TAG_AXIS_STYLES[tag.axis]}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* 일시 행 */}
          <div className="flex items-center gap-4 py-1">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-(--color-text-secondary)" />
              <span className="text-body text-(--color-text-secondary)">
                일시
              </span>
            </div>
            <span className="text-body text-(--color-text-primary)">
              {date}
            </span>
          </div>

          {/* 장소 행 */}
          <div className="flex items-center gap-4 py-1">
            <div className="flex items-center gap-2">
              <Flag size={16} className="text-(--color-text-secondary)" />
              <span className="text-body text-(--color-text-secondary)">
                장소
              </span>
            </div>
            <span className="text-body text-(--color-text-primary)">
              {location}
            </span>
          </div>

          {/* 인원 행 */}
          <div className="flex items-center gap-4 py-1">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-(--color-text-secondary)" />
              <span className="text-body text-(--color-text-secondary)">
                인원
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-body text-(--color-text-primary)">
                {currentMembers}/{maxMembers}명
              </span>
              <span className="text-body text-(--color-text-primary)">·</span>
              <span className="text-body font-semibold text-(--color-status-success)">
                {remaining}자리 남았어요
              </span>
            </div>
          </div>
        </div>

        {/* 구분선 + 유저칩 */}
        <div className="flex flex-col items-end border-t border-(--color-border-subtle) pt-3">
          <div className="flex items-center gap-2">
            <div className="flex size-5.5 items-center justify-center rounded-[11px] bg-(--color-accent-subtle)">
              <span className="text-label text-(--color-text-accent)">
                {hostInitial}
              </span>
            </div>
            <span className="text-body-small text-(--color-text-secondary)">
              {hostName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
