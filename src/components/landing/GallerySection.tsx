import { clinicConfig } from "@/config/clinicConfig";

export function GallerySection() {
  const { gallery } = clinicConfig;

  return (
    <section id="estrutura" className="border-b border-border/60 bg-background py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Nossa estrutura</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Um espaço pensado para o seu conforto, no centro de Erechim
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
          {gallery.map((image) => (
            <figure key={image.alt} className="overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] h-full w-full object-cover"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}