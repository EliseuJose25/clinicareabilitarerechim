import { ArrowUpRight, Instagram, MessageCircle, X } from "lucide-react";
import icon from "@/assets/reabilitar-icon.png";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { clinicConfig } from "@/config/clinicConfig";
import { TreatmentCards } from "@/components/landing/TreatmentCards";

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
      className="menu-overlay z-[60] h-dvh w-screen max-w-none gap-0 overflow-hidden border-0 bg-hero-overlay p-0 text-hero-on-video sm:max-w-none data-[state=open]:slide-in-from-right-0 data-[state=closed]:slide-out-to-right-0 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:duration-200 data-[state=closed]:duration-200 motion-reduce:animate-none lg:max-w-none lg:items-stretch lg:justify-between lg:rounded-none lg:border-none [&>button]:hidden"
    >
      <SheetTitle className="sr-only">Menu principal</SheetTitle>
      <SheetDescription className="sr-only">Navegação da Reabilitar, tratamentos e contatos.</SheetDescription>

      <div className="flex h-full min-h-0 flex-col">
        {/* Cabeçalho: logo + fechar */}
        <div className="shrink-0 pt-[env(safe-area-inset-top)]">
          <div className="mx-auto flex h-20 w-full max-w-xl items-center justify-between gap-2 px-6 lg:max-w-[96rem] lg:px-10">
            <div className="flex min-w-0 items-center gap-2.5">
              <img src={icon} alt="" className="h-10 w-auto" />
              <span translate="no" className="text-base font-semibold">{brand.logoText}</span>
            </div>
            <SheetClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="min-h-11 shrink-0 gap-2 rounded-md px-3 text-hero-on-video hover:bg-hero-on-video/10 hover:text-hero-on-video focus-visible:ring-2 focus-visible:ring-gold max-lg:text-primary lg:text-hero-on-video lg:hover:bg-hero-on-video/10 lg:hover:text-hero-on-video"
              >
                Fechar <X aria-hidden="true" className="size-5!" />
              </Button>
            </SheetClose>
          </div>
        </div>

        {/* Conteúdo: mobile empilhado / desktop em 2 colunas */}
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] max-lg:px-6 lg:overflow-hidden lg:px-10">

          {/* ── Mobile: conteúdo original empilhado ── */}
          <div className="mx-auto w-full max-w-xl pt-6 lg:max-w-[96rem] max-lg:block">
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
                { label: "WhatsApp da Reabilitar", href: whatsappUrl, Icon: MessageCircle },
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

          {/* ── Desktop (lg+): duas colunas verdadeiras ── */}
          <div className="mx-auto hidden h-full w-full max-w-[96rem] flex-row items-stretch justify-between gap-12 pt-8 lg:flex">

            {/* ── Coluna esquerda: ícones sociais + FAQ ── */}
            <div className="flex w-44 flex-col items-start justify-end gap-3 xl:w-52">
              <div className="flex flex-col items-start gap-3">
                {[
                  { label: "Instagram da Reabilitar", href: social.instagram, Icon: Instagram },
                  { label: "WhatsApp da Reabilitar", href: whatsappUrl, Icon: MessageCircle },
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
                  <a href="/#faq">
                    Perguntas frequentes <ArrowUpRight aria-hidden="true" className="ml-1 inline size-4!" />
                  </a>
                </Button>
              </SheetClose>
            </div>

            {/* ── Coluna direita: tratamentos + links ── */}
            <div className="flex min-h-0 flex-1 flex-col justify-between gap-10">

              {/* Tratamentos em linha única */}
              <div>
                <h2 className="mb-4 text-xl text-hero-on-video">Tratamentos</h2>
                <div className="flex flex-col gap-3 lg:grid lg:grid-cols-1 lg:gap-3 xl:grid xl:grid-cols-5 xl:gap-3">
                  {clinicConfig.treatments.map((treatment) => (
                    <Button
                      key={treatment.id}
                      asChild
                      variant="ghost"
                      className="menu-treatment group relative flex h-auto min-h-16 w-full flex-row items-center justify-start gap-5 whitespace-nowrap rounded-2xl border border-hero-on-video/15 bg-hero-on-video/5 px-5 py-4 text-base font-semibold text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-10 xl:min-h-20 xl:[&_svg]:size-12"
                    >
                      <a
                        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(treatment.message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {treatment.icon === "Smile" && (
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 xl:size-12">
                            <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
                          </svg>
                        )}
                        {treatment.icon === "Bone" && (
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 xl:size-12">
                            <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
                          </svg>
                        )}
                        {treatment.icon === "Puzzle" && (
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 xl:size-12">
                            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.315 8.69a.979.979 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61a2.404 2.404 0 0 1 1.705-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
                          </svg>
                        )}
                        {treatment.icon === "Stethoscope" && (
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 xl:size-12">
                            <path d="M4.8 2.3A.3.3 0 1 0 5 2.9a.3.3 0 0 0-.2-.6" /><path d="M22 12A10 10 0 1 1 12 2" /><path d="M22 12V7a5 5 0 0 0-5-5H8" /><circle cx="17" cy="12" r="3" />
                          </svg>
                        )}
                        {treatment.icon === "Sparkles" && (
                          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 xl:size-12">
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
                          </svg>
                        )}
                        <span className="flex-1 text-base">{treatment.name}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="menu-treatment-arrow size-5! shrink-0 text-hero-on-video transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-[-0.5] group-focus-visible:translate-x-0.5 group-focus-visible:translate-y-[-0.5] xl:size-6!"
                        />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* 4 links grandes em grade 2×2 */}
              <nav aria-label="Menu principal" className="grid grid-cols-2 gap-x-8 gap-y-6">
                {navLinks.map((link) => (
                  <SheetClose key={link.label} asChild>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex items-end justify-start gap-2 text-hero-on-video transition-transform duration-200 hover:translate-x-2 hover:text-[#F4725E] focus-visible:translate-x-2 focus-visible:text-[#F4725E] focus-visible:outline-none"
                    >
                      <span className="font-heading text-[clamp(3rem,5vw,5.5rem)] font-normal leading-none tracking-tight">
                        {link.label}
                      </span>
                      {link.external && (
                        <ArrowUpRight aria-hidden="true" className="mb-2 size-5! shrink-0" />
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
