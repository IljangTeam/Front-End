// 클라이언트 컴포넌트: IntersectionObserver, scrollIntoView 등 브라우저 API에 의존
// 상태 스타일링은 isActive boolean 토글뿐이라 Emotion 없이 Tailwind 조건부 클래스로 처리
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Start Here", href: "#hero" },
  { label: "Meetings", href: "#meetings" },
  { label: "How it works", href: "#how-it-works", gradient: true },
] as const;

// hero는 sticky라 IntersectionObserver로 관측할 수 없으므로 제외한다.
// hero 외 섹션이 하나도 보이지 않으면 hero로 간주한다.
const NAV_IDS = NAV_ITEMS.map((item) => item.href.slice(1)).filter(
  (id) => id !== "hero",
);

// feature, cta 섹션은 GNB 항목이 없지만 how-it-works로 매핑하여
// 해당 영역에서도 "How it works"가 활성 상태를 유지하도록 한다.
const ALIAS_MAP: Record<string, string> = {
  feature: "how-it-works",
  cta: "how-it-works",
};

// IO가 실제로 관측할 모든 섹션 id
const OBSERVED_IDS = [...NAV_IDS, ...Object.keys(ALIAS_MAP)];

export default function LandingGNB() {
  const [activeId, setActiveId] = useState<string>("hero");

  // 스크롤 위치에 따라 현재 보이는 섹션을 감지하여 activeId를 갱신한다.
  // hero는 sticky라 관측 불가 → hero 외 섹션만 관측하고, 아무것도 안 보이면 hero로 간주.
  // visibleIds로 현재 보이는 섹션을 누적 추적한다 (콜백은 상태가 변한 entry만 전달하므로).
  useEffect(() => {
    // 현재 보이는 nav id를 추적 (alias 해석 후의 값)
    const visibleNavIds = new Set<string>();
    // 원시 섹션 id → 몇 개가 보이는지 (alias 여러 개가 같은 nav id로 매핑되므로 카운트)
    const rawVisible = new Set<string>();

    const resolve = (id: string) => ALIAS_MAP[id] ?? id;

    const updateActive = () => {
      const active = NAV_IDS.find((id) => visibleNavIds.has(id));
      if (active) {
        setActiveId(active);
      } else {
        // 관측 대상이 하나도 안 보이면 hero로 복귀
        setActiveId("hero");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const rawId = entry.target.id;
          if (entry.isIntersecting) {
            rawVisible.add(rawId);
            visibleNavIds.add(resolve(rawId));
          } else {
            rawVisible.delete(rawId);
            const navId = resolve(rawId);
            // alias가 여러 개일 수 있으므로 같은 navId를 가리키는 raw가 전부 사라졌을 때만 제거
            const stillVisible = [...rawVisible].some(
              (r) => resolve(r) === navId,
            );
            if (!stillVisible) visibleNavIds.delete(navId);
          }
        }
        updateActive();
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    // IO 콜백은 교차 상태 변화 시에만 발생하므로,
    // meetings가 뷰포트를 벗어난 뒤 스크롤이 계속 올라가는 경우를 감지하기 위해
    // 스크롤 리스너로 보완한다.
    const handleScroll = () => {
      if (visibleNavIds.size === 0) {
        setActiveId("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    for (const id of OBSERVED_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    // hero는 sticky라 scrollIntoView가 동작하지 않으므로 페이지 최상단으로 이동
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex justify-center pt-10">
      <div className="flex items-center gap-16 rounded-2xl bg-(--color-surface-default) p-3 shadow-[0_2px_16px_0_rgba(0,0,0,0.06)]">
        {/* 로고 */}
        <div className="flex h-8 items-center gap-2.5 px-1">
          <Image
            src="/assets/icons/logo-landing.svg"
            alt="각할모"
            width={33}
            height={32}
            priority
          />
          <span className="text-2xl font-bold tracking-[-0.24px] text-(--color-text-primary)">
            GAKALMO
          </span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-9">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative flex cursor-pointer items-center justify-center"
              >
                {/* 활성 시 텍스트가 위로, 하단에 indicator dot이 나타난다 */}
                {"gradient" in item && item.gradient ? (
                  <span
                    className={`bg-clip-text text-label-large text-transparent transition-transform duration-300 ${isActive ? "-translate-y-1" : ""}`}
                    style={{
                      backgroundImage:
                        "linear-gradient(163deg, #764AE9 0%, #D4B8D8 100%)",
                    }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <span
                    className={`text-label-large transition-transform duration-300 ${
                      isActive
                        ? "text-(--color-text-primary) -translate-y-1"
                        : "text-(--color-text-secondary) hover:text-(--color-text-primary)"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
                {/* indicator dot — absolute로 레이아웃에 영향 없이 배치 */}
                <span
                  className={`absolute -bottom-2.5 size-1 rounded-full bg-(--color-text-primary) transition-all duration-300 ${
                    isActive
                      ? "-translate-y-2 scale-100 opacity-100"
                      : "-translate-y-1 scale-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth"
            className="whitespace-nowrap rounded-xl px-4 py-2 text-center text-label-large text-(--color-text-secondary)"
          >
            로그인
          </Link>
          <Link
            href="/auth"
            className="whitespace-nowrap rounded-xl bg-(--color-interactive-primary) px-4 py-2 text-center text-label-large text-(--color-text-inverse)"
          >
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
}
