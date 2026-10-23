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
// Foto anterior: para voltar, trocar photo para draPriscila (e descomentar a linha abaixo).
// import draPriscila from "@/assets/dra-priscila.jpg";
import draPriscilaNova from "@/assets/dra-priscila-nova.jpg";

// Ícones dos tratamentos (vinculados pelo ID no array treatments abaixo).
import iconeOrtodontia from "@/assets/treatments/icone-ortodontia.png";
import iconeImplantesCirurgia from "@/assets/treatments/icone-implantes-cirurgia.png";
import iconeProtese from "@/assets/treatments/icone-protese.png";
import iconeClinicaGeral from "@/assets/treatments/icone-clinica-geral.png";
import iconeEstetica from "@/assets/treatments/icone-estetica.png";
// Versões com círculo azul-claro, para fundos escuros.
import iconeOrtodontiaClaro from "@/assets/treatments/icone-ortodontia-claro.png";
import iconeImplantesCirurgiaClaro from "@/assets/treatments/icone-implantes-cirurgia-claro.png";
import iconeProteseClaro from "@/assets/treatments/icone-protese-claro.png";
import iconeClinicaGeralClaro from "@/assets/treatments/icone-clinica-geral-claro.png";
import iconeEsteticaClaro from "@/assets/treatments/icone-estetica-claro.png";

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
    ortodontia: iconeOrtodontia,
    "implantes-cirurgia": iconeImplantesCirurgia,
    protese: iconeProtese,
    "clinica-geral": iconeClinicaGeral,
    estetica: iconeEstetica,
  },

  // Mesmos ícones para fundos escuros (tema escuro e menu azul-marinho).
  treatmentImagesDark: {
    ortodontia: iconeOrtodontiaClaro,
    "implantes-cirurgia": iconeImplantesCirurgiaClaro,
    protese: iconeProteseClaro,
    "clinica-geral": iconeClinicaGeralClaro,
    estetica: iconeEsteticaClaro,
  },

  treatments: [
    {
      id: "implantes-cirurgia",
      name: "Implantes e cirurgia",
      headline: "Implantes e cirurgia",
      image: iconeImplantesCirurgia,
      message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Implantes e cirurgia.",
      summary:
        "Implantes, levantamento de seio maxilar e extrações diversas, incluindo sisos, com explicação de cada etapa antes de começar.",
      procedures: ["Implantes", "Levantamento de seio maxilar", "Extrações", "Sisos"],
    },
    {
      id: "protese",
      name: "Prótese",
      headline: "Prótese",
      image: iconeProtese,
      message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Prótese.",
      summary:
        "Próteses móveis (totais e parciais) e fixas, sobre dentes ou sobre implantes, além de laminados como facetas e lentes de contato dentais.",
      procedures: ["Próteses móveis", "Próteses fixas", "Sobre implantes", "Facetas", "Lentes de contato"],
    },
    {
      id: "clinica-geral",
      name: "Clínica geral",
      headline: "Clínica geral",
      image: iconeClinicaGeral,
      message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Clínica geral.",
      summary:
        "Avaliação, diagnóstico e planejamento, radiografias, profilaxia (limpeza dentária), restaurações em resina e clareamento dental, com encaminhamento a outros profissionais quando necessário.",
      procedures: ["Avaliação", "Diagnóstico", "Radiografias", "Profilaxia", "Restaurações em resina", "Clareamento", "Encaminhamentos"],
    },
  ],

  // Tratamentos desligados no site (não aparecem em cartões, menu, dropdown nem rodapé).
  // Para reativar, mova o item de volta para "treatments".
  // Ortodontia: a Dra. Priscila não atende; reativar movendo de volta para "treatments"
  // quando o Dr. Tiago ou a nova profissional entrarem no site.
  inactiveTreatments: [
    // Estética: a Dra. faz (restaurações em resina e clareamento), mas sem especialização;
    // por isso esses itens aparecem dentro de Clínica geral.
    {
      id: "estetica",
      name: "Estética",
      headline: "Estética",
      image: iconeEstetica,
      message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Estética.",
      summary:
        "Clareamento e restaurações, com atenção ao aspecto natural dos dentes.",
      procedures: ["Clareamento", "Restaurações"],
    },
    {
      id: "ortodontia",
      name: "Ortodontia",
      headline: "Ortodontia",
      image: iconeOrtodontia,
      message: "Oi, tudo bem? Encontrei a Reabilitar pelo site e gostaria de saber mais sobre Ortodontia.",
      summary:
        "Avaliação e acompanhamento para alinhar os dentes e corrigir a mordida, com o aparelho mais adequado a cada caso.",
      procedures: ["Aparelhos", "Acompanhamento"],
    },
  ],

  // Seção "Primeira consulta" (logo após Tratamentos).
  firstVisit: {
    title: "Como é a sua primeira consulta",
    subtitle: "Sem pressa e sem surpresa: veja o que acontece desde a hora em que você chega.",
    steps: [
      {
        title: "Uma conversa",
        description: "Você conta o que sente, o que incomoda e o que espera. Ouvimos antes de examinar.",
      },
      {
        title: "O exame",
        description: "Avaliamos a sua boca com calma e explicamos o que encontramos, em linguagem simples.",
      },
      {
        title: "As opções",
        description: "Se houver necessidade de tratamento, explicamos as opções indicadas para o seu caso.",
      },
      {
        title: "A decisão é sua",
        description: "Você tira suas dúvidas e decide no seu tempo.",
      },
    ],
    cta: "Agendar uma conversa",
  },

  cta: {
    primaryLabel: "Agende uma conversa",
    secondaryLabel: "Fale no WhatsApp",
  },


  gallery: [
    { src: consultorioSalaEspera, alt: "Sala de espera do consultório Reabilitar", caption: "Sala de espera" },
    { src: consultorioCadeira2Vista, alt: "Sala de atendimento odontológico com vista para o centro de Erechim", caption: "Vista para o centro" },
    { src: consultorioCadeira1, alt: "Consultório odontológico com cadeira azul-clara", caption: "Consultório" },
    { src: consultorioSalaAtendimento, alt: "Sala de atendimento com mesa branca e poltrona", caption: "Sala de atendimento" },
  ],

  hero: {
    eyebrow: "25 anos de odontologia · Erechim/RS",
    title: "Odontologia raiz em Erechim/RS",
    display: { line1: "Odontologia", line2: "raiz" },
        // Frase retirada a pedido da Dra.; deixe vazio para não exibir.
        tagline: "",
    subtitle:
      "Atendimento particular, com cuidado individual e tempo para explicar cada etapa.",
    bullets: [
      "Atendimento particular, sem convênios, com foco total em você",
      "Explicação de cada etapa antes de começar",
    ],
    image: consultorioSalaEspera,
    imageAlt: "Sala de espera do consultório Reabilitar",
    video: {
      mp4: "/videos/hero-consultorio.mp4",
      webm: "/videos/hero-consultorio.webm",
      poster: "/videos/hero-consultorio-poster.jpg",
    },
  },

  header: {
    ctaLabel: "Agende uma conversa",
    ctaLabelShort: "Agendar",
  },

  team: [
    {
      name: "Dra. Priscila Santin",
      role: "Clínica Geral · Protesista e Implantodontista",
      cro: "CRO-RS 13049",
      bio: "Formada pela UPF em 2001, começou atendendo em São Valentim antes de fundar a Reabilitar em Erechim. Protesista e implantodontista, trata cada caso com o que chama de odontologia raiz: explicar tudo com clareza e indicar só o que o paciente realmente precisa.",
      photo: draPriscilaNova,
      credentials: [
        { title: "Graduação", detail: "Odontologia - UPF, Passo Fundo (2001)" },
        { title: "Especialização", detail: "Prótese Dentária - CEOM, Passo Fundo (2007)" },
        { title: "Especialização", detail: "Implantodontia - Uningá, Erechim (2021)" },
        { title: "Experiência", detail: "25 anos de odontologia" },
      ],
    },
  ],

  quote: {
    text: "Cada decisão é pensada no bem-estar de quem nos procura. Essa honestidade é a nossa marca.",
    author: "Dra. Priscila Santin",
  },

  testimonials: [
    {
      name: "Eliseu Novak",
      role: "Paciente desde os 12 anos",
      quote: "Comecei a tratar com a Dra. Priscila aos 12 anos, ainda em São Valentim, minha cidade natal, quando ela estava recém-formada. Quando ela abriu a Reabilitar aqui em Erechim, continuei como paciente. Hoje tenho 38 anos e nunca procurei outro dentista. Meus dentes estão saudáveis, então não preciso ir com muita frequência — mas quando preciso, é só com ela. Sempre fui muito bem atendido, até para marcar consulta pelo WhatsApp resolvem rápido.",
      highlight: "nunca procurei outro dentista",
      rating: 5,
      photo: depEliseu,
    },
    {
      name: "Tatiane Kempf",
      role: "Paciente há 4 anos",
      quote: "Sou paciente há cerca de 4 anos. Precisei extrair dois dentes que estavam me causando muita dor, e durante o procedimento a Dra. Priscila percebeu um pequeno cisto, que já foi removido na mesma hora. O pós-operatório foi super bem acompanhado por ela — me senti cuidada em cada etapa.",
      highlight: "me senti cuidada em cada etapa",
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
    title: "Seu cuidado começa com uma conversa, não com um compromisso",
    subtitle: "Sem pressão: você tira suas dúvidas, entende as opções para o seu caso e decide no seu tempo.",
    primaryLabel: "Agende uma conversa",
  },

  faq: [
    { question: "Tenho medo de dentista, isso é um problema?", answer: "Não. Explicamos cada etapa antes de fazer e respeitamos o seu ritmo para tornar o atendimento o mais tranquilo e confortável possível." },
    { question: "Vocês atendem convênio?", answer: "Não. Atendemos apenas de forma particular, o que nos permite dedicar tempo e atenção a cada paciente." },
    { question: "Como funciona o atendimento no consultório?", answer: "A equipe conversa com você para entender sua necessidade, avaliar o caso e explicar as opções de cuidado indicadas. Você pode esclarecer suas dúvidas e compreender as próximas etapas antes de decidir como prosseguir." },
    { question: "Como faço para agendar?", answer: "Você pode agendar diretamente pelo WhatsApp ou clicando em um dos botões de agendamento nesta página." },
  ],

  seo: {
    title: "Reabilitar - Consultório de Especialidades Odontológicas em Erechim/RS",
    description: "Consultório odontológico particular em Erechim/RS, com 25 anos de experiência em implantes, próteses, clínica geral e estética. Atendimento honesto e individualizado — agende sua consulta.",
    keywords: "dentista Erechim, implante dentário Erechim, clínica odontológica Erechim RS, prótese dentária Erechim",
    // Trocar para o domínio próprio quando estiver registrado.
    canonical: "https://clinicareabilitarerechim.lovable.app/",
    ogImage: "https://clinicareabilitarerechim.lovable.app/og-image.jpg",
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
