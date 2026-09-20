# Atualizar paleta clara da Clínica Reabilitar

## Alterações
- Trocar apenas os valores do bloco `:root` em `src/styles.css` para verde-petróleo, terracota e off-white.
- Atualizar o comentário “Paleta oficial” com os novos nomes e códigos.
- Manter todos os nomes e papéis das variáveis, sem alterar o bloco `.dark` ou outras partes do arquivo.

## Validação
- Confirmar que somente o trecho solicitado mudou e que a página continua sem erros.
- Abrir a página em tamanho desktop e gerar uma captura da página inteira para conferência visual.

## Decisões de contraste
- Usar `#5A6B67` em `muted-foreground`, conforme sugerido, por manter leitura confortável no off-white.
- Manter `border` e `input` em `#E5E7EB`, evitando mudanças além das necessárias.
- Usar branco em `gold-foreground`; o terracota `#D98B5F` será conferido visualmente na página.
