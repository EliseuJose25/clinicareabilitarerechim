import { clinicConfig } from "@/config/clinicConfig";
import { MapPin, Clock, Phone } from "lucide-react";

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
    <section id="contato" className="border-b border-border/60 bg-background py-10 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Onde estamos
          </h2>
          <p className="mt-2 text-muted-foreground">
            Venha nos visitar ou fale conosco agora.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-[1.2fr_1fr] md:gap-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <div className="relative aspect-[4/3] w-full">
              <iframe
                title={`Mapa de ${brand.name}`}
                src={embedSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border/70 bg-secondary/40 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div className="text-sm text-foreground">
                <p className="font-semibold">{contact.addressTitle}</p>
                <p className="text-muted-foreground">{contact.address.street}</p>
                <p className="text-muted-foreground">
                  {contact.address.city} - {contact.address.state}, {contact.address.zip}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">{contact.hours}</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <a
                href={`tel:${contact.phone}`}
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                {contact.phoneDisplay}
              </a>
            </div>

            <a
              href={contact.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90"
            >
              Traçar rota no Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}