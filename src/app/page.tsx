import { LandingNavbar } from "@/components/landing/landing-navbar";
import { Hero } from "@/components/landing/hero";
import { AboutSection } from "@/components/landing/about-section";
import { HighlightsSection } from "@/components/landing/highlights-section";
import { EventInfoSection } from "@/components/landing/event-info";
import { RegistrationCta } from "@/components/landing/registration-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import Image from "next/image";
export default function HomePage() {
  return (
    <main className="relative overflow-hidden min-h-screen">
      {/* Texture */}
      <Image
        src="/texture-background.jpg"
        alt="Texture Background"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-auto mix-blend-color-burn -z-10"
      />
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