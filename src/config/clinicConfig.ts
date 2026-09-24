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
import depEliseu from "@/assets/depoimento-eliseu.jpg";
import depTatiane from "@/assets/depoimento-tatiane.jpg";
import consultorioSalaEspera from "@/assets/consultorio-sala-espera.jpg";
import consultorioCadeira2Vista from "@/assets/consultorio-cadeira-2-vista.jpg";
import consultorioCadeira1 from "@/assets/consultorio-cadeira-1.jpg";
import consultorioSalaAtendimento from "@/assets/consultorio-sala-atendimento.jpg";

export const clinicConfig = {
  // ---------- Identidade ----------
  brand: {
    name: "Reabilitar",
    shortName: "Reabilitar",
    logoText: "Reabilitar",
    tagline:
      "Mais de 20 anos praticando a odontologia raiz: cuidado honesto, cada decisão pensada para você.",
  },

  // ---------- Contato ----------
  contact: {
    phone: "+55 11 99999-9999",
    phoneDisplay: "(54) 999559059",
    whatsapp: "5511999999999",
    whatsappMessage: "Olá! Gostaria de agendar minha avaliação inicial.",
    email: "contato@reabilitarerechim.com.br",
    address: {
      street: "Av. Sete de Setembro, 431 - Sala 605",
      city: "Erechim",
      state: "RS",
      zip: "99700-000",
      mapsUrl: "",
    },
    hours: "Horário comercial",
  },

  // ---------- Redes sociais ----------
  social: {
    instagram: "https://instagram.com/reabilitarerechim",
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

  // ---------- Galeria da estrutura ----------
  gallery: [
    {
      src: consultorioSalaEspera,
      alt: "Sala de espera do consultório Reabilitar",
    },
    {
      src: consultorioCadeira2Vista,
      alt: "Sala de atendimento odontológico com vista para o centro de Erechim",
    },
    {
      src: consultorioCadeira1,
      alt: "Consultório odontológico com cadeira azul-clara",
    },
    {
      src: consultorioSalaAtendimento,
      alt: "Sala de atendimento com mesa branca e poltrona",
    },
  ],

  // ---------- Hero ----------
  hero: {
    eyebrow: "Mais de 20 anos de odontologia em Erechim",
    title: "Seu sorriso, renovado com total dedicação e sem pressa.",
    subtitle:
      "Atendimento particular, com mais de 20 anos de prática pautada pela honestidade e pelo cuidado individual com cada paciente.",
    bullets: [
      "Mais de 20 anos de experiência em odontologia raiz",
      "Atendimento particular, sem convênios, com foco total em você",
      "Plano de tratamento claro antes de qualquer decisão",
    ],
    image: consultorioSalaEspera,
    imageAlt: "Sala de espera do consultório Reabilitar",
  },

  // ---------- Equipe profissional ----------
  // Mais 2 profissionais serão adicionados em breve — basta inserir novos objetos neste array seguindo o mesmo formato
  team: [
    {
      name: "Dra. Priscila Santin",
      role: "Cirurgiã-Dentista",
      cro: "CRO-RS 000000",
      bio:
        "Atendimento cuidadoso e individualizado, com foco no bem-estar de cada paciente e atualização contínua nas melhores práticas da odontologia.",
      photo: "",
      credentials: [
        { title: "Graduação", detail: "Odontologia - instituição a confirmar" },
        { title: "Especialização", detail: "Área de atuação a confirmar" },
        { title: "Pós-graduação", detail: "Formação complementar a confirmar" },
        { title: "Membro", detail: "Associação profissional a confirmar" },
      ],
    },
    {
      name: "Dr. Tiago",
      role: "Cirurgião-Dentista",
      cro: "CRO-RS 000000",
      bio:
        "Atendimento atencioso e personalizado, com dedicação à saúde bucal, ao conforto e às necessidades individuais de cada paciente.",
      photo: "",
      credentials: [],
    },
  ],

  // ---------- Depoimentos ----------
  // Depoimentos reais de pacientes (autorizados). Fotos serão adicionadas depois.
  testimonials: [
    {
      name: "Eliseu Novak",
      role: "Paciente desde os 12 anos",
      quote:
        "Comecei a tratar com a Dra. Priscila aos 12 anos, ainda em São Valentim, minha cidade natal, quando ela estava recém-formada. Quando ela abriu a Reabilitar aqui em Erechim, continuei como paciente. Hoje tenho 38 anos e nunca procurei outro dentista. Meus dentes estão saudáveis, então não preciso ir com muita frequência — mas quando preciso, é só com ela. Sempre fui muito bem atendido, até para marcar consulta pelo WhatsApp resolvem rápido. Prefiro ficar com dor a procurar outro dentista.",
      rating: 5,
      photo: depEliseu,
    },
    {
      name: "Tatiane Kempf",
      role: "Paciente há 4 anos",
      quote:
        "Sou paciente há cerca de 4 anos. Precisei extrair dois dentes que estavam me causando muita dor, e durante o procedimento a Dra. Priscila percebeu um pequeno cisto, que já foi removido na mesma hora. O pós-operatório foi super bem acompanhado por ela — me senti cuidada em cada etapa.",
      rating: 5,
      photo: depTatiane,
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
      beforePosition: "center 63%",
      afterPosition: "center 63%",
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
      beforePosition: "center 48%",
      afterPosition: "center 48%",
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
      beforePosition: "center 53%",
      afterPosition: "center 53%",
      beforeScale: 1,
      afterScale: 1,
    },
  ],

  // ---------- Bloco de CTA Final ----------
  finalCta: {
    eyebrow: "Consultório de especialidades odontológicas",
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
        "Não. Explicamos cada etapa antes de fazer e respeitamos o seu ritmo para tornar o atendimento o mais tranquilo e confortável possível.",
    },
    {
      question: "Vocês atendem convênio?",
      answer:
        "Não. Atendemos apenas de forma particular — isso nos permite dedicar tempo e cuidado total a cada paciente, sem pressa e sem protocolos padronizados.",
    },
    {
      question: "Quanto tempo dura uma avaliação inicial?",
      answer:
        "A primeira consulta dura em média 45 minutos, incluindo exame clínico e apresentação do plano de tratamento.",
    },
    {
      question: "Vocês oferecem parcelamento?",
      answer:
        "Aceitamos Pix e dinheiro. Parcelamento pode ser combinado conforme o caso — fale com a gente para entender a melhor condição para o seu tratamento.",
    },
    {
      question: "Por que agendar aqui e não em outra clínica?",
      answer:
        "Porque prezamos por honestidade e cuidado individual em cada etapa — não indicamos tratamentos desnecessários, e você sempre entende o porquê de cada decisão antes de seguir.",
    },
    {
      question: "Como faço para agendar?",
      answer:
        "Você pode agendar diretamente pelo WhatsApp ou clicando em um dos botões de agendamento nesta página.",
    },
  ],

  // ---------- SEO ----------
  seo: {
    title: "Reabilitar - Consultório de Especialidades Odontológicas em Erechim/RS",
    description:
      "Consultório odontológico particular em Erechim/RS, com mais de 20 anos de experiência em ortodontia, implantes, próteses e estética. Atendimento honesto e individualizado — agende sua avaliação.",
    keywords:
      "dentista Erechim, implante dentário Erechim, ortodontia Erechim, clínica odontológica Erechim RS, prótese dentária Erechim",
    canonical: "https://reabilitarerechim.com.br/",
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
