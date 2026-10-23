import { clinicConfig } from "@/config/clinicConfig";
import { Reveal } from "./Reveal";

/**
 * QuoteSection - frase da Dra. em destaque: aspas grandes em coral,
 * texto em itálico e assinatura com a foto pequena da Dra.
 */
export function QuoteSection() {
  const { quote, team } = clinicConfig;
  const author = team[0];

  return (
    <section className="border-b border-border/60 bg-background py-14 dark:border-transparent md:py-20">
      <Reveal className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <span
          aria-hidden="true"
          className="block h-16 select-none font-heading text-[7rem] leading-none text-gold md:h-20 md:text-[9rem]"
        >
          “
        </span>
        <blockquote className="font-heading text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl">
          {quote.text}
        </blockquote>
        <div aria-hidden="true" className="mx-auto mt-8 h-0.5 w-12 bg-gold" />
        <figure className="mt-6 inline-flex items-center gap-3 text-left">
          {author?.photo && (
            <img
              src={author.photo}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="h-14 w-14 rounded-full object-cover object-[50%_15%] ring-2 ring-gold/40"
            />
          )}
          <figcaption>
            <span className="block text-sm font-semibold text-foreground">{quote.author}</span>
            {author?.role && (
              <span className="block text-xs text-muted-foreground">{author.role}</span>
            )}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
