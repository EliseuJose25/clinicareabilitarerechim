import { useState } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * FAQSection - acordeões expansíveis (um item aberto por vez).
 */
export function FAQSection() {
  const { faq } = clinicConfig;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-b border-border/60 bg-background py-10 dark:border-transparent md:py-16"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Perguntas frequentes
          </h2>
          <p className="mt-2 text-muted-foreground">
            As perguntas que mais ouvimos na recepção.
          </p>
        </Reveal>

        <Reveal className="mt-8 space-y-3 md:mt-10">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className="overflow-hidden rounded-xl border border-border/70 bg-secondary/50">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground md:text-base">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 flex-shrink-0 text-primary dark:text-white/80" />
                  ) : (
                    <Plus className="h-4 w-4 flex-shrink-0 text-primary dark:text-white/80" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
