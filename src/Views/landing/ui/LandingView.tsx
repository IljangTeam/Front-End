import LandingGNB from "./LandingGNB";
import HeroSection from "./HeroSection";
import MeetingsSection from "./MeetingsSection";
import HowItWorksSection from "./HowItWorksSection";
import FeatureSection from "./FeatureSection";
import CtaSection from "./CtaSection";
import Footer from "./Footer";

export default function LandingView() {
  return (
    <main className="min-h-screen bg-(--color-surface-default)">
      {/* 섹션 0: LandingGNB — fixed, z-50 */}
      <LandingGNB />

      {/* 섹션 1: Hero — sticky, 100vh. Meetings가 위로 덮어씌움 */}
      <section id="hero" className="sticky top-0 z-0">
        <HeroSection />
      </section>

      {/* 섹션 2~5: Hero 위로 올라오는 콘텐츠 영역 */}
      <div className="relative z-10">
        {/* 섹션 2: Meetings — 상단 rounded로 시트 느낌 */}
        <section
          id="meetings"
          className="scroll-mt-25 rounded-t-3xl bg-(--color-surface-default)"
        >
          <MeetingsSection />
        </section>

        {/* 섹션 3: How it works */}
        <section id="how-it-works" className="scroll-mt-25 py-7">
          <HowItWorksSection />
        </section>

        {/* 섹션 4: Feature (서비스 특장점) */}
        <section id="feature" className="py-5">
          <FeatureSection />
        </section>

        {/* 섹션 5: CTA */}
        <section id="cta">
          <CtaSection />
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
