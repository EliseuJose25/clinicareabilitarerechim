import { clinicConfig } from "@/config/clinicConfig";
import icon from "@/assets/reabilitar-icon.png";

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
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-primary/15">
            <img src={icon} alt="Reabilitar" className="h-9 w-auto" />
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
