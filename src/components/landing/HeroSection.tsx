import { useEffect, useRef, useState } from "react";
import { clinicConfig } from "@/config/clinicConfig";
import { Check } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * HeroVideo - vídeo decorativo em tela cheia da metade.
 * Mostra só o poster se houver prefers-reduced-motion, saveData ou falha no autoplay.
 * Pausa quando sai da tela.
 */
function HeroVideo({ mp4, webm, poster }: { mp4: string; webm: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [staticOnly, setStaticOnly] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reduce || conn?.saveData) {
      setStaticOnly(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const result = video.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => setStaticOnly(true));
      }
    };
    tryPlay();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (staticOnly) {
    return <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover [object-position:30%_50%]" />;
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover [object-position:30%_50%]"
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      {webm && <source src={webm} type="video/webm" />}
      {mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}

/**
 * HeroSection - foco em conversão direta.
 * Com hero.video: tela dividida 50/50 no desktop (texto + vídeo) e empilhada abaixo de lg.
 * Sem hero.video: comportamento anterior (imagem 4/5).
 */
export function HeroSection() {
  const { hero, cta, contact, images } = clinicConfig;
  const video = hero.video;
  const hasVideo = Boolean(video && (video.mp4 || video.webm));
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;

  const content = (
    <>
      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
        {hero.eyebrow}
      </span>
      <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
        {hero.title}
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
        {hero.subtitle}
      </p>

      <ul className="mt-6 space-y-2">
        {hero.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90"
        >
          {cta.primaryLabel}
        </a>
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Ligar agora
        </a>
      </div>
    </>
  );

  if (hasVideo && video) {
    return (
      <section
        id="top"
        className="relative overflow-hidden border-b border-border/60 bg-background pt-[calc(5rem+env(safe-area-inset-top))] lg:grid lg:min-h-[100svh] lg:grid-cols-2 lg:pt-0"
      >
        {/* Vídeo: primeiro no mobile/tablet; metade direita no desktop */}
        <div className="relative h-[42svh] min-h-[260px] w-full lg:order-2 lg:h-auto lg:min-h-0">
          <HeroVideo mp4={video.mp4} webm={video.webm} poster={video.poster} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-black/35 to-transparent lg:block"
          />
        </div>

        {/* Conteúdo: alinhado ao eixo do container max-w-6xl no desktop */}
        <div className="flex items-center px-4 py-10 md:px-6 md:py-14 lg:order-1 lg:pb-16 lg:pl-[max(2.5rem,calc((100vw-72rem)/2))] lg:pr-12 lg:pt-32">
          <div className="w-full motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-[600ms]">
            {content}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 bg-background pt-[calc(5rem+env(safe-area-inset-top))]"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:gap-16 md:px-6 md:py-20 md:items-center">
        <div>{content}</div>

        {/* Imagem principal (4/5) — renderiza placeholder se hero.image estiver vazio */}
        <div className="relative mx-auto w-full max-w-md">
          <ImagePlaceholder
            src={hero.image || images.hero}
            alt={hero.imageAlt}
            aspectRatio="4 / 5"
            priority
          />
        </div>
      </div>
    </section>
  );
}
