import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsManager } from "@/components/landing/AnalyticsManager";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { TeamSection } from "@/components/landing/TeamSection";
import { QuoteSection } from "@/components/landing/QuoteSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { TestimonialSlider } from "@/components/landing/TestimonialSlider";
import { FAQSection } from "@/components/landing/FAQSection";
import { ContactMap } from "@/components/landing/ContactMap";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { FooterSticky } from "@/components/landing/FooterSticky";
import { Footer } from "@/components/landing/Footer";
import { PalatisIntegration } from "@/components/landing/PalatisIntegration";
import { buildSEOHead } from "@/components/landing/SEOHead";

// Head configurado via buildSEOHead (Schema.org Dentist + meta tags).
export const Route = createFileRoute("/")({
  head: () => buildSEOHead(),
  component: Index,
});

/**
 * Landing Page principal - Template Master para Clínicas Odontológicas.
 * Toda a personalização (textos, contatos, analytics) fica centralizada
 * em `src/config/clinicConfig.ts`.
 */
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <AnalyticsManager />
      <Header overVideo />
      <main>
        <HeroSection />
        <TeamSection />
        <QuoteSection />
        <GallerySection />
        <TestimonialSlider />
        <FAQSection />
        <FinalCTA />
        <ContactMap />
      </main>
      <Footer />
      <FooterSticky />
      {/* Slot reservado - ativar quando a integração Palatis AI estiver pronta */}
      <PalatisIntegration />
    </div>
  );
}
