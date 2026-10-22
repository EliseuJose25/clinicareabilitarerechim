import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  highlight: string;
  rating: number;
  photo: string;
};

/**
 * TestimonialSlider - depoimentos com seletor de pacientes.
 * Desktop (lg+): lista de pacientes à esquerda e o depoimento ativo à direita.
 * Celular: nomes em chips roláveis no topo e o depoimento abaixo.
 * Todos os depoimentos ocupam a mesma célula do grid, então a área fica com a
 * altura do mais longo e a página não "pula" na troca.
 * Teclado: setas ← → trocam o depoimento quando o foco está no slider.
 */
export function TestimonialSlider() {
  const { contact } = clinicConfig;
  const testimonials = clinicConfig.testimonials as readonly Testimonial[];
  const [index, setIndex] = useState(0);
  const chipsRef = useRef<HTMLDivElement>(null);
  const total = testimonials.length;

  const go = (n: number) => setIndex((i) => (i + n + total) % total);

  // Celular: mantém o chip ativo centralizado na faixa, sem rolar a página.
  useEffect(() => {
    const strip = chipsRef.current;
    const chip = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !chip) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({
      left: chip.offsetLeft + chip.offsetWidth / 2 - strip.clientWidth / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [index]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + total) % total;
    setIndex(next);
    // Se o foco está na lista ou nos chips, ele acompanha o depoimento ativo.
    const selector = (event.target as HTMLElement).closest("[data-selector]");
    (selector?.children[next] as HTMLElement | undefined)?.focus();
  };

  if (total === 0) return null;

  return (
    <section id="depoimentos" className="border-b border-border/60 bg-secondary py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground sm:text-2xl md:text-4xl">
            Tem paciente que vem desde criança
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Relatos de quem se trata com a gente há anos.
          </p>
        </div>

        <div
          role="group"
          aria-label="Depoimentos de pacientes"
          onKeyDown={handleKeyDown}
          className="mt-8 rounded-2xl border border-border/70 bg-card p-5 md:mt-10 md:p-10 lg:grid lg:grid-cols-[30%_minmax(0,1fr)] lg:gap-12 lg:p-12"
        >
          {/* ── Desktop (lg+): lista de pacientes ── */}
          <div data-selector className="hidden flex-col self-start lg:flex">
            {testimonials.map((testimonial, i) => {
              const isActive = i === index;
              return (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "min-h-11 border-l-2 py-4 pl-5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                    isActive
                      ? "border-gold text-foreground"
                      : "border-border/60 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="block font-heading text-xl">{testimonial.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {testimonial.role}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Celular: nomes em chips roláveis ── */}
          <div
            ref={chipsRef}
            data-selector
            className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 py-1 [scrollbar-width:none] md:-mx-10 md:scroll-px-10 md:px-10 lg:hidden [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((testimonial, i) => {
              const isActive = i === index;
              return (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "min-h-11 shrink-0 snap-start rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                    isActive
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {testimonial.name}
                </button>
              );
            })}
          </div>

          {/* ── Depoimento ativo ── */}
          <div className="mt-6 lg:mt-0">
            <div aria-live="polite" className="grid">
              {testimonials.map((testimonial, i) => {
                const isActive = i === index;
                const initials = testimonial.name
                  .split(" ")
                  .map((part) => part[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join("");
                return (
                  <figure
                    key={testimonial.name}
                    className={cn(
                      "col-start-1 row-start-1 flex flex-col",
                      isActive
                        ? "visible opacity-100 motion-safe:transition-opacity motion-safe:duration-200"
                        : "invisible opacity-0",
                    )}
                  >
                    {/* Trecho do próprio depoimento; oculto para leitores de tela para não repetir. */}
                    <p
                      aria-hidden="true"
                      className="font-heading text-[clamp(1.75rem,3.2vw,3rem)] italic leading-tight text-foreground"
                    >
                      “{testimonial.highlight}”
                    </p>
                    <blockquote className="mt-5 text-base leading-relaxed text-muted-foreground">
                      {testimonial.quote}
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-4 pt-8">
                      <div className="w-16 shrink-0">
                        {testimonial.photo ? (
                          <ImagePlaceholder
                            src={testimonial.photo}
                            alt={`Foto de ${testimonial.name}`}
                            aspectRatio="1 / 1"
                            rounded="full"
                          />
                        ) : (
                          <div
                            aria-hidden="true"
                            className="flex aspect-square w-16 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary"
                          >
                            {initials}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <div
                          role="img"
                          aria-label={`Nota ${testimonial.rating} de 5`}
                          className="mt-1.5 flex gap-0.5 text-primary"
                        >
                          {Array.from({ length: testimonial.rating }).map((_, star) => (
                            <Star key={star} aria-hidden="true" className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo depoimento"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href={contact.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Star aria-hidden="true" className="h-4 w-4" />
            Avalie-nos no Google
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
