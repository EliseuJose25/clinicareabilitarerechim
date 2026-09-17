Ajustar o componente `src/components/landing/BeforeAfterSlider.tsx` para equilibrar o visual do comparador:

1. **Altura máxima responsiva**
   - Container: `h-[300px] md:h-[450px]` (max 300px mobile, 450px desktop).
   - Remover `h-[60vh]`, `min-h-[420px]` e `md:min-h-[600px]` para evitar tela dominada.

2. **Preenchimento total sem faixas**
   - Trocar `object-contain` por `object-cover` nas duas imagens (camada base Antes e camada superior Depois).
   - Manter `object-center` para focar o centro do sorriso.

3. **Respiro interno**
   - Adicionar `p-2 md:p-4` no container interno do slider para que a imagem não fique colada nas bordas.
   - Ajustar o cálculo do clique/drag para considerar o padding interno (ou aplicar o padding em um wrapper e manter o container de referência sem padding).

4. **Ajustes secundários**
   - Garantir que `rounded-2xl`, sombra e controles continuem posicionados corretamente sobre a nova área.
   - Verificar se a legenda e os indicadores mantêm `mt-8 md:mt-10` para respiro abaixo da imagem.

Arquivo único a ser alterado: `src/components/landing/BeforeAfterSlider.tsx`.