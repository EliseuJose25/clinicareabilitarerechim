import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinicConfig } from "@/config/clinicConfig";

export function TreatmentCards({
  variant,
  onSelect,
}: {
  variant: "menu" | "dropdown";
  onSelect?: () => void;
}) {
  const titleId = useId();

  if (variant === "dropdown") {
    return (
      <section data-variant={variant} aria-labelledby={titleId}>
        <h2 id={titleId} className="sr-only">
          Serviços
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {clinicConfig.treatments.map((treatment) => {
            const imageSrc =
              clinicConfig.treatmentImages[
                treatment.image as keyof typeof clinicConfig.treatmentImages
              ];
            const whatsappUrl = `https://wa.me/${clinicConfig.contact.whatsapp}?text=${encodeURIComponent(
              treatment.message,
            )}`;
            return (
              <a
                key={treatment.id}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onSelect}
                className="group flex w-full min-w-0 flex-col items-stretch gap-2 rounded-3xl p-2 transition-colors duration-200 hover:bg-hero-overlay hover:text-hero-on-video focus-visible:bg-hero-overlay focus-visible:text-hero-on-video focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none"
              >
                <span className="relative block w-full overflow-hidden rounded-2xl bg-[#01102F] aspect-square">
                  <img
                    src={imageSrc}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-200 motion-reduce:transition-none group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                  />
                  <ArrowUpRight
                    aria-hidden="true"
                    className="absolute bottom-2 right-2 size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                </span>
                <span className="w-full break-words text-center text-sm font-medium">
                  {treatment.name}
                </span>
              </a>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section data-variant={variant} aria-labelledby={titleId}>
      <h2 id={titleId} className="mb-4 text-xl text-hero-on-video">
        Tratamentos
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {clinicConfig.treatments.map((treatment, index) => {
          const imageSrc =
            clinicConfig.treatmentImages[
              treatment.image as keyof typeof clinicConfig.treatmentImages
            ];
          const whatsappUrl = `https://wa.me/${clinicConfig.contact.whatsapp}?text=${encodeURIComponent(
            treatment.message,
          )}`;
          const isLast = index === clinicConfig.treatments.length - 1;
          return (
            <Button
              key={treatment.id}
              asChild
              variant="ghost"
              className={`menu-stagger menu-treatment group relative h-auto min-h-28 min-w-0 flex-col items-stretch justify-start gap-3 whitespace-normal rounded-2xl border border-hero-on-video/15 bg-transparent p-2 text-base font-semibold text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-gold lg:min-h-40 lg:rounded-lg lg:p-3 ${isLast ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full flex-col items-stretch gap-3"
              >
                <span className="relative block w-full overflow-hidden rounded-xl bg-[#01102F] aspect-square">
                  <img
                    src={imageSrc}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-200 motion-reduce:transition-none group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                  />
                  <ArrowUpRight
                    aria-hidden="true"
                    className="menu-treatment-arrow absolute right-2 top-2 size-5 text-hero-on-video opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-70"
                  />
                </span>
                <span className="w-full break-words text-base font-semibold">
                  {treatment.name}
                </span>
              </a>
            </Button>
          );
        })}
      </div>
    </section>
  );
}
