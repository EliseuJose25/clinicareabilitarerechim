import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clinicConfig } from "@/config/clinicConfig";

/**
 * BeforeAfterSlider - comparador interativo de "Antes e Depois" com divisória
 * arrastável. Mantém a navegação entre múltiplos casos clínicos via setas e
 * indicadores. Cada caso do clinicConfig.beforeAfter define beforeImage /
 * afterImage; ao trocar de caso, a divisória volta para 50%.
 *
 * IMPORTANTE: para que a comparação fique alinhada, as duas fotos devem ter
 * o mesmo enquadramento. objectPosition e scale permitem ajustes finos sem
 * precisar editar as imagens.
 */
export function BeforeAfterSlider() {
  const { beforeAfter } = clinicConfig;
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(50); // 0-100 (%)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const total = beforeAfter.length;

  const current = beforeAfter[index];

  const goTo = (i: number) => {
    setIndex(((i % total) + total) % total);
    setPosition(50);
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!draggingRef.current || !e.touches[0]) return;
      updateFromClientX(e.touches[0].clientX);
    };
    const stop = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [updateFromClientX]);

  const startDrag = (clientX?: number) => {
    draggingRef.current = true;
    if (typeof clientX === "number") updateFromClientX(clientX);
  };

  const beforeStyle = {
    objectPosition: (current.beforePosition as string | undefined) ?? "center center",
    transform: `scale(${current.beforeScale ?? 1})`,
  };

  const afterStyle = {
    objectPosition: (current.afterPosition as string | undefined) ?? "center center",
    transform: `scale(${current.afterScale ?? 1})`,
  };

  return (
    <section
      id="antes-e-depois"
      className="border-b border-border/60 bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Antes e depois
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Transformações que devolvem confiança e naturalidade ao sorriso.
          </p>
        </div>

        <div className="mt-10 md:mt-14">
          <div
            ref={containerRef}
            className="relative mx-auto aspect-[16/9] h-[300px] w-full max-w-4xl select-none overflow-hidden rounded-2xl bg-secondary shadow-sm md:h-[450px]"
            onMouseDown={(e) => {
              e.preventDefault();
              startDrag(e.clientX);
            }}
            onTouchStart={(e) => {
              if (e.touches[0]) startDrag(e.touches[0].clientX);
            }}
          >
            {/* Camada base: Antes — ocupa 100% do container para servir de referência */}
            <img
              key={`before-${index}`}
              src={current.beforeImage}
              alt={current.beforeAlt}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
              style={beforeStyle}
            />

            {/* Camada superior: Depois, recortada pela divisória */}
            <div
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                key={`after-${index}`}
                src={current.afterImage}
                alt={current.afterAlt}
                loading="lazy"
                draggable={false}
                className="h-full w-full object-cover"
                style={afterStyle}
              />
            </div>

            {/* Rótulos: esquerda = depois (camada recortada), direita = antes (camada base) */}
            <span
              className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-opacity md:left-5 md:top-5"
              style={{ opacity: Math.max(0.25, position / 100) }}
            >
              Depois
            </span>
            <span
              className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-opacity md:right-5 md:top-5"
              style={{ opacity: Math.max(0.25, (100 - position) / 100) }}
            >
              Antes
            </span>

            {/* Linha divisória + handle */}
            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80 shadow-[0_0_8px_rgba(0,0,0,0.35)]"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            />
            <button
              type="button"
              aria-label="Arraste para comparar"
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                startDrag(e.clientX);
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                if (e.touches[0]) startDrag(e.touches[0].clientX);
              }}
              className="absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-primary shadow-lg ring-1 ring-black/10 md:h-12 md:w-12"
              style={{ left: `${position}%` }}
            >
              <ChevronLeft className="h-4 w-4" />
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Controles de caso */}
            <button
              type="button"
              onClick={prev}
              aria-label="Caso anterior"
              className="absolute bottom-3 left-3 z-20 rounded-full bg-white/15 p-2 text-white opacity-40 backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:opacity-100 md:bottom-5 md:left-5 md:p-3"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próximo caso"
              className="absolute bottom-3 right-3 z-20 rounded-full bg-white/15 p-2 text-white opacity-40 backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:opacity-100 md:bottom-5 md:right-5 md:p-3"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Legenda + indicadores */}
          <div className="mt-8 flex flex-col items-center gap-4 text-center md:mt-10">
            <div>
              <h3 className="text-lg font-semibold text-primary md:text-xl">
                {current.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                {current.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {beforeAfter.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ver caso ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-gold" : "w-2 bg-primary/25 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
