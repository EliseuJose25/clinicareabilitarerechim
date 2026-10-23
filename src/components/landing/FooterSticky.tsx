import { clinicConfig } from "@/config/clinicConfig";
import { MessageCircle, Phone } from "lucide-react";

/**
 * FooterSticky - barra flutuante inferior visível APENAS em mobile.
 * Botões de conversão (WhatsApp + Ligação).
 */
export function FooterSticky() {
  const { contact } = clinicConfig;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappMessage,
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 shadow-lg backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-semibold text-gold-foreground shadow-sm"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-transparent px-4 py-3 text-sm font-semibold text-primary transition duration-200 hover:-translate-y-0.5 hover:border-gold hover:bg-transparent hover:text-gold hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-gold focus-visible:bg-transparent focus-visible:text-gold focus-visible:shadow-md motion-reduce:transition-none dark:border-white/25 dark:text-white dark:hover:border-gold dark:hover:text-gold dark:focus-visible:border-gold dark:focus-visible:text-gold"
        >
          <Phone className="h-4 w-4" /> Ligar
        </a>
      </div>
    </div>
  );
}
