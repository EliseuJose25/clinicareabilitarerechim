import { clinicConfig } from "@/config/clinicConfig";
import { Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";

/**
 * Rodapé institucional minimalista.
 * Endereço/telefone/horário ficam na seção "Onde estamos".
 * Padding inferior extra em mobile para não ficar coberto pelo FooterSticky.
 */
export function Footer() {
  const { brand, social } = clinicConfig;
  const year = new Date().getFullYear();

  const socials = [
    { label: "Instagram", href: social.instagram, Icon: Instagram },
  ];

  return (
    <footer className="border-t border-border bg-secondary/60 py-10 pb-28 md:py-14 md:pb-14">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center md:gap-8 md:px-6">
        {/* Linha 1: Social */}
        <ul className="flex items-center justify-center gap-5 md:gap-6">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </a>
            </li>
          ))}
        </ul>

        {/* Linha 2: Legal / Copyright */}
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row md:gap-4">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 md:inline-block" />
          <nav className="flex items-center gap-4">
            <Link
              to="/privacidade"
              className="no-underline hover:no-underline transition-colors duration-300 hover:text-primary"
            >
              Política de Privacidade
            </Link>
          </nav>
        </div>

        {/* Linha 3: Créditos */}
        <p className="text-xs text-muted-foreground/70">
          Desenvolvido por Studio Flow Tech
        </p>
        <p className="text-xs text-muted-foreground/70">
          Reabilitar Consultório de Especialidades Odontológicas Ltda. — CNPJ 05.390.391/0001-11
        </p>
      </div>
    </footer>
  );
}
