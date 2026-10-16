import { ArrowUpRight, Instagram, X } from "lucide-react";
import icon from "@/assets/reabilitar-icon.png";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { clinicConfig } from "@/config/clinicConfig";
import { TreatmentCards } from "@/components/landing/TreatmentCards";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function MenuOverlay() {
  const { brand, contact, social } = clinicConfig;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const navLinks = [
    { label: "Sobre nós", href: "/#credenciais" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Onde estamos", href: "/#contato" },
    { label: "Contato", href: whatsappUrl, external: true },
  ];

  return (
    <SheetContent
      side="right"
      className="menu-overlay z-[60] h-dvh w-screen max-w-none gap-0 overflow-x-hidden overflow-y-hidden border-0 bg-hero-overlay p-0 text-hero-on-video sm:max-w-none data-[state=open]:slide-in-from-right-0 data-[state=closed]:slide-out-to-right-0 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:duration-200 data-[state=closed]:duration-200 motion-reduce:animate-none lg:max-w-none lg:items-stretch lg:justify-between lg:rounded-none lg:border-none [&>button]:hidden"
    >
      <SheetTitle className="sr-only">Menu principal</SheetTitle>
      <SheetDescription className="sr-only">Navegação da Reabilitar, tratamentos e contatos.</SheetDescription>

      <div className="flex h-full min-h-0 flex-col">
        {/* Cabeçalho: logo + fechar */}
        <div className="shrink-0 pt-[env(safe-area-inset-top)]">
          <div className="mx-auto flex h-20 w-full max-w-xl items-center justify-between gap-2 px-6 lg:grid lg:max-w-[96rem] lg:grid-cols-[32%_minmax(0,1fr)] lg:gap-12 lg:px-10">
            <div className="flex min-w-0 items-center gap-2.5">
              <img src={icon} alt="" className="h-10 w-auto brightness-0 invert" />
              <span translate="no" className="text-base font-semibold">{brand.logoText}</span>
            </div>
            <SheetClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="min-h-11 shrink-0 gap-2 rounded-md px-3 text-hero-on-video hover:bg-hero-on-video/10 hover:text-hero-on-video focus-visible:ring-2 focus-visible:ring-gold lg:justify-self-end lg:text-hero-on-video lg:hover:bg-hero-on-video/10 lg:hover:text-hero-on-video"
              >
                Fechar <X aria-hidden="true" className="size-5" />
              </Button>
            </SheetClose>
          </div>
        </div>

        {/* Área de conteúdo com scroll interno */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] max-lg:px-6 lg:overflow-hidden lg:px-10">

          {/* ── Mobile (< lg): empilhado ── */}
          <div className="mx-auto w-full max-w-xl pt-6 max-lg:block lg:hidden">
            <nav aria-label="Menu principal" className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.label} className="menu-stagger min-w-0">
                  <SheetClose asChild>
                    <Button
                      asChild
                      variant="ghost"
                      className="menu-main-link min-h-14 h-auto max-w-full justify-start gap-2 rounded-sm px-0 py-2 text-left font-heading font-normal text-hero-on-video transition-[transform,color] duration-200 hover:translate-x-2 hover:bg-transparent hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-5"
                    >
                      <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
                        {link.label} {link.external && <ArrowUpRight aria-hidden="true" />}
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              ))}
            </nav>

            <div className="menu-stagger menu-treatments mt-10">
              <TreatmentCards variant="menu" />
            </div>

            <div className="menu-stagger menu-networks mt-8 flex flex-wrap items-center gap-3">
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

          {/* ── Desktop (lg+): duas colunas com altura total ── */}
          <div className="mx-auto hidden h-full w-full max-w-[96rem] grid-cols-[32%_minmax(0,1fr)] items-stretch gap-12 pt-8 lg:grid">

            {/* ── Coluna esquerda: ícones sociais + FAQ ── */}
            <div className="flex min-w-0 flex-col items-start justify-between gap-6">
              <div className="flex flex-col items-start gap-3">
                {[
                  { label: "Instagram da Reabilitar", href: social.instagram, Icon: Instagram },
                  { label: "WhatsApp da Reabilitar", href: whatsappUrl, Icon: WhatsAppIcon },
                ].map(({ label, href, Icon }) => (
                  <Button
                    key={label}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="size-14 rounded-full bg-hero-on-video/10 text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-7"
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
                  className="h-auto min-h-11 w-full justify-start whitespace-normal rounded-none border-t border-hero-on-video/15 px-0 pt-6 text-left text-base text-hero-on-video transition-[transform,color] duration-200 hover:translate-x-2 hover:bg-transparent hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <a href="/#faq">
                    Perguntas frequentes <ArrowUpRight aria-hidden="true" className="ml-1 inline size-4" />
                  </a>
                </Button>
              </SheetClose>
            </div>

            {/* ── Coluna direita: tratamentos + links grandes ── */}
            <div className="flex min-h-0 min-w-0 flex-col justify-between gap-10 overflow-y-auto">

              {/* Tratamentos em grid: 3 cols em lg, 5 cols em xl */}
              <div>
                <TreatmentCards variant="menu" />
              </div>

              {/* 4 links grandes em grade 2×2 */}
              <nav aria-label="Menu principal" className="grid shrink-0 grid-cols-2 gap-x-8 gap-y-6">
                {navLinks.map((link) => (
                  <SheetClose key={link.label} asChild>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex min-w-0 items-end justify-start gap-2 text-hero-on-video transition-transform duration-200 hover:translate-x-2 hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <span className="break-words font-heading text-4xl font-normal leading-tight xl:text-5xl 2xl:text-6xl">
                        {link.label}
                      </span>
                      {link.external && (
                        <ArrowUpRight aria-hidden="true" className="mb-2 size-5 shrink-0" />
                      )}
                    </a>
                  </SheetClose>
                ))}
              </nav>

            </div>
          </div>

        </div>
      </div>
    </SheetContent>
  );
}
