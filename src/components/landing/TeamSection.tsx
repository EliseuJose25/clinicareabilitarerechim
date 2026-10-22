import { clinicConfig } from "@/config/clinicConfig";
import { Award, BadgeCheck, BookOpen, CalendarCheck, GraduationCap } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Reveal } from "./Reveal";

const credentialIcons = {
  Graduação: GraduationCap,
  Especialização: Award,
  "Pós-graduação": BookOpen,
  Experiência: CalendarCheck,
} as const;

/**
 * TeamSection - apresenta os profissionais e suas credenciais.
 */
export function TeamSection() {
  const { team } = clinicConfig;
  const count: number = team.length;

  return (
    <section
      id="credenciais"
      className="border-b border-border/60 bg-secondary py-12 dark:border-transparent md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {count === 1 ? "25 anos de odontologia, com a mesma honestidade" : "Mais de 45 anos de odontologia somados"}
          </h2>
        </Reveal>

        <Reveal className={`mt-8 grid items-stretch gap-6 md:mt-12 md:gap-8 ${count === 1 ? "grid-cols-1 md:max-w-lg md:mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
          {team.map((professional) => (
            <article
              key={professional.name}
              className="flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm dark:bg-background"
            >
              {/* Escuro: foto arredondada com brilho azul suave atrás e base que se
                  funde com o cartão. No claro, foto de ponta a ponta como antes. */}
              <div className="w-full dark:bg-[radial-gradient(ellipse_at_50%_45%,rgba(74,116,201,0.3),transparent_70%)] dark:p-5 dark:md:p-6">
                <div className="relative dark:overflow-hidden dark:rounded-3xl dark:ring-1 dark:ring-white/10">
                  <ImagePlaceholder
                    src={professional.photo}
                    alt={`Foto de ${professional.name}`}
                    aspectRatio="4 / 5"
                    className="rounded-none"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-b from-transparent to-background dark:block"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary dark:bg-white/10 dark:text-white/80">
                    <BadgeCheck className="h-3.5 w-3.5" /> {professional.cro}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">{professional.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary dark:text-white/80 md:text-base">
                    {professional.role}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {professional.bio}
                  </p>
                </div>

                {professional.credentials.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-auto md:pt-8">
                    {professional.credentials.map((credential) => {
                      const CredentialIcon =
                        credentialIcons[credential.title as keyof typeof credentialIcons] ?? GraduationCap;

                      return (
                        <div
                          key={`${credential.title}-${credential.detail}`}
                          className="flex min-h-24 flex-col justify-center rounded-lg border border-border/70 bg-background p-4 dark:bg-secondary"
                        >
                          <div className="flex items-center gap-2">
                            <CredentialIcon className="h-4 w-4 flex-shrink-0 text-primary dark:text-white/80" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-white/80">
                              {credential.title}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-snug text-muted-foreground">
                            {credential.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
