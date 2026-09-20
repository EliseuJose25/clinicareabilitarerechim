# Corrigir o preenchimento do comparador

1. Alterar somente `beforeScale`, `afterScale`, `beforePosition` e `afterPosition` nos três casos de `beforeAfter`.
2. Manter todas as escalas em `1` ou mais, usando `objectPosition` para alinhar visualmente cada sorriso sem revelar o fundo do quadro.
3. Conferir os três casos no comparador em capturas de tela e validar que nenhuma borda vazia permaneça.

## Detalhes técnicos

- Preservar `object-fit: cover` no comparador.
- Não alterar textos, imagens ou demais configurações.
- Só modificar `BeforeAfterSlider.tsx` se a validação mostrar que a configuração não resolve o preenchimento.
