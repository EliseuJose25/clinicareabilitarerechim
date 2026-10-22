import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/** Chave e valor guardados no localStorage (lidos também pelo script em __root.tsx). */
export const THEME_STORAGE_KEY = "tema";
export const THEME_DARK_VALUE = "escuro";

/**
 * Script inline do <head>: aplica a classe "dark" antes da primeira pintura
 * quando a escolha guardada é o escuro. Sem escolha guardada, fica no claro
 * (não segue a preferência do sistema).
 */
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="${THEME_DARK_VALUE}")document.documentElement.classList.add("dark")}catch(e){}`;

/**
 * ThemeToggle - alterna a classe "dark" em <html> e guarda a escolha.
 * Os ícones trocam só por CSS (dark:), então não há divergência na hidratação.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? THEME_DARK_VALUE : "claro");
    } catch {
      // Sem acesso ao armazenamento (ex.: modo privado): vale só nesta visita.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar tema claro/escuro"
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 motion-reduce:transition-none",
        className,
      )}
    >
      <Moon aria-hidden="true" className="h-5 w-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden h-5 w-5 dark:block" />
    </button>
  );
}
