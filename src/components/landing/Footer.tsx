import { useId } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import { Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";
import iconNegativo from "@/assets/reabilitar-icon-negativo.png";
import { Reveal } from "@/components/landing/Reveal";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// Links do rodapé: 44px de altura no celular, hover coral e foco visível.
const LINK =
  "inline-flex min-h-11 items-center rounded-sm transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none lg:min-h-0 lg:py-1";

const HEADING = "font-heading text-lg font-semibold text-white";

/**
 * Rodapé institucional em azul-marinho.
 * lg: 4 colunas (marca, tratamentos, consultório, onde estamos);
 * celular e tablet: colunas empilhadas com divisórias finas.
 * Padding inferior extra no celular para não ficar coberto pelo FooterSticky.
 */
export function Footer() {
  const { brand, contact, social, treatments } = clinicConfig;
  const year = new Date().getFullYear();
  const treatmentsTitleId = useId();
  const clinicTitleId = useId();
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;

  const clinicLinks = [
    { label: "Sobre nós", href: "/#credenciais" },
    { label: "Primeira consulta", href: "/#primeira-consulta" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Perguntas frequentes", href: "/#faq" },
    { label: "Onde estamos", href: "/#contato" },
  ];

  const socials = [
    { label: "Reabilitar no Instagram", href: social.instagram, Icon: Instagram },
    { label: "Conversar pelo WhatsApp", href: whatsappUrl, Icon: WhatsAppIcon },
  ];

  return (
    <footer className="bg-hero-overlay pb-28 pt-12 text-white/80 md:pb-10 md:pt-16">
      <Reveal className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid divide-y divide-white/15 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr] lg:gap-10 lg:divide-y-0">
          {/* Coluna 1: marca + redes */}
          <div className="pb-8 lg:pb-0">
            <div className="flex items-center gap-2.5">
              <img src={iconNegativo} alt="" className="h-10 w-auto" />
              <span translate="no" className="text-base font-semibold text-white">
                {brand.logoText}
              </span>
            </div>
            <ul className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: tratamentos */}
          <nav aria-labelledby={treatmentsTitleId} className="py-8 lg:py-0">
            <h2 id={treatmentsTitleId} className={HEADING}>
              Tratamentos
            </h2>
            <ul className="mt-3 lg:mt-4 lg:space-y-1">
              {treatments.map((treatment) => (
                <li key={treatment.id}>
                  <a href={`/#tratamento-${treatment.id}`} className={LINK}>
                    {treatment.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 3: o consultório */}
          <nav aria-labelledby={clinicTitleId} className="py-8 lg:py-0">
            <h2 id={clinicTitleId} className={HEADING}>
              O consultório
            </h2>
            <ul className="mt-3 lg:mt-4 lg:space-y-1">
              {clinicLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 4: onde estamos */}
          <div className="pt-8 lg:pt-0">
            <h2 className={HEADING}>Onde estamos</h2>
            <address className="mt-4 space-y-3 not-italic leading-relaxed">
              <p>
                {contact.address.street}
                <br />
                {contact.address.city} - {contact.address.state}, {contact.address.zip}
              </p>
              <p>{contact.hours}</p>
              <p>
                <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={LINK}>
                  {contact.phoneDisplay}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Linha final: legal / créditos */}
        <div className="mt-10 flex flex-col gap-1 border-t border-white/15 pt-6 text-xs text-white/60 lg:mt-14 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-6 lg:gap-y-2">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <Link to="/privacidade" className={`${LINK} self-start lg:self-auto`}>
            Política de Privacidade
          </Link>
          <p>
            Reabilitar Consultório de Especialidades Odontológicas Ltda. — CNPJ 05.390.391/0001-11
          </p>
          <p>Desenvolvido por Studio Flow Tech</p>
        </div>
      </Reveal>
    </footer>
  );
}
