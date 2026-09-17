import { clinicConfig } from "@/config/clinicConfig";

/**
 * PalatisIntegration - Placeholder de Funcionalidade
 * --------------------------------------------------
 * Slot reservado para o widget "Smart Check-in" da plataforma Palatis AI.
 *
 * ⚠️  Não está ativo. Renderizado como `hidden` para manter o espaço
 *     no DOM sem impacto visual.
 *
 * 🔌 PONTO DE INTEGRAÇÃO FUTURO:
 *   1. Substituir o conteúdo do <div> abaixo pelo embed/script do Palatis.
 *   2. Ativar via `clinicConfig.palatis.enabled = true`.
 *   3. `clinicConfig.palatis.widgetId` identifica o cliente.
 *
 * Exemplo de uso futuro:
 *   <script src="https://cdn.palatis.ai/widget.js"
 *           data-widget-id={widgetId}></script>
 */
export function PalatisIntegration() {
  const { enabled, widgetId } = clinicConfig.palatis;

  return (
    <div
      id="palatis-smart-checkin"
      data-palatis-widget-id={widgetId}
      hidden={!enabled}
      aria-hidden={!enabled}
    >
      {/* TODO: Conectar aqui a lógica do Palatis AI (Smart Check-in). */}
    </div>
  );
}
