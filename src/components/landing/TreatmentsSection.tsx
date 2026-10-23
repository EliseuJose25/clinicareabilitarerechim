import { useEffect } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import { useContactPanel } from "@/components/landing/ContactPanel";
import { Reveal, REVEAL_STAGGER_MS } from "@/components/landing/Reveal";
import { TreatmentIcon } from "@/components/landing/TreatmentIcon";

const TREATMENT_HASH_PREFIX = "#tratamento-";

// Cartão com leve elevação no hover (o hover do Tailwind só vale com mouse).
const CARD_HOVER =
  "transition duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none";

/**
 * TreatmentsSection - tratamentos do consultório em cartões.
 * Grade: 1 coluna no celular, 2 em md e 3 em lg, com um 6º cartão de chamada.
 * Links diretos: /#tratamento-{id} rola até a seção.
 */
export function TreatmentsSection() {
  const { treatments, contact } = clinicConfig;
  const { open: openContactPanel } = useContactPanel();

  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash;
      if (!hash.startsWith(TREATMENT_HASH_PREFIX)) return;
      const id = hash.slice(TREATMENT_HASH_PREFIX.length);
      if (!treatments.some((treatment) => treatment.id === id)) return;
      const section = document.getElementById("tratamentos");
      if (!section) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    };
    const frame = requestAnimationFrame(scrollToSection);
    window.addEventListener("hashchange", scrollToSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToSection);
    };
  }, [treatments]);

  const whatsappUrl = (message: string) =>
    `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <section
      id="tratamentos"
      className="border-b border-border/60 bg-background py-16 dark:border-transparent md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Tratamentos
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            O que fazemos no consultório, explicado de forma simples.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {treatments.map((treatment, index) => (
            // Celular: grade com o ícone à esquerda; md+: coluna.
            <Reveal
              as="article"
              key={treatment.id}
              delay={index * REVEAL_STAGGER_MS}
              id={`tratamento-${treatment.id}`}
              className={`grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 rounded-3xl border border-border/70 bg-card p-5 md:flex md:h-full md:flex-col md:p-7 ${CARD_HOVER}`}
            >
              <TreatmentIcon
                id={treatment.id}
                surface="auto"
                className="row-span-4 h-14 w-14 object-contain md:h-[72px] md:w-[72px]"
              />
              <h3 className="col-start-2 font-heading text-[22px] font-semibold text-foreground md:mt-5">
                {treatment.name}
              </h3>
              <p className="col-start-2 mt-2 text-[15px] leading-relaxed text-muted-foreground md:flex-1">
                {treatment.summary}
              </p>
              <ul className="col-start-2 mt-4 flex flex-wrap gap-1.5">
                {treatment.procedures.map((procedure) => (
                  <li
                    key={procedure}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs text-primary dark:bg-white/10 dark:text-white"
                  >
                    {procedure}
                  </li>
                ))}
              </ul>
              {/* Área de toque de 44px; mt-2/-mb-3 mantêm o espaço visual de mt-5. */}
              <a
                href={whatsappUrl(treatment.message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Saber mais sobre ${treatment.name} pelo WhatsApp`}
                className="col-start-2 -mb-3 mt-2 inline-flex min-h-11 items-center gap-1 self-start rounded-sm text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Saber mais{" "}
                <span aria-hidden="true" className="text-gold">
                  →
                </span>
              </a>
            </Reveal>
          ))}

          <Reveal
            delay={treatments.length * REVEAL_STAGGER_MS}
            className={`flex flex-col justify-center rounded-3xl bg-hero-overlay p-7 text-hero-on-video ${CARD_HOVER}`}
          >
            <h3 className="font-heading text-[22px] font-semibold">Não sabe por onde começar?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-hero-on-video/80">
              Conte o que está sentindo. A equipe avalia e explica as opções para o seu caso.
            </p>
            <button
              type="button"
              onClick={openContactPanel}
              className="btn-shine mt-6 inline-flex min-h-11 items-center justify-center self-start rounded-full bg-gold px-7 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-hero-overlay motion-reduce:transition-none"
            >
              Agendar uma conversa
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
