import { useState } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * TestimonialSlider - slider simples sem dependências externas.
 */
export function TestimonialSlider() {
  const { testimonials, images } = clinicConfig;
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const go = (n: number) => setIndex((index + n + total) % total);
  const current = testimonials[index];

  return (
    <section id="depoimentos" className="border-b border-border/60 bg-secondary py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-[22px] font-semibold leading-tight tracking-tight text-foreground sm:text-2xl md:text-4xl">
            O que dizem nossos pacientes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Histórias reais de quem confiou no nosso trabalho.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-border/70 bg-card p-6 md:mt-10 md:p-12">
          {/* Foto do paciente (4/5) — placeholder automático se photo estiver vazio */}
          <div className="mx-auto mb-6 w-24">
            <ImagePlaceholder
              src={current.photo || images.lifestyle}
              alt={`Foto de ${current.name}`}
              aspectRatio="1 / 1"
              rounded="full"
            />
          </div>
          <div className="flex justify-center gap-0.5 text-primary">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-4 text-center text-lg leading-relaxed text-foreground md:text-xl">
            “{current.quote}”
          </blockquote>
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold text-foreground">{current.name}</p>
            <p className="text-xs text-muted-foreground">{current.role}</p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Depoimento anterior"
              className="rounded-full border border-border p-2 text-foreground transition hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Próximo depoimento"
              className="rounded-full border border-border p-2 text-foreground transition hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
