import { clinicConfig } from "@/config/clinicConfig";
import { useContactPanel } from "@/components/landing/ContactPanel";
import { Reveal, REVEAL_STAGGER_MS } from "@/components/landing/Reveal";

/**
 * FirstVisitSection - explica em 4 passos como é a primeira consulta.
 * Celular: 1 coluna. md: 2 colunas. lg: 4 colunas com uma linha fina
 * (decorativa) ligando os círculos numerados.
 */
export function FirstVisitSection() {
  const { firstVisit } = clinicConfig;
  const { open: openContactPanel } = useContactPanel();

  return (
    <section
      id="primeira-consulta"
      aria-labelledby="primeira-consulta-titulo"
      className="border-b border-border/60 bg-secondary py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <h2
            id="primeira-consulta-titulo"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {firstVisit.title}
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">{firstVisit.subtitle}</p>
        </Reveal>

        <div className="relative mt-10 lg:mt-14">
          {/* Linha do centro do 1º ao centro do 4º círculo (lg: 4 colunas, gap 2rem). */}
          <Reveal
            aria-hidden="true"
            className="pointer-events-none absolute left-6 right-[calc((100%-6rem)/4-1.5rem)] top-6 hidden h-px bg-primary/25 lg:block"
          />
          <ol className="grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-8">
            {firstVisit.steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * REVEAL_STAGGER_MS}>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <button
            type="button"
            onClick={openContactPanel}
            className="mt-10 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none sm:w-auto md:mt-12"
          >
            {firstVisit.cta}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
