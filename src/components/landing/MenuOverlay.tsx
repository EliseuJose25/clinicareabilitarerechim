import { ArrowUpRight, Instagram, MessageCircle, X } from "lucide-react";
import icon from "@/assets/reabilitar-icon.png";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { clinicConfig } from "@/config/clinicConfig";
import { TreatmentCards } from "@/components/landing/TreatmentCards";

export function MenuOverlay() {
  const { brand, contact, social } = clinicConfig;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  const links = [
    { label: "Sobre nós", href: "/#credenciais" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Onde estamos", href: "/#contato" },
    { label: "Contato", href: whatsappUrl, external: true },
  ];

  return (
    <SheetContent
      side="right"
      className="menu-overlay z-[60] h-dvh w-screen max-w-none gap-0 overflow-hidden border-0 bg-hero-overlay p-0 text-hero-on-video sm:max-w-none data-[state=open]:slide-in-from-right-0 data-[state=closed]:slide-out-to-right-0 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:duration-200 data-[state=closed]:duration-200 motion-reduce:animate-none [&>button]:hidden"
    >
      <div className="flex h-full min-h-0 flex-col">
        <SheetTitle className="sr-only">Menu principal</SheetTitle>
        <SheetDescription className="sr-only">Navegação da Reabilitar, tratamentos e contatos.</SheetDescription>
        <div className="shrink-0 pt-[env(safe-area-inset-top)]">
          <div className="mx-auto flex h-20 w-full max-w-xl items-center justify-between gap-2 px-6 lg:max-w-2xl">
            <div className="flex min-w-0 items-center gap-2.5">
              <img src={icon} alt="" className="h-10 w-auto" />
              <span translate="no" className="text-base font-semibold">{brand.logoText}</span>
            </div>
            <SheetClose asChild>
              <Button type="button" variant="ghost" className="min-h-11 shrink-0 gap-2 rounded-md px-3 text-hero-on-video hover:bg-hero-on-video/10 hover:text-hero-on-video focus-visible:ring-2 focus-visible:ring-gold">
                Fechar <X aria-hidden="true" className="size-5!" />
              </Button>
            </SheetClose>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)]">
          <div className="mx-auto w-full max-w-xl pt-6 lg:max-w-2xl">
            <nav aria-label="Menu principal" className="flex flex-col gap-4">
              {links.map((link) => (
                <div key={link.label} className="menu-stagger min-w-0">
                  <SheetClose asChild>
                    <Button asChild variant="ghost" className="menu-main-link min-h-14 h-auto max-w-full justify-start gap-2 rounded-sm px-0 py-2 text-left font-heading font-normal text-hero-on-video transition-[transform,color] duration-200 hover:translate-x-2 hover:bg-transparent hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-5">
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
                <Button key={label} asChild variant="ghost" size="icon" className="size-12 rounded-full bg-hero-on-video/10 text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-5">
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon aria-hidden="true" /></a>
                </Button>
              ))}
              <SheetClose asChild>
                <Button asChild variant="ghost" className="h-auto min-h-11 max-w-full whitespace-normal rounded-sm px-1 text-left text-base text-hero-on-video transition-[transform,color] duration-200 hover:translate-x-2 hover:bg-transparent hover:text-gold focus-visible:translate-x-2 focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold">
                  <a href="/#faq">Perguntas frequentes</a>
                </Button>
              </SheetClose>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}