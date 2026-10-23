import { useId, useState } from "react";
import { ArrowUpRight, ChevronDown, Instagram, X } from "lucide-react";
import iconNegativo from "@/assets/reabilitar-icon-negativo.png";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { clinicConfig } from "@/config/clinicConfig";
import { TreatmentCards } from "@/components/landing/TreatmentCards";
import { useContactPanel } from "@/components/landing/ContactPanel";
import { ThemeToggle } from "@/components/landing/ThemeToggle";
import { TreatmentIcon } from "@/components/landing/TreatmentIcon";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

type MenuLink = {
  label: string;
  href?: string;
  external?: boolean;
  isServices?: boolean;
};

export function MenuOverlay() {
  const { brand, contact, social } = clinicConfig;
  const { open: openContactPanel } = useContactPanel();
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const [isServicosOpen, setIsServicosOpen] = useState(false);
  const servicosButtonId = useId();
  const servicosPanelId = useId();
  const panelTreatmentsId = useId();
  const { treatments } = clinicConfig;

  // Painel lateral (lg até xl): mesmos destinos dos links do cabeçalho em xl, mais o FAQ.
  const panelLinks = [
    { label: "Sobre nós", href: "/#credenciais" },
    { label: "Tratamentos", href: "/#tratamentos" },
    { label: "Primeira consulta", href: "/#primeira-consulta" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Onde estamos", href: "/#contato" },
    { label: "Perguntas frequentes", href: "/#faq" },
  ];

  const navLinks: MenuLink[] = [
    { label: "Sobre nós", href: "/#credenciais" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Onde estamos", href: "/#contato" },
    { label: "Contato" },
  ];

  // Somente no mobile: "Serviços" entra entre "Sobre nós" e "Depoimentos".
  const mobileNavLinks: MenuLink[] = navLinks.flatMap((link) =>
    link.label === "Depoimentos" ? [{ label: "Serviços", isServices: true }, link] : [link],
  );

  const handleContatoClick = () => {
    setTimeout(() => openContactPanel(), 250);
  };

  return (
    <SheetContent
      side="right"
      className="menu-overlay z-[60] h-dvh w-screen max-w-none gap-0 overflow-x-hidden overflow-y-hidden border-0 bg-hero-overlay p-0 text-hero-on-video sm:max-w-none data-[state=open]:slide-in-from-right-0 data-[state=closed]:slide-out-to-right-0 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:duration-200 data-[state=closed]:duration-200 motion-reduce:animate-none lg:w-[420px] lg:max-w-[420px] lg:shadow-2xl lg:data-[state=open]:slide-in-from-right lg:data-[state=closed]:slide-out-to-right lg:data-[state=open]:duration-300 [&>button]:hidden"
    >
      <SheetTitle className="sr-only">Menu principal</SheetTitle>
      <SheetDescription className="sr-only">Navegação da Reabilitar, tratamentos e contatos.</SheetDescription>

      <div className="flex h-full min-h-0 flex-col">
        {/* Cabeçalho: logo + fechar */}
        <div className="shrink-0 pt-[env(safe-area-inset-top)]">
          <div className="mx-auto flex h-20 w-full max-w-xl items-center justify-between gap-2 px-6">
            <div className="flex min-w-0 items-center gap-2.5">
              <img src={iconNegativo} alt="" className="h-10 w-auto" />
              <span translate="no" className="text-base font-semibold">{brand.logoText}</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {/* Celular: chave do tema ao lado do Fechar (em lg+ ela fica no cabeçalho). */}
              <ThemeToggle className="size-11 bg-hero-on-video/10 text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:ring-gold lg:hidden" />
              <SheetClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="min-h-11 shrink-0 gap-2 rounded-md px-3 text-hero-on-video hover:bg-hero-on-video/10 hover:text-hero-on-video focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Fechar <X aria-hidden="true" className="size-5" />
                </Button>
              </SheetClose>
            </div>
          </div>
        </div>

        {/* Área de conteúdo com scroll interno */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-[calc(env(safe-area-inset-bottom)+1rem)] max-lg:px-6 lg:pb-[calc(env(safe-area-inset-bottom)+2rem)]">

          {/* ── Mobile (< lg): empilhado ── */}
          <div className="mx-auto w-full max-w-xl pt-4 max-lg:block lg:hidden">
            <nav aria-label="Menu principal" className="flex flex-col gap-3">
              {mobileNavLinks.map((link) => {
                if (link.isServices) {
                  return (
                    <div key={link.label} className="menu-stagger min-w-0">
                      <button
                        id={servicosButtonId}
                        type="button"
                        aria-expanded={isServicosOpen}
                        aria-controls={servicosPanelId}
                        onClick={() => setIsServicosOpen((open) => !open)}
                        className="menu-main-link min-h-14 h-auto max-w-full justify-start gap-2 rounded-sm px-0 py-2 text-left font-heading font-normal text-hero-on-video transition-[transform,color] duration-200 hover:translate-x-2 hover:bg-transparent hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none [&_svg]:size-5"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isServicosOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      <div
                        id={servicosPanelId}
                        role="region"
                        aria-labelledby={servicosButtonId}
                        inert={isServicosOpen ? undefined : true}
                        className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${isServicosOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="pt-3">
                            <TreatmentCards variant="menu-compact" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                const isContato = link.label === "Contato";
                return (
                  <div key={link.label} className="menu-stagger min-w-0">
                    <SheetClose asChild>
                      <Button
                        asChild={!isContato}
                        variant="ghost"
                        className="menu-main-link min-h-14 h-auto max-w-full justify-start gap-2 rounded-sm px-0 py-2 text-left font-heading font-normal text-hero-on-video transition-[transform,color] duration-200 hover:translate-x-2 hover:bg-transparent hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-5"
                        onClick={isContato ? handleContatoClick : undefined}
                      >
                        {isContato ? (
                          <span>{link.label}</span>
                        ) : (
                          <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
                            {link.label} {link.external && <ArrowUpRight aria-hidden="true" />}
                          </a>
                        )}
                      </Button>
                    </SheetClose>
                  </div>
                );
              })}
            </nav>

            {/* Redes à esquerda e FAQ à direita; em telas estreitas o FAQ desce de linha. */}
            <div className="menu-stagger menu-networks mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {[
                  { label: "Instagram da Reabilitar", href: social.instagram, Icon: Instagram },
                  { label: "WhatsApp da Reabilitar", href: whatsappUrl, Icon: WhatsAppIcon },
                ].map(({ label, href, Icon }) => (
                  <Button
                    key={label}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-full bg-hero-on-video/10 text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-5"
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Icon aria-hidden="true" />
                    </a>
                  </Button>
                ))}
              </div>
              <SheetClose asChild>
                <Button
                  asChild
                  variant="ghost"
                  className="h-auto min-h-11 max-w-full whitespace-normal rounded-sm px-1 text-left text-base text-hero-on-video transition-[transform,color] duration-200 hover:translate-x-2 hover:bg-transparent hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <a href="/#faq">Perguntas frequentes</a>
                </Button>
              </SheetClose>
            </div>
          </div>

          {/* ── Painel lateral (lg até xl): a partir de xl os links ficam no cabeçalho ── */}
          <div className="hidden pt-2 lg:flex lg:flex-col">
            <nav aria-label="Menu principal">
              <ul className="flex flex-col">
                {panelLinks.map((link) => (
                  <li key={link.href} className="menu-stagger">
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="block rounded-md py-1.5 font-heading text-2xl text-hero-on-video transition-colors duration-200 hover:text-gold focus-visible:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <section
              aria-labelledby={panelTreatmentsId}
              className="mt-6 border-t border-hero-on-video/15 pt-5"
            >
              <h2
                id={panelTreatmentsId}
                className="text-xs font-semibold uppercase tracking-wider text-hero-on-video/70"
              >
                Tratamentos
              </h2>
              <ul className="mt-2 flex flex-col">
                {treatments.map((treatment) => (
                  <li key={treatment.id}>
                    <SheetClose asChild>
                      <a
                        href={`/#tratamento-${treatment.id}`}
                        className="flex min-h-11 items-center gap-3 rounded-md py-1 text-sm font-medium text-hero-on-video transition-colors duration-200 hover:text-gold focus-visible:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none"
                      >
                        <TreatmentIcon
                          id={treatment.id}
                          surface="dark"
                          className="h-8 w-8 shrink-0 object-contain"
                        />
                        {treatment.name}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-6 flex items-center gap-3 border-t border-hero-on-video/15 pt-5">
              {[
                { label: "Instagram da Reabilitar", href: social.instagram, Icon: Instagram },
                { label: "WhatsApp da Reabilitar", href: whatsappUrl, Icon: WhatsAppIcon },
              ].map(({ label, href, Icon }) => (
                <Button
                  key={label}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="size-11 rounded-full bg-hero-on-video/10 text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-5"
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
