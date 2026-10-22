import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { clinicConfig } from "@/config/clinicConfig";
import { cn } from "@/lib/utils";

const TREATMENT_HASH_PREFIX = "#tratamento-";

/**
 * TreatmentsSection - lista os tratamentos do consultório.
 * Desktop (lg+): coluna com a lista à esquerda e o painel do tratamento
 * ativo à direita. Celular: acordeão com um item por tratamento.
 * Links diretos: /#tratamento-{id} ativa o tratamento e rola até a seção.
 */
export function TreatmentsSection() {
  const { treatments, treatmentImages, contact } = clinicConfig;
  const [activeId, setActiveId] = useState<string>(treatments[0].id);
  const [openMobile, setOpenMobile] = useState<string>(treatments[0].id);

  const activeTreatment =
    treatments.find((treatment) => treatment.id === activeId) ?? treatments[0];

  const scrollToSection = useCallback(() => {
    const section = document.getElementById("tratamentos");
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const applyHash = useCallback(() => {
    const hash = window.location.hash;
    if (!hash.startsWith(TREATMENT_HASH_PREFIX)) return;
    const id = hash.slice(TREATMENT_HASH_PREFIX.length);
    const target = treatments.find((treatment) => treatment.id === id);
    if (!target) return;
    setActiveId(target.id);
    setOpenMobile(target.id);
    scrollToSection();
  }, [scrollToSection, treatments]);

  useEffect(() => {
    const handle = () => {
      if (window.location.hash.startsWith(TREATMENT_HASH_PREFIX)) {
        applyHash();
      }
    };
    const frame = requestAnimationFrame(handle);
    window.addEventListener("hashchange", handle);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", handle);
    };
  }, [applyHash]);

  const whatsappUrl = (message: string) =>
    `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <section id="tratamentos" className="border-b border-border/60 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Tratamentos
        </h2>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          O que fazemos no consultório, explicado de forma simples.
        </p>

        {/* ── Desktop (lg+): lista à esquerda, painel do ativo à direita ── */}
        <div className="mt-10 hidden gap-16 lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:mt-14">
          <div className="sticky top-28 flex flex-col self-start">
            {treatments.map((treatment, index) => {
              const isActive = treatment.id === activeTreatment.id;
              return (
                <button
                  key={treatment.id}
                  id={`tratamento-${treatment.id}`}
                  type="button"
                  onClick={() => setActiveId(treatment.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex w-full items-baseline gap-4 border-b border-border/60 pb-4 text-left font-heading text-2xl transition-colors duration-200 motion-reduce:transition-none",
                    index === 0 ? "pt-0" : "pt-4",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="text-xs font-medium text-muted-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{treatment.name}</span>
                </button>
              );
            })}
          </div>

          <div
            key={activeTreatment.id}
            className="animate-in fade-in-0 duration-200 motion-reduce:animate-none"
          >
            <div className="flex items-center justify-between gap-6">
              <h3 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-foreground">
                {renderHeadline(activeTreatment.headline)}
              </h3>
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-transparent lg:h-28 lg:w-28">
                <img
                  src={treatmentImages[activeTreatment.id]}
                  alt=""
                  width={512}
                  height={512}
                  loading="lazy"
                  decoding="async"
                  className="h-24 w-24 object-contain lg:h-28 lg:w-28"
                />
              </span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {activeTreatment.summary}
            </p>

            <ul className="mt-8 border-t border-border/60">
              {activeTreatment.procedures.map((procedure) => (
                <li
                  key={procedure}
                  className="flex items-center gap-3 border-b border-border/60 py-4 text-base text-foreground"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{procedure}</span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl(activeTreatment.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            >
              Saber mais
            </a>
          </div>
        </div>

        {/* ── Celular: acordeão ── */}
        <Accordion
          type="single"
          collapsible
          value={openMobile}
          onValueChange={setOpenMobile}
          className="mt-8 lg:hidden"
        >
          {treatments.map((treatment) => (
            <AccordionItem
              key={treatment.id}
              value={treatment.id}
              className="border-b border-border/60"
            >
              <AccordionTrigger className="gap-4 py-5 text-left font-heading text-xl font-normal hover:no-underline">
                <span className="flex flex-col items-start gap-3">
                  <img
                    src={treatmentImages[treatment.id]}
                    alt=""
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-20 object-contain"
                  />
                  <span>{treatment.name}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {treatment.summary}
                </p>
                <ul className="mt-5 border-t border-border/60">
                  {treatment.procedures.map((procedure) => (
                    <li
                      key={procedure}
                      className="flex items-center gap-3 border-b border-border/60 py-3 text-sm text-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                      />
                      <span>{procedure}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(treatment.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                >
                  Saber mais
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/**
 * Headline do tratamento: a segunda palavra em itálico quando houver
 * mais de uma palavra.
 */
function renderHeadline(headline: string) {
  const words = headline.split(" ");
  if (words.length < 2) return headline;
  return (
    <>
      {words[0]} <em className="italic">{words[1]}</em>
      {words.length > 2 ? ` ${words.slice(2).join(" ")}` : null}
    </>
  );
}
