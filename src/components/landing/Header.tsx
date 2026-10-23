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

// Links das seções (xl+). "tratamentos" é o dropdown de tratamentos, entre o 1º e o 2º link.
const SECTION_LINKS = [
  { id: "credenciais", label: "Sobre nós" },
  { id: "primeira-consulta", label: "Primeira consulta" },
  { id: "depoimentos", label: "Depoimentos" },
  { id: "contato", label: "Onde estamos" },
];
const OBSERVED_SECTIONS = [
  "credenciais",
  "tratamentos",
  "primeira-consulta",
  "depoimentos",
  "contato",
];

// Mesmo estilo de texto dos controles do cabeçalho; hover coral e foco visível.
const NAV_ITEM =
  "relative h-11 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-sm font-medium text-primary transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none dark:text-white dark:hover:text-gold";

// xl+: fundo sólido desde o topo, para os links não passarem sobre o vídeo do hero.
const HEADER_XL_SOLID =
  "xl:border-border/60 xl:bg-background/95 xl:backdrop-blur xl:supports-[backdrop-filter]:bg-background/95 xl:dark:border-white/10";

// Tema e Contato sobre o vídeo (cabeçalho transparente, lg até xl): brancos.
// Em xl+ voltam às cores normais, pois o cabeçalho já tem fundo sólido.
const RIGHT_ON_VIDEO_XL_RESET =
  "xl:text-primary xl:hover:bg-primary/10 xl:dark:text-white xl:dark:hover:bg-white/10 xl:dark:hover:text-gold";

/** Sublinhado coral do link da seção visível (sem animação com prefers-reduced-motion). */
function ActiveBar({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300 motion-reduce:transition-none ${
        active ? "scale-x-100" : "scale-x-0"
      }`}
    />
  );
}

/** Seção que cruza a faixa do meio da tela (IntersectionObserver); null fora delas. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Header fixo com logo, navegação, Contato (desktop) e CTA em pílula.
 * - Abaixo de lg: botão Menu (tela cheia). lg até xl: Menu (painel lateral) + Tratamentos.
 * - xl+: links das seções no próprio cabeçalho, com a seção visível sublinhada em coral.
 * De md até xl fica transparente sobre o hero até rolar ~24px; abaixo de md e em xl+
 * é sempre sólido.
 */
export function Header({ overVideo = false }: { overVideo?: boolean }) {
  const { brand, contact, header } = clinicConfig;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const servicesBackdropRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(OBSERVED_SECTIONS);
  const { open: openContactPanel } = useContactPanel();

  // Menu (tela cheia ou painel), dropdown "Tratamentos" e menu "Contato": só um aberto por vez.
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
      className={`fixed inset-x-0 top-0 z-40 w-full border-b pt-[env(safe-area-inset-top)] transition-colors duration-200 ${HEADER_XL_SOLID} ${
        transparent
          ? "border-border/60 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80 md:border-transparent md:bg-transparent md:backdrop-blur-none md:supports-[backdrop-filter]:bg-transparent"
          : "border-border/60 bg-secondary/95 backdrop-blur supports-[backdrop-filter]:bg-secondary/80"
      }`}
    >
      <div className="flex h-20 w-full items-center justify-between gap-2 px-4 md:px-6 lg:px-10">
        {/* Esquerda: logo + Menu (até xl) + navegação (Tratamentos em lg; todos os links em xl) */}
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
                className="h-11 min-w-11 gap-2 px-2.5 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/10 dark:hover:text-gold sm:px-3 xl:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
                <span className="hidden sm:inline">Menu</span>
              </Button>
            </SheetTrigger>
            <MenuOverlay />
          </Sheet>

          <nav aria-label="Seções do site" className="hidden items-center gap-1 lg:flex">
            <a
              href={`/#${SECTION_LINKS[0].id}`}
              aria-current={activeSection === SECTION_LINKS[0].id ? "location" : undefined}
              className={`${NAV_ITEM} hidden xl:inline-flex`}
            >
              {SECTION_LINKS[0].label}
              <ActiveBar active={activeSection === SECTION_LINKS[0].id} />
            </a>

            <Popover open={servicesOpen} onOpenChange={handleServicesOpenChange}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={`${NAV_ITEM} inline-flex`}
                  aria-label="Abrir lista de tratamentos"
                  aria-expanded={servicesOpen}
                  aria-haspopup="dialog"
                >
                  Tratamentos
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  />
                  <ActiveBar active={activeSection === "tratamentos"} />
                </button>
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
                // Trocando para "Contato": não devolve o foco a "Tratamentos" (fecharia o Contato).
                onCloseAutoFocus={(event) => {
                  if (contactOpen) event.preventDefault();
                }}
                className="menu-services-panel w-[min(92vw,64rem)] rounded-3xl border border-border/60 bg-secondary p-6 text-foreground shadow-2xl"
              >
                <span className="mb-4 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                  Tratamentos
                </span>
                <TreatmentCards variant="dropdown" onSelect={() => setServicesOpen(false)} />
              </PopoverContent>
            </Popover>

            {SECTION_LINKS.slice(1).map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                aria-current={activeSection === link.id ? "location" : undefined}
                className={`${NAV_ITEM} hidden xl:inline-flex`}
              >
                {link.label}
                <ActiveBar active={activeSection === link.id} />
              </a>
            ))}
          </nav>
          {/* Dropdown "Tratamentos" aberto: camada escurecida sob o cabeçalho (portal no
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
                ? `text-white hover:bg-white/10 focus-visible:ring-white xl:focus-visible:ring-ring ${RIGHT_ON_VIDEO_XL_RESET}`
                : "text-primary hover:bg-primary/10 focus-visible:ring-ring dark:text-white dark:hover:bg-white/10 dark:hover:text-gold"
            }`}
          />
          {/* modal={false}: um clique em "Tratamentos" ou "Menu" fecha este e já abre o outro. */}
          <DropdownMenu open={contactOpen} onOpenChange={handleContactOpenChange} modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                aria-haspopup="menu"
                aria-expanded={contactOpen}
                className={`hidden h-11 min-w-11 gap-1.5 px-2.5 text-sm font-medium sm:px-3 lg:inline-flex ${
                  rightOnVideo
                    ? `text-white hover:bg-white/10 hover:text-white xl:hover:text-primary ${RIGHT_ON_VIDEO_XL_RESET}`
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
