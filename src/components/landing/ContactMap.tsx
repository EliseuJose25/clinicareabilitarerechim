import { clinicConfig } from "@/config/clinicConfig";
import placaSala605 from "@/assets/placa-sala-605.jpg";
import { MapPin, Clock, Phone, Star, Navigation, ExternalLink } from "lucide-react";
import { Reveal, REVEAL_STAGGER_MS } from "./Reveal";

/**
 * ContactMap - seção de contato com mapa embutido do Google Maps.
 * Lê endereço de clinicConfig e monta uma URL de embed pública
 * (não requer API key). Caso queira usar Maps JavaScript API,
 * substitua o <iframe> por um componente customizado.
 */
export function ContactMap() {
  const { contact, brand } = clinicConfig;
  const query = encodeURIComponent(
    `${contact.address.street}, ${contact.address.city} - ${contact.address.state}, ${contact.address.zip}`,
  );
  const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section
      id="contato"
      className="border-b border-border/60 bg-background py-10 dark:border-transparent md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Onde estamos
          </h2>
          <p className="mt-2 text-muted-foreground">
            No antigo Edifício Sanenge, na Av. Sete de Setembro.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-[1.2fr_1fr] md:gap-10">
          <Reveal className="overflow-hidden rounded-2xl border border-border bg-muted">
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title={`Mapa de ${brand.name}`}
                src={embedSrc}
                className="absolute inset-0 h-full w-full border-0 dark:opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal
            delay={REVEAL_STAGGER_MS}
            className="flex flex-col justify-center gap-4 rounded-2xl border border-border/70 bg-secondary/40 p-6 md:p-8"
          >
            <figure>
              <img
                src={placaSala605}
                alt="Placa de acrílico da Reabilitar – Consultório de Especialidades Odontológicas, fixada na parede acima da porta da sala 605, com o logotipo de dente azul e a indicação Sala 605"
                className="w-full rounded-2xl object-cover dark:brightness-95"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-muted-foreground">
                Sala 605, Av. Sete de Setembro, 431
              </figcaption>
            </figure>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary dark:text-white/80" />
              <div className="text-base text-foreground">
                <p className="font-semibold text-primary dark:text-white">{contact.addressTitle}</p>
                <p className="text-muted-foreground">{contact.address.street}</p>
                <p className="text-muted-foreground">
                  {contact.address.city} - {contact.address.state}, {contact.address.zip}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary dark:text-white/80" />
              <p className="text-base text-muted-foreground">{contact.hours}</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary dark:text-white/80" />
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="text-base font-medium text-primary hover:underline"
              >
                {contact.phoneDisplay}
              </a>
            </div>

            <div className="mt-2 flex flex-col gap-3 md:flex-row md:flex-wrap">
              <a
                href={contact.reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gmap-primary btn-shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition-colors duration-200 hover:bg-hero-overlay hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-overlay dark:hover:bg-gold/90 dark:hover:text-gold-foreground dark:focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none md:w-auto"
              >
                <Star className="h-4 w-4 transition-colors duration-200 group-hover/btn:text-white group-focus-visible/btn:text-white" />
                Avaliar a Reabilitar no Google
              </a>
              <a
                href={contact.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gmap-secondary inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-transparent hover:text-gold hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-gold focus-visible:bg-transparent focus-visible:text-gold focus-visible:shadow-md motion-reduce:transition-none dark:border-white/25 dark:text-white dark:hover:border-gold dark:hover:text-gold dark:focus-visible:border-gold dark:focus-visible:text-gold dark:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none md:w-auto"
              >
                <ExternalLink className="h-4 w-4" />
                Ver perfil no Google Maps
              </a>
              <a
                href={contact.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gmap-secondary inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-transparent hover:text-gold hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-gold focus-visible:bg-transparent focus-visible:text-gold focus-visible:shadow-md motion-reduce:transition-none dark:border-white/25 dark:text-white dark:hover:border-gold dark:hover:text-gold dark:focus-visible:border-gold dark:focus-visible:text-gold dark:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transition-none md:w-auto"
              >
                <Navigation className="h-4 w-4" />
                Traçar rota no Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}