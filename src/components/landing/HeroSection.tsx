import { clinicConfig } from "@/config/clinicConfig";
import { Check } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * HeroSection - foco em conversão direta.
 * Placeholder de imagem em aspect-ratio 4/5.
 */
export function HeroSection() {
  const { hero, cta, contact, images } = clinicConfig;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;

  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60 bg-background">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:gap-16 md:px-6 md:py-20 md:items-center">
        <div>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            {hero.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subtitle}
          </p>

          <ul className="mt-6 space-y-2">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90"
            >
              {cta.primaryLabel}
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Ligar agora
            </a>
          </div>
        </div>

        {/* Imagem principal (4/5) — renderiza placeholder se hero.image estiver vazio */}
        <div className="relative mx-auto w-full max-w-md">
          <ImagePlaceholder
            src={hero.image || images.hero}
            alt={hero.imageAlt}
            aspectRatio="4 / 5"
          />
        </div>
      </div>
    </section>
  );
}
