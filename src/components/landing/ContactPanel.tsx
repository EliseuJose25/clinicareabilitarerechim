import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { clinicConfig } from "@/config/clinicConfig";

type ContactPanelContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ContactPanelContext = createContext<ContactPanelContextValue | null>(null);

export function ContactPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo<ContactPanelContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );
  return (
    <ContactPanelContext.Provider value={value}>
      {children}
    </ContactPanelContext.Provider>
  );
}

export function useContactPanel() {
  const ctx = useContext(ContactPanelContext);
  if (!ctx) {
    throw new Error(
      "useContactPanel deve ser usado dentro de <ContactPanelProvider>.",
    );
  }
  return ctx;
}

type Subject = "consulta" | "duvida";

const SUBJECT_LABEL: Record<Subject, string> = {
  consulta: "Marcar consulta",
  duvida: "Tirar dúvida",
};

const SUBJECT_PHRASE: Record<Subject, string> = {
  consulta: "Gostaria de marcar uma consulta.",
  duvida: "Tenho uma dúvida.",
};

export function ContactPanel() {
  const { contact } = clinicConfig;
  const { isOpen, close } = useContactPanel();
  const [subject, setSubject] = useState<Subject>("consulta");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const headingId = useId();
  const nameId = useId();
  const nameErrorId = useId();
  const messageId = useId();
  const messageCountId = useId();
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const sendButtonRef = useRef<HTMLButtonElement | null>(null);
  const fieldTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (fieldTimerRef.current) clearTimeout(fieldTimerRef.current);
      if (buttonTimerRef.current) clearTimeout(buttonTimerRef.current);
    };
  }, []);

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const canSubmit = trimmedName.length >= 2 && trimmedMessage.length <= 300;

  const buildWhatsappMessage = () => {
    const parts = ["Oi, tudo bem?", `Meu nome é ${trimmedName}.`];
    parts.push(SUBJECT_PHRASE[subject]);
    if (trimmedMessage.length > 0) {
      parts.push(trimmedMessage);
    }
    return parts.join(" ");
  };

  const buildWhatsappUrl = () => {
    return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
      buildWhatsappMessage(),
    )}`;
  };

  /**
   * Teclado virtual: o campo focado é rolado para o centro da área visível
   * (acima do teclado) cerca de 250 ms depois do foco, tempo médio de abertura
   * do teclado. O botão de enviar continua acessível logo abaixo do campo.
   */
  const scrollFieldIntoView = (element: HTMLElement | null, keepButton = false) => {
    if (!element) return;
    if (fieldTimerRef.current) clearTimeout(fieldTimerRef.current);
    if (buttonTimerRef.current) clearTimeout(buttonTimerRef.current);
    fieldTimerRef.current = setTimeout(() => {
      const viewport = window.visualViewport;
      const visibleHeight = viewport?.height ?? window.innerHeight;
      const keyboardInset = Math.max(0, window.innerHeight - visibleHeight);
      const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      // "center" respeita a margem de rolagem: com o teclado medido, o campo
      // fica centralizado na faixa visível acima dele.
      element.style.setProperty("scroll-margin-bottom", `${keyboardInset}px`);
      element.scrollIntoView({ block: "center", behavior });
      if (!keepButton) return;
      buttonTimerRef.current = setTimeout(() => {
        const button = sendButtonRef.current;
        if (!button) return;
        const current = window.visualViewport;
        const visibleBottom = (current?.offsetTop ?? 0) + (current?.height ?? window.innerHeight);
        if (button.getBoundingClientRect().bottom > visibleBottom) {
          button.style.setProperty("scroll-margin-top", "1rem");
          button.scrollIntoView({ block: "end", behavior });
        }
      }, 400);
    }, 250);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (trimmedName.length < 2) {
      setNameError("Como podemos te chamar?");
      nameInputRef.current?.focus();
      return;
    }
    setNameError(null);
    const url = buildWhatsappUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? null : close())}>
      <SheetContent
        side="right"
        className="contact-panel z-[70] h-dvh w-screen max-w-none gap-0 overflow-x-hidden overflow-y-auto overscroll-contain border-0 bg-secondary p-0 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] text-foreground sm:max-w-none data-[state=open]:slide-in-from-right-0 data-[state=closed]:slide-out-to-right-0 data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:duration-250 data-[state=closed]:duration-200 motion-safe:data-[state=open]:animate-[contact-panel-in_250ms_ease-out] motion-safe:data-[state=closed]:animate-[contact-panel-out_200ms_ease-in] motion-reduce:animate-none [&>button]:hidden"
      >
        <SheetTitle className="sr-only">Agende uma conversa</SheetTitle>
        <SheetDescription className="sr-only">
          Escolha o assunto, informe seu nome e, se quiser, escreva uma mensagem.
          Você será encaminhado ao WhatsApp da Reabilitar.
        </SheetDescription>

        <div className="flex min-h-full min-h-dvh flex-col">
          {/* Topo: fechar */}
          <div
            className="shrink-0 px-6 pt-[calc(env(safe-area-inset-top)+1rem)] lg:px-10 lg:pt-[calc(env(safe-area-inset-top)+1.5rem)]"
          >
            <SheetClose
              className="ml-auto flex min-h-11 min-w-11 items-center justify-end gap-2 rounded-md px-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Fechar painel de contato"
            >
              Fechar
              <X aria-hidden="true" className="size-5" />
            </SheetClose>
          </div>

          {/* Conteúdo do formulário */}
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pb-10 pt-6 lg:px-10 lg:pb-16">
            <h2
              id={headingId}
              className="max-w-md text-balance text-2xl font-semibold leading-snug text-foreground md:text-3xl"
            >
              Quer marcar uma consulta ou tirar uma dúvida? Estamos aqui para
              ajudar.
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-6"
              noValidate
            >
              {/* Assunto (pílulas) */}
              <fieldset>
                <legend className="sr-only">Assunto</legend>
                <RadioGroup
                  value={subject}
                  onValueChange={(value) =>
                    setSubject(value === "duvida" ? "duvida" : "consulta")
                  }
                  className="flex flex-wrap gap-2"
                >
                  {(Object.keys(SUBJECT_LABEL) as Subject[]).map((value) => {
                    const id = `subject-${value}`;
                    const selected = subject === value;
                    return (
                      <label
                        key={value}
                        htmlFor={id}
                        className={cn(
                          "inline-flex h-11 cursor-pointer items-center gap-3 rounded-full border px-5 text-sm font-medium transition-colors",
                          selected
                            ? "border-hero-overlay bg-hero-overlay text-hero-on-video"
                            : "border-foreground/15 bg-background text-foreground hover:border-foreground/30",
                        )}
                      >
                        <RadioGroupItem
                          id={id}
                          value={value}
                          className="sr-only"
                        />
                        {SUBJECT_LABEL[value]}
                      </label>
                    );
                  })}
                </RadioGroup>
              </fieldset>

              {/* Nome */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={nameId}
                  className="text-sm font-medium text-foreground"
                >
                  Nome
                </label>
                <input
                  ref={nameInputRef}
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  inputMode="text"
                  required
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (nameError && event.target.value.trim().length >= 2) {
                      setNameError(null);
                    }
                  }}
                  onFocus={() => scrollFieldIntoView(nameInputRef.current)}
                  aria-invalid={nameError ? true : undefined}
                  aria-describedby={nameError ? nameErrorId : undefined}
                  placeholder="Seu nome"
                  className={cn(
                    "h-14 w-full rounded-full border bg-background px-5 text-base text-foreground placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    nameError
                      ? "border-destructive"
                      : "border-foreground/15 focus-visible:border-foreground/30",
                  )}
                />
                {nameError && (
                  <p
                    id={nameErrorId}
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {nameError}
                  </p>
                )}
              </div>

              {/* Mensagem + botão enviar */}
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <label
                    htmlFor={messageId}
                    className="text-sm font-medium text-foreground"
                  >
                    Mensagem (opcional)
                  </label>
                  <span
                    id={messageCountId}
                    className="text-xs text-foreground/60"
                    aria-live="polite"
                  >
                    {trimmedMessage.length}/300
                  </span>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                  <textarea
                    ref={messageInputRef}
                    id={messageId}
                    name="message"
                    rows={3}
                    maxLength={300}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onFocus={() => scrollFieldIntoView(messageInputRef.current, true)}
                    aria-describedby={messageCountId}
                    placeholder="Conte rapidamente o que você precisa"
                    className="min-h-14 w-full flex-1 resize-none rounded-3xl border border-foreground/15 bg-background px-5 py-4 text-base text-foreground placeholder:text-foreground/50 focus-visible:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <button
                    ref={sendButtonRef}
                    type="submit"
                    aria-label="Enviar pelo WhatsApp"
                    disabled={!canSubmit}
                    className="inline-flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-hero-overlay px-6 text-sm font-semibold text-hero-on-video shadow-sm transition hover:bg-hero-overlay/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 lg:h-14 lg:w-14 lg:px-0"
                  >
                    <ArrowRight aria-hidden="true" className="size-5" />
                    <span className="lg:sr-only">Enviar pelo WhatsApp</span>
                  </button>
                </div>
              </div>
            </form>

            <p className="mt-6 text-xs text-foreground/60">
              Não guardamos seus dados. Ao enviar, você será levado ao WhatsApp.
            </p>
            <p className="mt-1 text-xs text-foreground/60">
              Prefere ligar?{" "}
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="font-medium text-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {contact.phoneDisplay}
              </a>
            </p>

            {/* Palavra gigante - mobile: fim do conteúdo; desktop: ancora do rodapé */}
            <div className="mt-10 lg:hidden">
              <h3 className="text-balance font-heading text-[clamp(2.75rem,12vw,4.5rem)] font-normal leading-[1.02] text-foreground">
                Agende uma conversa
              </h3>
            </div>
          </div>

          {/* Rodapé decorativo - desktop */}
          <div className="pointer-events-none relative hidden overflow-hidden lg:block">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(16,38,74,0) 0%, rgba(16,38,74,0.08) 55%, rgba(16,38,74,0.16) 100%)",
              }}
              aria-hidden="true"
            />
            <h3
              className="relative mx-6 pt-10 pb-6 font-heading text-foreground"
              style={{
                fontSize: "clamp(3rem, 9vw, 8rem)",
                lineHeight: 1,
              }}
            >
              Agende uma conversa
            </h3>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
