import { clinicConfig } from "@/config/clinicConfig";
import { Reveal } from "./Reveal";

export function QuoteSection() {
  const { quote } = clinicConfig;

  return (
    <section className="border-b border-border/60 bg-background py-12 md:py-16">
      <Reveal className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <blockquote className="font-heading text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl">
          “{quote.text}”
        </blockquote>
        <p className="mt-5 text-sm font-semibold text-primary">— {quote.author}</p>
      </Reveal>
    </section>
  );
}