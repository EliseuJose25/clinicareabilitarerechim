import { clinicConfig } from "@/config/clinicConfig";
import { CalendarCheck } from "lucide-react";

/**
 * FinalCTA - bloco de chamada para ação final, com fundo em Azul Marinho
 * para destacar do restante da página e conduzir o usuário ao agendamento.
 */
export function FinalCTA() {
  const { finalCta, contact, cta } = clinicConfig;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;

  return (
    <section
      id="agendar"
      className="relative overflow-hidden border-b border-border/60 bg-primary py-16 md:py-24"
    >
      {/* Detalhe decorativo dourado sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--gold)) 0, transparent 40%), radial-gradient(circle at 80% 80%, hsl(var(--gold)) 0, transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/90">
          {finalCta.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {finalCta.subtitle}
        </p>

        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-gold-foreground shadow-lg shadow-black/20 transition hover:brightness-110 md:px-10 md:py-5 md:text-lg"
          >
            <CalendarCheck className="h-5 w-5" />
            {finalCta.primaryLabel || cta.primaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}