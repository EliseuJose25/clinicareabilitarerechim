import { clinicConfig } from "@/config/clinicConfig";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * DoctorCredentials - formação, especialidades e CRO.
 * Transmite autoridade e confiança.
 */
export function DoctorCredentials() {
  const { doctor, images } = clinicConfig;

  return (
    <section id="credenciais" className="border-b border-border/60 bg-secondary py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Coluna 1: Foto (abaixo no mobile, lateral no desktop) */}
          <div className="order-2 mx-auto w-full max-w-xs md:order-1 md:col-span-5 md:max-w-none md:h-full">
            {/* Mobile: mantém aspect-ratio 4/5. Desktop: preenche a altura da coluna de texto. */}
            <div className="md:hidden">
              <ImagePlaceholder
                src={doctor.photo || images.doctor}
                alt={doctor.photoAlt}
                aspectRatio="4 / 5"
              />
            </div>
            <div className="hidden md:block md:h-full">
              <img
                src={doctor.photo || images.doctor}
                alt={doctor.photoAlt}
                loading="lazy"
                className="h-full max-h-full w-full rounded-2xl object-cover object-top"
                style={{ objectPosition: "50% 20%" }}
              />
            </div>
          </div>

          {/* Coluna 2: Bio + credenciais */}
          <div className="order-1 md:order-2 md:col-span-7">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                <BadgeCheck className="h-3.5 w-3.5" /> {doctor.cro}
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {doctor.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-primary md:text-base">{doctor.role}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {doctor.bio}
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:gap-5">
              {doctor.credentials.map((c) => (
                <div
                  key={c.title}
                  className="flex h-full flex-col items-center gap-2 rounded-xl bg-white p-5 text-center shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-gold" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                      {c.title}
                    </span>
                  </div>
                  <p className="text-[15px] leading-snug text-primary">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
