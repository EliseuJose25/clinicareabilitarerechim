import { clinicConfig } from "@/config/clinicConfig";

export function GallerySection() {
  const { gallery } = clinicConfig;

  return (
    <section id="estrutura" className="border-b border-border/60 bg-background py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Nossa estrutura
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            Sala 605, no centro de Erechim: é aqui que você vai ser atendido.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:grid-cols-4 md:gap-4">
          {gallery.map((image) => (
            <figure key={image.alt} className="overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[3/4] h-full w-full object-cover"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}