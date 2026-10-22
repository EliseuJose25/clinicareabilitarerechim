import { useId, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { clinicConfig } from "@/config/clinicConfig";
import { TreatmentIcon } from "@/components/landing/TreatmentIcon";

export function TreatmentCards({
  variant,
  onSelect,
}: {
  variant: "menu" | "dropdown" | "menu-compact";
  onSelect?: () => void;
}) {
  const titleId = useId();

  /**
   * Garante a rolagem até a seção quando o hash do tratamento já é o atual
   * (o navegador não dispara `hashchange` nesse caso).
   */
  const handleTreatmentClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (window.location.hash !== `#tratamento-${id}`) return;
    event.preventDefault();
    window.setTimeout(() => {
      document
        .getElementById("tratamentos")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  };

  if (variant === "dropdown") {
    return (
      <section data-variant={variant} aria-labelledby={titleId}>
        <h2 id={titleId} className="sr-only">
          Serviços
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {clinicConfig.treatments.map((treatment) => {
            const treatmentHref = `/#tratamento-${treatment.id}`;
            return (
              <a
                key={treatment.id}
                href={treatmentHref}
                onClick={(event) => {
                  onSelect?.();
                  handleTreatmentClick(event, treatment.id);
                }}
                className="group flex w-full min-w-0 flex-col items-stretch gap-2 rounded-3xl p-2 transition-colors duration-200 hover:bg-hero-overlay hover:text-hero-on-video focus-visible:bg-hero-overlay focus-visible:text-hero-on-video focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none"
              >
                <span className="flex w-full items-center justify-center">
                  <span className="relative inline-flex">
                    <TreatmentIcon
                      id={treatment.id}
                      surface="auto"
                      className="h-16 w-16 object-contain transition-transform duration-200 motion-reduce:transition-none group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                    />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="absolute -bottom-1 -right-1 size-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </span>
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

  if (variant === "menu-compact") {
    return (
      <section data-variant={variant} aria-labelledby={titleId}>
        <h2 id={titleId} className="sr-only">
          Serviços
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {clinicConfig.treatments.map((treatment, index) => {
            const whatsappUrl = `https://wa.me/${clinicConfig.contact.whatsapp}?text=${encodeURIComponent(
              treatment.message,
            )}`;
            const isLast = index === clinicConfig.treatments.length - 1;
            return (
              <SheetClose asChild key={treatment.id}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex min-h-16 min-w-0 items-center gap-3 rounded-xl border border-hero-on-video/15 bg-transparent p-2 text-base font-semibold text-hero-on-video transition-colors duration-200 hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold motion-reduce:transition-none ${isLast ? "col-span-2" : ""}`}
                >
                  <span className="relative inline-flex shrink-0">
                    <TreatmentIcon
                      id={treatment.id}
                      surface="dark"
                      className="h-12 w-12 object-contain transition-transform duration-200 motion-reduce:transition-none group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
                    />
                  </span>
                  <span className="min-w-0 break-words text-base font-semibold">
                    {treatment.name}
                  </span>
                </a>
              </SheetClose>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section data-variant={variant} aria-labelledby={titleId}>
      <h2 id={titleId} className="menu-treatments-title mb-4 text-xl text-hero-on-video">
        Tratamentos
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {clinicConfig.treatments.map((treatment, index) => {
          const treatmentHref = `/#tratamento-${treatment.id}`;
          const isLast = index === clinicConfig.treatments.length - 1;
          return (
            <SheetClose asChild key={treatment.id}>
              <Button
                asChild
                variant="ghost"
                className={`menu-stagger menu-treatment group relative h-auto min-h-28 min-w-0 flex-col items-stretch justify-start gap-3 whitespace-normal rounded-2xl border border-hero-on-video/15 bg-transparent p-2 text-base font-semibold text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-gold lg:min-h-40 lg:rounded-lg lg:p-3 ${isLast ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <a
                  href={treatmentHref}
                  onClick={(event) => handleTreatmentClick(event, treatment.id)}
                  className="flex w-full flex-col items-stretch gap-3"
                >
                  <span className="flex w-full items-center justify-center">
                    <span className="relative inline-flex">
                      <TreatmentIcon
                        id={treatment.id}
                        surface="dark"
                        className="h-16 w-16 object-contain transition-transform duration-200 motion-reduce:transition-none group-hover:scale-[1.02] group-focus-visible:scale-[1.02] lg:h-20 lg:w-20"
                      />
                      <ArrowUpRight
                        aria-hidden="true"
                        className="menu-treatment-arrow absolute -bottom-1 -right-1 size-5 text-hero-on-video opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-70"
                      />
                    </span>
                  </span>
                  <span className="w-full break-words text-base font-semibold">
                    {treatment.name}
                  </span>
                </a>
              </Button>
            </SheetClose>
          );
        })}
      </div>
    </section>
  );
}
