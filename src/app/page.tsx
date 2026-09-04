import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Hero } from "@/components/landing/hero";
import { AboutSection } from "@/components/landing/about-section";
import { HighlightsSection } from "@/components/landing/highlights-section";
import { EventInfoSection } from "@/components/landing/event-info";
import { RegistrationCta } from "@/components/landing/registration-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
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