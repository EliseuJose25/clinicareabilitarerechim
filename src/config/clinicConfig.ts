/**
 * Configuração centralizada do template.
 * Para personalizar para um novo cliente, altere APENAS este arquivo.
 * (Textos, cores, links, contatos, SEO, analytics, etc.)
 */
import ba1Before from "@/assets/ba-1-before.jpg";
import ba1After from "@/assets/ba-1-after.jpg";
import ba2Before from "@/assets/ba-2-before.jpg";
import ba2After from "@/assets/ba-2-after.jpg";
import ba3Before from "@/assets/ba-3-before.jpg";
import ba3After from "@/assets/ba-3-after.jpg";

export const clinicConfig = {
  // ---------- Identidade ----------
  brand: {
    name: "Clínica Reabilitar",
    shortName: "Clínica Reabilitar",
    logoText: "Clínica Reabilitar",
    tagline: "Odontologia de alta performance para quem não aceita menos que o melhor",
  },

  // ---------- Contato ----------
  contact: {
    phone: "+55 11 99999-9999",
    phoneDisplay: "(11) 99999-9999",
    whatsapp: "5511999999999",
    whatsappMessage: "Olá! Gostaria de agendar minha avaliação inicial.",
    email: "contato@clinicaexemplo.com.br",
    address: {
      street: "Rua Exemplo, 123 - Sala 45",
      city: "São Paulo",
      state: "SP",
      zip: "01000-000",
      mapsUrl: "https://maps.google.com/?q=Clínica+Exemplo",
    },
    hours: "Seg a Sex: 8h às 19h | Sáb: 8h às 13h",
  },

  // ---------- CTA principal ----------
  cta: {
    primaryLabel: "Agendar Avaliação",
    secondaryLabel: "Fale no WhatsApp",
  },

  // ---------- Imagens (centralizadas) ----------
  images: {
    hero: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
    doctor: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=1200&q=80",
    clinic: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    lifestyle: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },

  // ---------- Hero ----------
  hero: {
    eyebrow: "Vagas limitadas para avaliação este mês",
    title: "Seu sorriso, renovado com total dedicação e sem pressa.",
    subtitle:
      "Atendimento particular, focado em resultados naturais e totalmente personalizado para você.",
    bullets: [
      "Avaliação com planejamento digital do sorriso incluso",
      "Protocolos sem dor, com sedação quando indicado",
      "Atendimento particular — poucos pacientes por semana",
    ],
    image: "",
    imageAlt: "Foto principal da clínica",
  },

  // ---------- Credenciais do doutor(a) ----------
  doctor: {
    name: "Dra. Nome Sobrenome",
    role: "Cirurgiã-Dentista - Especialista em Implantodontia",
    cro: "CRO-SP 000000",
    bio:
      "Especialista em reabilitação estética e implantodontia, com formação em São Paulo e atualização contínua nas técnicas mais avançadas da odontologia. Atendimento próprio, sem consultório de fábrica: cada plano de tratamento é pensado individualmente, do diagnóstico ao acompanhamento pós-tratamento.",
    photo: "",
    photoAlt: "Foto do(a) profissional",
    credentials: [
      { title: "Graduação", detail: "Odontologia - USP" },
      { title: "Especialização", detail: "Implantodontia - APCD" },
      { title: "Pós-graduação", detail: "Reabilitação Oral - São Leopoldo Mandic" },
      { title: "Membro", detail: "Associação Brasileira de Odontologia" },
    ],
  },

  // ---------- Depoimentos ----------
  testimonials: [
    {
      name: "Maria S.",
      role: "Paciente há 2 anos",
      quote:
        "Eu evitava o dentista havia anos por medo. Aqui, expliquei minha ansiedade antes de começar e o tratamento foi feito no meu ritmo, sem dor nenhuma.",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "João P.",
      role: "Implante dentário",
      quote:
        "Já tinha feito orçamento em outras clínicas. A diferença aqui foi o plano de tratamento detalhado antes de qualquer decisão — sem surpresa no meio do caminho.",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Ana L.",
      role: "Clareamento e lentes",
      quote:
        "Simulei o resultado antes de fechar o tratamento. O sorriso ficou exatamente como o planejamento mostrou — isso me deu segurança para seguir.",
      rating: 5,
      photo:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
  ],

  // ---------- Casos: Antes e Depois ----------
  // Fotos clínicas reais de sorrisos. O comparador exige o MESMO enquadramento
  // para before/after; use objectPosition para ajustar o foco e scale para
  // corrigir pequenas diferenças de zoom.
  beforeAfter: [
    {
      title: "Clareamento + Alinhamento",
      description: "Sorriso uniforme e branco após protocolo estético completo.",
      beforeImage: ba1Before,
      afterImage: ba1After,
      beforeAlt: "Antes - clareamento e alinhamento",
      afterAlt: "Depois - clareamento e alinhamento",
      beforePosition: "center center",
      afterPosition: "center center",
      beforeScale: 1,
      afterScale: 1,
    },
    {
      title: "Lentes de Contato Dental",
      description: "Reabilitação do formato e da cor com facetas de porcelana.",
      beforeImage: ba2Before,
      afterImage: ba2After,
      beforeAlt: "Antes - lentes de contato dental",
      afterAlt: "Depois - lentes de contato dental",
      beforePosition: "center center",
      afterPosition: "center center",
      beforeScale: 1,
      afterScale: 1,
    },
    {
      title: "Implante Dentário",
      description: "Recuperação total do sorriso com implante unitário.",
      beforeImage: ba3Before,
      afterImage: ba3After,
      beforeAlt: "Antes - implante dentário",
      afterAlt: "Depois - implante dentário",
      beforePosition: "center center",
      afterPosition: "center center",
      beforeScale: 1,
      afterScale: 1,
    },
  ],

  // ---------- Bloco de CTA Final ----------
  finalCta: {
    eyebrow: "Vagas limitadas para avaliação este mês",
    title: "Seu sorriso ideal começa com uma conversa, não com um compromisso",
    subtitle:
      "A avaliação inicial é sem custo e sem pressão. Você sai de lá com um plano de tratamento claro — decide depois, no seu tempo.",
    primaryLabel: "Agendar Avaliação",
  },

  // ---------- FAQ ----------
  faq: [
    {
      question: "Tenho medo de dentista, isso é um problema?",
      answer:
        "Não. A maioria dos nossos pacientes chega com algum nível de ansiedade. Explicamos cada etapa antes de fazer, respeitamos o seu ritmo e, quando indicado, oferecemos sedação para tornar o procedimento tranquilo.",
    },
    {
      question: "Vocês atendem convênio?",
      answer:
        "Trabalhamos como clínica particular, com opções de parcelamento facilitado. Emitimos nota fiscal para reembolso quando aplicável.",
    },
    {
      question: "Quanto tempo dura uma avaliação inicial?",
      answer:
        "A primeira consulta dura em média 45 minutos, incluindo exame clínico e apresentação do plano de tratamento.",
    },
    {
      question: "Vocês oferecem parcelamento?",
      answer:
        "Sim, aceitamos as principais bandeiras de cartão e oferecemos parcelamento próprio para tratamentos maiores.",
    },
    {
      question: "Por que agendar aqui e não em outra clínica?",
      answer:
        "Atendemos um número limitado de pacientes por semana para garantir plano de tratamento individualizado e acompanhamento próximo — não trabalhamos em volume.",
    },
    {
      question: "Como faço para agendar?",
      answer:
        "Você pode agendar diretamente pelo WhatsApp ou clicando em um dos botões de agendamento nesta página.",
    },
  ],

  // ---------- SEO ----------
  seo: {
    title: "Clínica Exemplo Odontologia - Sorrisos com excelência",
    description:
      "Clínica odontológica especializada em implantes, estética e reabilitação oral. Agende sua avaliação em São Paulo.",
    keywords:
      "clínica odontológica, implante dentário, dentista São Paulo, lentes de contato dental, clareamento",
    canonical: "/",
    ogImage: "",
  },

  // ---------- Analytics ----------
  analytics: {
    gtmId: "",
    gaId: "",
    metaPixelId: "",
  },

  // ---------- Integração Palatis AI (Smart Check-in) ----------
  palatis: {
    enabled: false,
    widgetId: "",
  },
} as const;

export type ClinicConfig = typeof clinicConfig;
