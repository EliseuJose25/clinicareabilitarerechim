import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

const DURATION_MS = 600;
const OFFSET_PX = 24;

/** Atraso entre itens de uma lista: use `index * REVEAL_STAGGER_MS` na prop delay. */
export const REVEAL_STAGGER_MS = 60;

type RevealStatus = "idle" | "hidden" | "shown";

/**
 * useReveal - revela o elemento (opacity 0→1, translateY 24px→0, 600ms ease-out)
 * na primeira vez que ele entra na tela.
 * - O estado oculto só é aplicado no cliente, depois da hidratação: sem JavaScript
 *   (e para buscadores) o conteúdo fica sempre visível.
 * - Só esconde o que ainda está abaixo da dobra, então nada que já está na tela pisca.
 * - Com prefers-reduced-motion nada anima; ao imprimir, tudo aparece.
 * - Usa só opacity e transform (sem deslocar o layout); will-change só durante a animação.
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [status, setStatus] = useState<RevealStatus>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setStatus("hidden");
    let timer: number | undefined;
    const showNow = () => setStatus("idle");

    // Um bloco muito alto nunca chegaria a 15% visível; o limite cai para caber na tela.
    const threshold = Math.min(0.15, (window.innerHeight * 0.5) / Math.max(el.offsetHeight, 1));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setStatus("shown");
        timer = window.setTimeout(showNow, DURATION_MS + delay);
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    window.addEventListener("beforeprint", showNow);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("beforeprint", showNow);
    };
  }, [delay]);

  let style: CSSProperties | undefined;
  if (status === "hidden") {
    style = { opacity: 0, transform: `translateY(${OFFSET_PX}px)` };
  } else if (status === "shown") {
    style = {
      opacity: 1,
      transform: "none",
      transition: `opacity ${DURATION_MS}ms ease-out ${delay}ms, transform ${DURATION_MS}ms ease-out ${delay}ms`,
      willChange: "opacity, transform",
    };
  }

  return { ref, style };
}

type RevealProps = HTMLAttributes<HTMLElement> & {
  /** Elemento renderizado (padrão: div), para não criar wrappers extras em listas. */
  as?: "div" | "article" | "figure" | "li";
  /** Atraso em ms antes de animar (em listas: index * REVEAL_STAGGER_MS). */
  delay?: number;
  children?: ReactNode;
};

/**
 * Reveal - aplica useReveal a um elemento. Aceita os atributos do elemento
 * (className, id, tabIndex, eventos…), então pode substituir uma div ou um cartão.
 */
export function Reveal({ as = "div", delay = 0, style, children, ...rest }: RevealProps) {
  const reveal = useReveal<HTMLElement>(delay);
  return createElement(
    as,
    { ...rest, ref: reveal.ref, style: { ...style, ...reveal.style } },
    children,
  );
}
