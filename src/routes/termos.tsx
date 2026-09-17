import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso" },
      { name: "description", content: "Termos de Uso da clínica." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermosPage,
});

function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-semibold text-primary">
        Termos de Uso
      </h1>
      <p className="mt-6 text-muted-foreground">
        Em breve. Estamos preparando o conteúdo desta página.
      </p>
      <Link
        to="/"
        className="mt-10 inline-block text-sm text-primary hover:underline"
      >
        ← Voltar para a página inicial
      </Link>
    </main>
  );
}