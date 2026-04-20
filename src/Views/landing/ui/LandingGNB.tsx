// 클라이언트 컴포넌트: IntersectionObserver, scrollIntoView 등 브라우저 API에 의존
"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Start Here", href: "#hero" },
  { label: "Meetings", href: "#meetings" },
  { label: "How it works", href: "#how-it-works" },
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

const GRADIENT_ACCENT = "linear-gradient(163deg, #764AE9 0%, #D4B8D8 100%)";

/* ── Emotion: 상태 기반 동적 스타일 ── */

const NavLabel = styled.span<{ $active: boolean }>`
  transition: transform 0.3s;
  color: ${({ $active }) =>
    $active ? "var(--color-text-primary)" : "var(--color-text-secondary)"};
  transform: ${({ $active }) => ($active ? "translateY(-4px)" : "none")};

  &:hover {
    background-image: ${GRADIENT_ACCENT};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const NavDot = styled.span<{ $active: boolean }>`
  transition: transform 0.3s, opacity 0.3s;
  background: var(--color-text-primary);
  transform: ${({ $active }) =>
    $active ? "translateY(-8px) scale(1)" : "translateY(-4px) scale(0)"};
  opacity: ${({ $active }) => ($active ? 1 : 0)};

  button:hover & {
    background: ${GRADIENT_ACCENT};
  }
`;

const GradientTextLink = styled(Link)`
  &:hover {
    background-image: ${GRADIENT_ACCENT};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const GradientBgLink = styled(Link)`
  &:hover {
    background: ${GRADIENT_ACCENT};
  }
`;

export default function LandingGNB() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const visibleNavIds = new Set<string>();
    const rawVisible = new Set<string>();

    const resolve = (id: string) => ALIAS_MAP[id] ?? id;

    const updateActive = () => {
      const active = NAV_IDS.find((id) => visibleNavIds.has(id));
      if (active) {
        setActiveId(active);
      } else {
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
                <NavLabel className="text-label-large" $active={isActive}>
                  {item.label}
                </NavLabel>
                <NavDot
                  className="absolute -bottom-2.5 size-1 rounded-full"
                  $active={isActive}
                />
              </button>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <GradientTextLink
            href="/auth"
            className="whitespace-nowrap rounded-xl px-4 py-2 text-center text-label-large text-(--color-text-secondary)"
          >
            로그인
          </GradientTextLink>
          <GradientBgLink
            href="/auth"
            className="whitespace-nowrap rounded-xl bg-(--color-interactive-primary) px-4 py-2 text-center text-label-large text-(--color-text-inverse)"
          >
            회원가입
          </GradientBgLink>
        </div>
      </div>
    </nav>
  );
}
