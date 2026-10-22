import type { FocusEvent } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import { Reveal, REVEAL_STAGGER_MS } from "@/components/landing/Reveal";

/**
 * GallerySection - fotos do consultório em cartões com legenda.
 * Celular: carrossel horizontal com snap, mostrando um pedaço do próximo cartão.
 * md+: grade de 4 colunas.
 */
export function GallerySection() {
  const { gallery } = clinicConfig;

  // Teclado: o cartão focado entra inteiro no carrossel (o navegador não rola
  // quando ele já está parcialmente visível).
  const revealCard = (event: FocusEvent<HTMLElement>) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    event.currentTarget.scrollIntoView({
      block: "nearest",
      inline: "start",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="estrutura" className="border-b border-border/60 bg-background py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Conheça o consultório
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Sala 605, no centro de Erechim: é aqui que você vai ser atendido.
          </p>
        </Reveal>

        <div className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-1 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden">
          {gallery.map((image, index) => (
            <Reveal
              as="figure"
              key={image.alt}
              delay={index * REVEAL_STAGGER_MS}
              tabIndex={0}
              onFocus={revealCard}
              className="group relative isolate w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:w-auto"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[3/4] h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none"
                loading="lazy"
              />
              {/* Legenda curta só visual: o alt da imagem já descreve a foto. */}
              <figcaption
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-4 pb-4 pt-12 text-sm font-medium text-white"
              >
                {image.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
