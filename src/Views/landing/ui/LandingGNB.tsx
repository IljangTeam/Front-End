// 클라이언트 컴포넌트: IntersectionObserver, scrollIntoView 등 브라우저 API에 의존
// 상태 스타일링은 isActive boolean 토글뿐이라 Emotion 없이 Tailwind 조건부 클래스로 처리
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Start Here", href: "#hero" },
  { label: "Meetings", href: "#meetings" },
  { label: "How it works", href: "#how-it-works", gradient: true },
] as const;

// hero는 sticky라 IntersectionObserver로 관측할 수 없으므로 제외한다.
// hero 외 섹션이 하나도 보이지 않으면 hero로 간주한다.
const OBSERVED_IDS = NAV_ITEMS.map((item) => item.href.slice(1)).filter(
  (id) => id !== "hero",
);

export default function LandingGNB() {
  const [activeId, setActiveId] = useState<string>("hero");

  // 스크롤 위치에 따라 현재 보이는 섹션을 감지하여 activeId를 갱신한다.
  // hero는 sticky라 관측 불가 → hero 외 섹션만 관측하고, 아무것도 안 보이면 hero로 간주.
  // visibleIds로 현재 보이는 섹션을 누적 추적한다 (콜백은 상태가 변한 entry만 전달하므로).
  useEffect(() => {
    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }

        // 보이는 섹션 중 DOM 순서가 가장 앞인 것을 활성화, 없으면 hero
        const active = OBSERVED_IDS.find((id) => visibleIds.has(id));
        setActiveId(active ?? "hero");
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const id of OBSERVED_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
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
          <button className="cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 text-center text-label-large text-(--color-text-secondary)">
            로그인
          </button>
          <button className="cursor-pointer whitespace-nowrap rounded-xl bg-(--color-interactive-primary) px-4 py-2 text-center text-label-large text-(--color-text-inverse)">
            회원가입
          </button>
        </div>
      </div>
    </nav>
  );
}
