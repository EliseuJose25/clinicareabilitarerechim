import { clinicConfig } from "@/config/clinicConfig";
import { cn } from "@/lib/utils";

const lightIcons: Record<string, string> = clinicConfig.treatmentImages;
const darkIcons: Record<string, string> = clinicConfig.treatmentImagesDark;

/**
 * TreatmentIcon - ícone do tratamento conforme o fundo (decorativo, alt="").
 * - surface "auto": círculo azul royal no tema claro e azul-claro no escuro
 *   (troca só por CSS, sem divergência na hidratação).
 * - surface "dark": sempre azul-claro, para fundos escuros nos dois temas
 *   (ex.: menu em tela cheia azul-marinho).
 */
export function TreatmentIcon({
  id,
  surface = "auto",
  className,
}: {
  id: string;
  surface?: "auto" | "dark";
  className?: string;
}) {
  const imgProps = {
    alt: "",
    width: 512,
    height: 512,
    loading: "lazy" as const,
    decoding: "async" as const,
  };

  if (surface === "dark") {
    return <img src={darkIcons[id]} {...imgProps} className={className} />;
  }

  return (
    <>
      <img src={lightIcons[id]} {...imgProps} className={cn(className, "dark:hidden")} />
      <img src={darkIcons[id]} {...imgProps} className={cn(className, "hidden dark:block")} />
    </>
  );
}
