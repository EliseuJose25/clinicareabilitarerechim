import { useEffect, useRef } from "react";

/**
 * ScrollProgress - linha de 2px na base do cabeçalho que cresce com a rolagem.
 * Atualiza só o transform (scaleX) via requestAnimationFrame, com listeners
 * passivos. Oculta com prefers-reduced-motion e sem JavaScript (começa em 0).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold [transform:scaleX(0)] motion-reduce:hidden"
    />
  );
}
