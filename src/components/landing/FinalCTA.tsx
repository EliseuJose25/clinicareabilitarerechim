import { clinicConfig } from "@/config/clinicConfig";
import { CalendarCheck } from "lucide-react";
import { useContactPanel } from "@/components/landing/ContactPanel";
import { Reveal } from "@/components/landing/Reveal";

/**
 * FinalCTA - bloco de chamada para ação final, com fundo em Azul Marinho
 * para destacar do restante da página e conduzir o usuário ao agendamento.
 */
export function FinalCTA() {
  const { finalCta, cta } = clinicConfig;
  const { open: openContactPanel } = useContactPanel();

  return (
    <section
      id="agendar"
      className="relative overflow-hidden border-b border-border/60 bg-hero-overlay py-16 dark:border-transparent md:py-24"
    >
      <Reveal className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {finalCta.subtitle}
        </p>

        <div className="mt-8 flex justify-center md:mt-10">
          <button
            type="button"
            onClick={openContactPanel}
            className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground shadow-lg shadow-black/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-hero-overlay md:px-10 md:py-5 md:text-lg"
          >
            <CalendarCheck aria-hidden="true" className="h-5 w-5" />
            {finalCta.primaryLabel || cta.primaryLabel}
          </button>
        </div>
      </Reveal>
    </section>
  );
}
