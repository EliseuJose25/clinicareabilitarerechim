import { clinicConfig } from "@/config/clinicConfig";

/**
 * Header fixo (sticky) com logo e CTA principal.
 * Design "Medical Clean" - fundo claro com leve blur ao rolar.
 */
export function Header() {
  const { brand, contact, cta } = clinicConfig;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          {/* Ícone de marca — dente estilizado em line art */}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-primary/15">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            >
              <path d="M12 4.5c-1.5 0-2.5.5-3.5 1.5S7 8.5 7 10c0 1.5.5 2.5 1 3.5s1 2 1 3.5c0 1.5-.5 2.5-1 3s-1 1.5-1 2c0 1 .5 1.5 1.5 1.5 1 0 2-1 2.5-2s1-2 1.5-2.5c.5.5 1 1.5 1.5 2.5s1.5 2 2.5 2c1 0 1.5-.5 1.5-1.5 0-.5-.5-1-1-2s-1-1.5-1-3c0-1.5.5-2.5 1-3.5s1-2 1-3.5c0-1.5-.5-2.5-1.5-3.5S13.5 4.5 12 4.5z" />
            </svg>
          </span>
          <span className="text-base font-semibold tracking-tight text-primary">
            {brand.logoText}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-primary/75 md:flex">
          <a href="#credenciais" className="transition hover:text-primary">Sobre</a>
          <a href="#depoimentos" className="transition hover:text-primary">Depoimentos</a>
          <a href="#faq" className="transition hover:text-primary">Dúvidas</a>
          <a href={`tel:${contact.phone}`} className="transition hover:text-primary">
            Contato
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90"
        >
          {cta.primaryLabel}
        </a>
      </div>
    </header>
  );
}
