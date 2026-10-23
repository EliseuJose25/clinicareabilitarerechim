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

    // O atributo muted não é refletido no HTML renderizado no servidor;
    // sem essas propriedades o navegador bloqueia o autoplay com som.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    const onError = () => {
      console.warn("HeroVideo: falha ao carregar o vídeo", video.error?.code);
      setStaticOnly(true);
    };
    video.addEventListener("error", onError);

    let playFailed = false;

    const tryPlay = () => {
      const result = video.play();
      if (result && typeof result.catch === "function") {
        result.catch(() => {
          // Na primeira falha, aguarda uma nova tentativa no "canplay"
          // antes de cair no poster; na segunda, mostra o poster.
          if (playFailed) setStaticOnly(true);
          playFailed = true;
        });
      }
    };
    tryPlay();

    // Segunda tentativa quando o vídeo ficar pronto para tocar.
    const onCanPlay = () => tryPlay();
    video.addEventListener("canplay", onCanPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("error", onError);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  if (staticOnly) {
    return <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover [object-position:30%_50%]" />;
  }

  return (
    <video
      ref={videoRef}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover [object-position:30%_50%]"
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      poster={poster}
      aria-hidden="true"
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
      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary dark:bg-white/10 dark:text-white/80">
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
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary dark:text-white/80" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 hidden flex-wrap justify-center gap-4 md:flex md:justify-start">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90"
        >
          {cta.primaryLabel}
        </a>
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-transparent hover:text-gold hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-gold focus-visible:bg-transparent focus-visible:text-gold focus-visible:shadow-md motion-reduce:transition-none dark:border-white/25 dark:text-white dark:hover:border-gold dark:hover:text-gold dark:focus-visible:border-gold dark:focus-visible:text-gold"
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
        className="relative overflow-hidden border-b border-border/60 bg-background pt-[calc(5rem+env(safe-area-inset-top))] dark:border-transparent lg:grid lg:min-h-[max(100svh,50rem)] lg:grid-cols-2 lg:pt-0"
      >
        {/* Vídeo: primeiro no mobile/tablet; metade direita no desktop */}
        <div className="relative aspect-[16/10] max-h-[42vh] w-full lg:order-2 lg:aspect-auto lg:h-auto lg:max-h-none lg:min-h-0">
          <HeroVideo mp4={video.mp4} webm={video.webm} poster={video.poster} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-overlay/35" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-hero-scrim/35 to-transparent lg:block"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-48 bg-gradient-to-t from-hero-scrim/45 to-transparent lg:block" />
          <p className="absolute bottom-16 left-10 hidden max-w-xs font-heading text-2xl italic leading-snug text-hero-on-video lg:block xl:text-3xl">
            {hero.tagline}
          </p>
        </div>

        {/* Conteúdo: alinhado ao eixo do container max-w-6xl no desktop */}
        <div className="flex items-center px-4 pb-10 pt-8 md:px-6 md:py-14 lg:order-1 lg:items-end lg:pb-16 lg:pl-[max(2.5rem,calc((100vw-72rem)/2))] lg:pr-12 lg:pt-[36rem]">
          <div className="w-full">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary dark:bg-white/10 dark:text-white/80">
              {hero.eyebrow}
            </span>
            <h1 className="mt-5 font-heading text-[3.25rem] font-normal leading-[0.95] tracking-normal text-foreground sm:text-[6.5rem] lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-[26%] lg:z-10 lg:mt-0 lg:select-none lg:text-[7rem] xl:text-[10.35rem] 2xl:text-[12rem]">
              <span className="sr-only">{hero.title}</span>
              <span aria-hidden="true" className="block lg:hidden">
                <span className="block motion-safe:hero-title-enter">{hero.display.line1}</span>
                <span className="block italic motion-safe:hero-title-enter motion-safe:[animation-delay:120ms]">{hero.display.line2}</span>
              </span>
              <span aria-hidden="true" className="relative hidden lg:block">
                <span className="block text-foreground [clip-path:inset(0_50%_0_0)]">
                  <span className="block pl-[max(2.5rem,calc((100vw-72rem)/2))] motion-safe:hero-title-enter">{hero.display.line1}</span>
                  <span className="block pl-[40%] italic motion-safe:hero-title-enter motion-safe:[animation-delay:120ms]">{hero.display.line2}</span>
                </span>
                <span className="absolute inset-0 block text-hero-on-video [clip-path:inset(0_0_0_50%)]">
                  <span className="block pl-[max(2.5rem,calc((100vw-72rem)/2))] motion-safe:hero-title-enter">{hero.display.line1}</span>
                  <span className="block pl-[40%] italic motion-safe:hero-title-enter motion-safe:[animation-delay:120ms]">{hero.display.line2}</span>
                </span>
              </span>
            </h1>
            <div aria-hidden="true" className="mt-5 h-0.5 w-12 bg-gold lg:hidden" />
            {/* Celular baixo: frase oculta para a barra fixa não cobrir o subtítulo. */}
            <p className="mt-4 font-heading text-lg text-balance italic text-foreground/80 min-[400px]:text-xl max-md:[@media(max-height:740px)]:hidden lg:hidden">
              {hero.tagline}
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg lg:max-w-sm lg:text-sm">
              {hero.subtitle}
            </p>
            <ul className="mt-6 space-y-2 lg:hidden">
              {hero.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary dark:text-white/80" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 hidden flex-wrap justify-center gap-4 md:flex md:justify-start">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-sm transition hover:bg-gold/90">
                {cta.primaryLabel}
              </a>
              <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-transparent px-6 py-3 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-transparent hover:text-gold hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-gold focus-visible:bg-transparent focus-visible:text-gold focus-visible:shadow-md motion-reduce:transition-none dark:border-white/25 dark:text-white dark:hover:border-gold dark:hover:text-gold dark:focus-visible:border-gold dark:focus-visible:text-gold">
                Ligar agora
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60 bg-background pt-[calc(5rem+env(safe-area-inset-top))] dark:border-transparent"
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
