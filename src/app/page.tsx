import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Hero } from "@/components/landing/hero";
import { AboutSection } from "@/components/landing/about-section";
import { HighlightsSection } from "@/components/landing/highlights-section";
import { EventInfoSection } from "@/components/landing/event-info";
import { RegistrationCta } from "@/components/landing/registration-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Texture Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-dvh bg-[url('/texture-background.jpg')] bg-repeat bg-size-[480px_auto] mix-blend-color-burn"      >
      </div>

      <LandingNavbar />
      <Hero />
      <AboutSection />
      <HighlightsSection />
      <EventInfoSection />
      <RegistrationCta />
      <LandingFooter />
    </main>
  );
}