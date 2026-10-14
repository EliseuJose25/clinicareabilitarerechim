import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Reabilitar" },
      {
        name: "description",
        content: "Política de Privacidade do Reabilitar Consultório de Especialidades Odontológicas.",
      },
      { property: "og:title", content: "Política de Privacidade | Reabilitar" },
      {
        property: "og:description",
        content: "Política de Privacidade do Reabilitar Consultório de Especialidades Odontológicas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-12 pt-32 md:px-6 md:pb-20 md:pt-40">
        <Link to="/" className="text-sm font-medium text-primary hover:underline">
          ← Voltar ao início
        </Link>

        <article className="mt-8">
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Última atualização: setembro de 2026</p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold text-foreground">Quem somos</h2>
              <p className="mt-3">
                Reabilitar Consultório de Especialidades Odontológicas Ltda., CNPJ
                05.390.391/0001-11, Av. Sete de Setembro, 431, Sala 605, Erechim/RS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Dados coletados pelo site</h2>
              <p className="mt-3">
                Este site não tem formulários de cadastro e não coleta dados pessoais diretamente. Ao
                tocar em &quot;WhatsApp&quot; ou &quot;Ligar&quot;, você é levado ao aplicativo correspondente, que segue
                suas próprias políticas de privacidade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Dados informados no atendimento</h2>
              <p className="mt-3">
                As informações que você nos envia por WhatsApp ou telefone, como nome, telefone e dados
                de saúde necessários ao agendamento e ao tratamento, são usadas somente para isso. Elas
                são mantidas sob sigilo profissional, conforme o Código de Ética Odontológica e a Lei
                Geral de Proteção de Dados (Lei 13.709/2018), e não são compartilhadas com terceiros para
                fins comerciais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
              <p className="mt-3">Este site não utiliza cookies de publicidade ou de rastreamento.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Seus direitos</h2>
              <p className="mt-3">
                Você pode pedir a qualquer momento acesso, correção ou exclusão dos seus dados pelo
                WhatsApp (54) 99955-9059.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground">Alterações</h2>
              <p className="mt-3">
                Esta política pode ser atualizada, e a data da versão mais recente fica indicada no topo
                desta página.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}