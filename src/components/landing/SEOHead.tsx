import { clinicConfig } from "@/config/clinicConfig";

/**
 * SEOHead
 * -------
 * Gera os objetos `meta`, `links` e `scripts` para o `head()` da rota.
 * Inclui Schema.org (Dentist) para SEO local.
 * Preencha os campos em `src/config/clinicConfig.ts`.
 */
export function buildSEOHead() {
  const { seo, brand, contact } = clinicConfig;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: brand.name,
    description: seo.description,
    telephone: contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "11:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "13:00",
        closes: "17:30",
      },
    ],
    url: seo.canonical,
  };

  const meta = [
    { title: seo.title },
    { name: "description", content: seo.description },
    { name: "keywords", content: seo.keywords },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: seo.canonical },
    { property: "og:site_name", content: "Reabilitar" },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    // Prévia no WhatsApp/redes: public/og-image.jpg (1200x630).
    ...(seo.ogImage
      ? [
          { property: "og:image", content: seo.ogImage },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { property: "og:image:type", content: "image/jpeg" },
          {
            property: "og:image:alt",
            content: "Reabilitar – Consultório de Especialidades Odontológicas em Erechim/RS",
          },
          { name: "twitter:image", content: seo.ogImage },
        ]
      : []),
  ];

  const links = [{ rel: "canonical", href: seo.canonical }];

  const scripts = [
    { type: "application/ld+json", children: JSON.stringify(schema) },
  ];

  return { meta, links, scripts };
}
