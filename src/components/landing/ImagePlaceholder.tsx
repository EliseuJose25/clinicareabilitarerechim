import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  /** URL da imagem. Se vazio/undefined, renderiza placeholder cinza com ícone. */
  src?: string;
  alt?: string;
  /** Aspect ratio CSS. Default "4 / 5" para manter o layout do template. */
  aspectRatio?: string;
  /** Classes extras aplicadas ao container. */
  className?: string;
  /** Formato do placeholder — retangular (default) ou circular (para avatares). */
  rounded?: "xl" | "full";
  priority?: boolean;
}

/**
 * ImagePlaceholder - renderiza a imagem quando `src` está definido,
 * ou um placeholder neutro (cinza + ícone) preservando o aspect-ratio,
 * para que o layout não quebre enquanto o cliente não envia as fotos.
 */
export function ImagePlaceholder({
  src,
  alt = "",
  aspectRatio = "4 / 5",
  className = "",
  rounded = "xl",
  priority = false,
}: ImagePlaceholderProps) {
  const radius = rounded === "full" ? "rounded-full" : "rounded-2xl";
  const base = `relative w-full overflow-hidden bg-muted ${radius} ${className}`;

  if (src) {
    return (
      <div className={base} style={{ aspectRatio }}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={`${base} flex items-center justify-center`}
      style={{ aspectRatio }}
      role="img"
      aria-label={alt || "Imagem em breve"}
    >
      <ImageIcon
        className="h-10 w-10 text-muted-foreground/50"
        strokeWidth={1.5}
      />
    </div>
  );
}