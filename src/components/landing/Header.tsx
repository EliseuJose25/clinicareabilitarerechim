import { clinicConfig } from "@/config/clinicConfig";
import icon from "@/assets/reabilitar-icon.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

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
        <a href="/#top" className="flex items-center gap-2.5">
          <img src={icon} alt="Reabilitar" className="h-10 w-auto" />
          <span translate="no" className="text-base font-semibold tracking-tight text-primary">
            {brand.logoText}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-primary/75 md:flex">
          <a href="/#credenciais" className="transition hover:text-primary">Sobre</a>
          <a href="/#depoimentos" className="transition hover:text-primary">Depoimentos</a>
          <a href="/#faq" className="transition hover:text-primary">Dúvidas</a>
          <a href="/#contato" className="transition hover:text-primary">
            Contato
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90 md:inline-flex"
        >
          {cta.primaryLabel}
        </a>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex w-[min(85vw,22rem)] flex-col">
            <SheetHeader className="text-left">
              <SheetTitle className="flex items-center gap-2.5">
                <img src={icon} alt="Reabilitar" className="h-10 w-auto" />
                <span translate="no" className="text-primary">{brand.logoText}</span>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-8 flex flex-col text-base font-medium text-foreground">
              <SheetClose asChild>
                <a href="/#credenciais" className="border-b border-border py-4">Sobre</a>
              </SheetClose>
              <SheetClose asChild>
                <a href="/#depoimentos" className="border-b border-border py-4">Depoimentos</a>
              </SheetClose>
              <SheetClose asChild>
                <a href="/#faq" className="border-b border-border py-4">Dúvidas</a>
              </SheetClose>
              <SheetClose asChild>
                <a href="/#contato" className="border-b border-border py-4">Contato</a>
              </SheetClose>
            </nav>

            <Button asChild className="mt-6 rounded-full bg-gold text-gold-foreground hover:bg-gold/90">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                {cta.primaryLabel}
              </a>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
