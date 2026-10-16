import { useEffect, useState } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import icon from "@/assets/reabilitar-icon.png";
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

/**
 * Header fixo com logo, botão Menu (gaveta), telefone (desktop) e CTA em pílula.
 * Em md+ fica transparente sobre o hero até rolar ~24px; abaixo de md é sempre sólido.
 */
export function Header({ overVideo = false }: { overVideo?: boolean }) {
  const { brand, contact, header } = clinicConfig;
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { open: openContactPanel } = useContactPanel();

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
  const phoneOnVideo = overVideo && transparent;

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
            <img src={icon} alt="Reabilitar" className="h-10 w-auto" />
            <span translate="no" className="text-base font-semibold tracking-tight text-primary">
              {brand.logoText}
            </span>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-11 min-w-11 gap-2 px-2.5 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary sm:px-3"
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
                <span className="hidden sm:inline">Menu</span>
              </Button>
            </SheetTrigger>
            <MenuOverlay />
          </Sheet>

          <Popover open={servicesOpen} onOpenChange={setServicesOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="hidden h-11 min-w-11 gap-1.5 px-2.5 text-sm font-medium text-primary hover:bg-primary/10 hover:text-primary sm:px-3 lg:inline-flex"
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
              className="w-[min(92vw,64rem)] rounded-3xl border border-border/60 bg-secondary p-6 text-foreground shadow-2xl"
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-wider text-foreground/60">
                Serviços
              </span>
              <TreatmentCards variant="dropdown" />
            </PopoverContent>
          </Popover>
        </div>

        {/* Direita: telefone (lg+) + CTA */}
        <div className="flex shrink-0 items-center gap-3 lg:gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={`hidden min-h-11 items-center gap-1.5 text-left transition-colors lg:flex ${
                  phoneOnVideo ? "text-white" : "text-primary"
                }`}
              >
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{contact.phone}</span>
                  <span translate="no" className="text-xs opacity-80">{brand.logoText}</span>
                </span>
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Opções de contato por telefone</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a href={telUrl} className="cursor-pointer">
                  <Phone className="mr-2 h-4 w-4" /> Ligar agora
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Chamar no WhatsApp
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={openContactPanel}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90 md:px-5"
            aria-label="Agendar uma conversa"
          >
            <span className="md:hidden">{header.ctaLabelShort}</span>
            <span className="hidden md:inline">{header.ctaLabel}</span>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
