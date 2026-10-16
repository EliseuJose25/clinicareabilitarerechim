/**
 * Configuração centralizada do template.
 * Para personalizar para um novo cliente, altere APENAS este arquivo.
 * (Textos, cores, links, contatos, SEO, analytics, etc.)
 */
import depEliseu from "@/assets/depoimento-eliseu.jpg";
import depTatiane from "@/assets/depoimento-tatiane.jpg";
import consultorioSalaEspera from "@/assets/consultorio-sala-espera.jpg";
import consultorioCadeira2Vista from "@/assets/consultorio-cadeira-2-vista.jpg";
import consultorioCadeira1 from "@/assets/consultorio-cadeira-1.jpg";
import consultorioSalaAtendimento from "@/assets/consultorio-sala-atendimento.jpg";
import draPriscila from "@/assets/dra-priscila.jpg";

// Imagens dos tratamentos (vinculadas pelo ID no array treatments abaixo).
import tratamentoOrtodontia from "@/assets/treatments/tratamento-ortodontia.jpg";
import tratamentoImplantesCirurgia from "@/assets/treatments/tratamento-implantes-cirurgia.jpg";
import tratamentoProtese from "@/assets/treatments/tratamento-protese.jpg";
import tratamentoClinicaGeral from "@/assets/treatments/tratamento-clinica-geral.jpg";
import tratamentoEstetica from "@/assets/treatments/tratamento-estetica.jpg";

