import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { clinicConfig } from "@/config/clinicConfig";
import icon from "@/assets/reabilitar-icon.png";
import iconNegativo from "@/assets/reabilitar-icon-negativo.png";
import { Button } from "@/components/ui/button";
import { MenuOverlay } from "@/components/landing/MenuOverlay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, MessageCircle, Phone, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TreatmentCards } from "@/components/landing/TreatmentCards";
import { useContactPanel } from "@/components/landing/ContactPanel";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { ThemeToggle } from "@/components/landing/ThemeToggle";

// Itens do menu "Contato": 44px de altura; o fundo coral marca o hover e o foco do teclado.
const CONTACT_ITEM =
  "min-h-11 cursor-pointer gap-3 rounded-lg px-3 text-sm font-medium focus:bg-gold focus:text-gold-foreground [&>svg]:size-4";

/**
 * Header fixo com logo, botão Menu (gaveta), Serviços e Contato (desktop) e CTA em pílula.
 * Em md+ fica transparente sobre o hero até rolar ~24px; abaixo de md é sempre sólido.
 */
export function Header({ overVideo = false }: { overVideo?: boolean }) {
  const { brand, contact, header } = clinicConfig;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const servicesBackdropRef = useRef<HTMLDivElement>(null);
  const { open: openContactPanel } = useContactPanel();

  // Menu em tela cheia, dropdown "Serviços" e menu "Contato": só um aberto por vez.
  const handleMenuOpenChange = (open: boolean) => {
    setMenuOpen(open);
    if (open) {
      setServicesOpen(false);
      setContactOpen(false);
    }
  };

  const handleServicesOpenChange = (open: boolean) => {
    setServicesOpen(open);
    if (open) {
      setMenuOpen(false);
      setContactOpen(false);
    }
  };

  const handleContactOpenChange = (open: boolean) => {
    setContactOpen(open);
    if (open) {
      setMenuOpen(false);
      setServicesOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;
  const telUrl = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;

  const transparent = !scrolled;
  // Desktop no topo da página: o lado direito do cabeçalho fica sobre o vídeo do hero.
  const rightOnVideo = overVideo && transparent;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full border-b pt-[env(safe-area-inset-top)] transition-colors duration-200 ${
        transparent
          ? "border-border/60 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80 md:border-transparent md:bg-transparent md:backdrop-blur-none md:supports-[backdrop-filter]:bg-transparent"
          : "border-border/60 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80"
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between gap-2 px-4 md:px-6 lg:px-10">
        {/* Esquerda: logo + Menu + Serviços (lg+) */}
        <div className="flex min-w-0 items-center gap-1 sm:gap-3">
          <a href="/#top" className="flex items-center gap-2.5">
            {/* Logo troca conforme o tema (sem filtro invert). */}
            <img src={icon} alt="Reabilitar" className="h-10 w-auto dark:hidden" />
            <img
              src={iconNegativo}
              alt="Reabilitar"
              loading="lazy"
              className="hidden h-10 w-auto dark:block"
            />
            <span
              translate="no"
              className="text-base font-semibold tracking-tight text-primary dark:text-white"
            >
              {brand.logoText}
            </span>
          </a>

          <Sheet open={menuOpen} onOpenChange={handleMenuOpenChange}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-11 min-w-11 gap-2 px-2.5 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/10 dark:hover:text-gold sm:px-3"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
                <span className="hidden sm:inline">Menu</span>
              </Button>
            </SheetTrigger>
            <MenuOverlay />
          </Sheet>

          <Popover open={servicesOpen} onOpenChange={handleServicesOpenChange}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="hidden h-11 min-w-11 gap-1.5 px-2.5 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/10 dark:hover:text-gold sm:px-3 lg:inline-flex"
                aria-label="Abrir lista de serviços"
                aria-expanded={servicesOpen}
                aria-haspopup="dialog"
              >
                Serviços
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={12}
              // Clique na camada escurecida: fecha no "click" (abaixo), não no
              // pointerdown, para o clique não atravessar até a página.
              onPointerDownOutside={(event) => {
                if (servicesBackdropRef.current?.contains(event.target as Node)) {
                  event.preventDefault();
                }
              }}
              className="menu-services-panel w-[min(92vw,64rem)] rounded-3xl border border-border/60 bg-secondary p-6 text-foreground shadow-2xl"
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                Serviços
              </span>
              <TreatmentCards variant="dropdown" onSelect={() => setServicesOpen(false)} />
            </PopoverContent>
          </Popover>
          {/* Dropdown "Serviços" aberto: camada escurecida sob o cabeçalho (portal no
              body, abaixo do cabeçalho z-40 e do painel z-50). Clicar nela fecha. */}
          {servicesOpen &&
            createPortal(
              <div
                ref={servicesBackdropRef}
                aria-hidden="true"
                onClick={() => setServicesOpen(false)}
                className="fixed inset-x-0 bottom-0 top-[calc(5rem+env(safe-area-inset-top))] z-30 bg-black/45 backdrop-blur-sm animate-in fade-in-0 duration-150 motion-reduce:animate-none"
              />,
              document.body,
            )}
        </div>

        {/* Direita: tema e Contato (lg+) + CTA */}
        <div className="flex shrink-0 items-center gap-3 lg:gap-6">
          <ThemeToggle
            className={`hidden lg:inline-flex ${
              rightOnVideo
                ? "text-white hover:bg-white/10 focus-visible:ring-white"
                : "text-primary hover:bg-primary/10 focus-visible:ring-ring dark:text-white dark:hover:bg-white/10 dark:hover:text-gold"
            }`}
          />
          {/* modal={false}: um clique em "Serviços" ou "Menu" fecha este e já abre o outro. */}
          <DropdownMenu open={contactOpen} onOpenChange={handleContactOpenChange} modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                aria-haspopup="menu"
                aria-expanded={contactOpen}
                className={`hidden h-11 min-w-11 gap-1.5 px-2.5 text-sm font-medium sm:px-3 lg:inline-flex ${
                  rightOnVideo
                    ? "text-white hover:bg-white/10 hover:text-white"
                    : "text-primary hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/10 dark:hover:text-gold"
                }`}
              >
                Contato
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="min-w-60 rounded-2xl border-border/60 p-2 shadow-xl dark:bg-card dark:text-foreground"
            >
              <DropdownMenuItem asChild className={CONTACT_ITEM}>
                <a href={telUrl}>
                  <Phone aria-hidden="true" />
                  Ligar {contact.phoneDisplay}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className={CONTACT_ITEM}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Chamar no WhatsApp
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={openContactPanel}
            className="btn-shine inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90 md:px-5"
            aria-label="Agendar uma conversa"
          >
            <span className="md:hidden">{header.ctaLabelShort}</span>
            <span className="hidden md:inline">{header.ctaLabel}</span>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
