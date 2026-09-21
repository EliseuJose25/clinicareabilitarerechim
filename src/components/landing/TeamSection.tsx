import { clinicConfig } from "@/config/clinicConfig";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * TeamSection - apresenta os profissionais e suas credenciais.
 */
export function TeamSection() {
  const { team } = clinicConfig;

  return (
    <section id="credenciais" className="border-b border-border/60 bg-secondary py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Nossa equipe</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Profissionais dedicados ao seu cuidado
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {team.map((professional) => (
            <article
              key={professional.name}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm"
            >
              <div className="w-full">
              <ImagePlaceholder
                  src={professional.photo}
                  alt={`Foto de ${professional.name}`}
                  aspectRatio="4 / 3"
                  className="rounded-none"
              />
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" /> {professional.cro}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">{professional.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary md:text-base">{professional.role}</p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {professional.bio}
                  </p>
                </div>

                {professional.credentials.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-auto md:pt-8">
                    {professional.credentials.map((credential) => (
                      <div
                        key={credential.title}
                        className="flex min-h-24 flex-col justify-center rounded-lg border border-border/70 bg-background p-4"
                      >
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 flex-shrink-0 text-gold" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {credential.title}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-snug text-muted-foreground">
                          {credential.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