export const clinicConfig = {
  brand: {
    name: "Reabilitar",
    shortName: "Reabilitar",
    logoText: "Reabilitar",
    tagline:
      "25 anos praticando a odontologia raiz: cuidado honesto, cada decisão pensada para você.",
  },

  contact: {
    phone: "+55 54 99955-9059",
    phoneDisplay: "(54) 99955-9059",
    whatsapp: "5554999559059",
    whatsappMessage: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de marcar uma consulta. Quais dias e horários vocês têm disponíveis? Desde já, obrigado!",
    email: "contato@reabilitarerechim.com.br",
    addressTitle: "Reabilitar – Consultório de Especialidades Odontológicas",
    address: {
      street: "Av. Sete de Setembro, 431 - Sala 605",
      city: "Erechim",
      state: "RS",
      zip: "99700-000",
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Sete+de+Setembro,+431,+Erechim+-+RS",
    },
    hours: "Segunda a sexta: 8h às 11h30 e 13h às 17h30",
    reviewUrl: "https://g.page/r/CRZlU8bU73LzEBM/review",
    googleBusinessUrl: "https://share.google/xxIfpFPU9wpdzpX38",
  },

  social: {
    instagram: "https://www.instagram.com/reabilitarodontoerechim/",
  },

  treatmentImages: {
    ortodontia: tratamentoOrtodontia,
    "implantes-cirurgia": tratamentoImplantesCirurgia,
    protese: tratamentoProtese,
    "clinica-geral": tratamentoClinicaGeral,
    estetica: tratamentoEstetica,
  },

  treatments: [
    { id: "ortodontia", name: "Ortodontia", image: "ortodontia", message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Ortodontia." },
    { id: "implantes-cirurgia", name: "Implantes e cirurgia", image: "implantes-cirurgia", message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Implantes e cirurgia." },
    { id: "protese", name: "Prótese", image: "protese", message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Prótese." },
    { id: "clinica-geral", name: "Clínica geral", image: "clinica-geral", message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Clínica geral." },
    { id: "estetica", name: "Estética", image: "estetica", message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Estética." },
  ],

  cta: {
    primaryLabel: "Agendar Avaliação",
    secondaryLabel: "Fale no WhatsApp",
  },

  images: {
    hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    doctor: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80",
    clinic: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    lifestyle: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },

  gallery: [
    { src: consultorioSalaEspera, alt: "Sala de espera do consultório Reabilitar" },
    { src: consultorioCadeira2Vista, alt: "Sala de atendimento odontológico com vista para o centro de Erechim" },
    { src: consultorioCadeira1, alt: "Consultório odontológico com cadeira azul-clara" },
    { src: consultorioSalaAtendimento, alt: "Sala de atendimento com mesa branca e poltrona" },
  ],

  hero: {
    eyebrow: "25 anos de odontologia · Erechim/RS",
    title: "Odontologia raiz: honesta, sem pressa e só com o que você realmente precisa.",
    display: { line1: "Odontologia", line2: "raiz" },
        tagline: "Honesta, sem pressa e só com o que você realmente precisa.",
    subtitle:
      "Atendimento particular, com cuidado individual e tempo para explicar cada etapa.",
    bullets: [
      "Mais de 20 anos de experiência em odontologia raiz",
      "Atendimento particular, sem convênios, com foco total em você",
      "Plano de tratamento claro antes de qualquer decisão",
    ],
    image: consultorioSalaEspera,
    imageAlt: "Sala de espera do consultório Reabilitar",
    video: {
      mp4: "/videos/hero.mp4",
      webm: "/videos/hero.webm",
      poster: "/videos/hero-poster.jpg",
    },
  },

  header: {
    ctaLabel: "Agende uma conversa",
    ctaLabelShort: "Agendar",
  },

  team: [
    {
      name: "Dra. Priscila Santin",
      role: "Clínica Geral · Prótese e Implantodontia",
      cro: "CRO-RS 13049",
      bio: "Formada pela UPF em 2001, começou atendendo em São Valentim antes de fundar a Reabilitar em Erechim. Especialista em Prótese Dentária e em Implantodontia, trata cada caso com o que chama de odontologia raiz: explicar tudo com clareza e indicar só o que o paciente realmente precisa.",
      photo: draPriscila,
      credentials: [
        { title: "Graduação", detail: "Odontologia - UPF, Passo Fundo (2001)" },
        { title: "Especialização", detail: "Prótese Dentária - CEOM, Passo Fundo (2007)" },
        { title: "Especialização", detail: "Implantodontia - Uningá, Erechim (2021)" },
        { title: "Experiência", detail: "25 anos de odontologia" },
      ],
    },
  ],

  quote: {
    text: "Nunca fizemos nada pensando só em ganhar dinheiro, e sim no bem-estar de quem nos procura. Essa honestidade é a nossa marca.",
    author: "Dra. Priscila Santin",
  },

  testimonials: [
    {
      name: "Eliseu Novak",
      role: "Paciente desde os 12 anos",
      quote: "Comecei a tratar com a Dra. Priscila aos 12 anos, ainda em São Valentim, minha cidade natal, quando ela estava recém-formada. Quando ela abriu a Reabilitar aqui em Erechim, continuei como paciente. Hoje tenho 38 anos e nunca procurei outro dentista. Meus dentes estão saudáveis, então não preciso ir com muita frequência — mas quando preciso, é só com ela. Sempre fui muito bem atendido, até para marcar consulta pelo WhatsApp resolvem rápido. Prefiro ficar com dor a procurar outro dentista.",
      rating: 5,
      photo: depEliseu,
    },
    {
      name: "Tatiane Kempf",
      role: "Paciente há 4 anos",
      quote: "Sou paciente há cerca de 4 anos. Precisei extrair dois dentes que estavam me causando muita dor, e durante o procedimento a Dra. Priscila percebeu um pequeno cisto, que já foi removido na mesma hora. O pós-operatório foi super bem acompanhado por ela — me senti cuidada em cada etapa.",
      rating: 5,
      photo: depTatiane,
    },
  ],

  beforeAfter: [] as {
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    beforeAlt: string;
    afterAlt: string;
    beforePosition?: string;
    afterPosition?: string;
    beforeScale?: number;
    afterScale?: number;
  }[],

  finalCta: {
    eyebrow: "Consultório de especialidades odontológicas",
    title: "Seu sorriso ideal começa com uma conversa, não com um compromisso",
    subtitle: "Sem pressão: você sai da avaliação com um plano de tratamento claro e decide depois, no seu tempo.",
    primaryLabel: "Agendar Avaliação",
  },

  faq: [
    { question: "Tenho medo de dentista, isso é um problema?", answer: "Não. Explicamos cada etapa antes de fazer e respeitamos o seu ritmo para tornar o atendimento o mais tranquilo e confortável possível." },
    { question: "Vocês atendem convênio?", answer: "Não. Atendemos apenas de forma particular — isso nos permite dedicar tempo e cuidado total a cada paciente, sem pressa e sem protocolos padronizados." },
    { question: "Por que agendar aqui e não em outra clínica?", answer: "Porque prezamos por honestidade e cuidado individual em cada etapa — não indicamos tratamentos desnecessários, e você sempre entende o porquê de cada decisão antes de seguir." },
    { question: "Como faço para agendar?", answer: "Você pode agendar diretamente pelo WhatsApp ou clicando em um dos botões de agendamento nesta página." },
  ],

  seo: {
    title: "Reabilitar - Consultório de Especialidades Odontológicas em Erechim/RS",
    description: "Consultório odontológico particular em Erechim/RS, com 25 anos de experiência em ortodontia, implantes, próteses e estética. Atendimento honesto e individualizado — agende sua consulta.",
    keywords: "dentista Erechim, implante dentário Erechim, ortodontia Erechim, clínica odontológica Erechim RS, prótese dentária Erechim",
    canonical: "https://reabilitarerechim.com.br/",
    ogImage: "",
  },

  analytics: {
    gtmId: "",
    gaId: "",
    metaPixelId: "",
  },

  palatis: {
    enabled: false,
    widgetId: "",
  },
} as const;

export type ClinicConfig = typeof clinicConfig;
