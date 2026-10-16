import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinicConfig } from "@/config/clinicConfig";
import {
  ToothBracesIcon,
  ToothImplantIcon,
  ToothCrownIcon,
  ToothCheckIcon,
  ToothSparkleIcon,
} from "@/components/icons/ToothIcons";

const treatmentIcons = [ToothCheckIcon, ToothImplantIcon, ToothCrownIcon, ToothBracesIcon, ToothSparkleIcon];

export function TreatmentCards({ variant }: { variant: "menu" }) {
  return (
    <section data-variant={variant} aria-labelledby="menu-treatments-title">
      <h2 id="menu-treatments-title" className="mb-4 text-xl text-hero-on-video">Tratamentos</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
        {clinicConfig.treatments.map((treatment, index) => {
          const TreatmentIcon = treatmentIcons[index];
          return (
            <Button
              key={treatment.id}
              asChild
              variant="ghost"
              className={`menu-stagger menu-treatment group relative h-auto min-h-28 min-w-0 flex-col items-start justify-center gap-3 whitespace-normal rounded-2xl border border-hero-on-video/15 bg-hero-on-video/5 p-4 text-base font-semibold text-hero-on-video hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-gold [&_svg]:size-10 lg:min-h-40 lg:items-center lg:rounded-lg lg:px-3 lg:text-center lg:[&_svg]:size-14 ${index === clinicConfig.treatments.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <a href={`https://wa.me/${clinicConfig.contact.whatsapp}?text=${encodeURIComponent(treatment.message)}`} target="_blank" rel="noopener noreferrer">
                <TreatmentIcon aria-hidden="true" />
                <span className="w-full break-words">{treatment.name}</span>
                <ArrowUpRight aria-hidden="true" className="menu-treatment-arrow absolute right-3 top-3 size-4! opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </a>
            </Button>
          );
        })}
      </div>
    </section>
  );
}