# Pet Shop - orientacao para testes

Este projeto foi feito para ser testado manualmente e depois com testes escritos pelos alunos usando o `framework.js`.

O projeto nao traz testes prontos. A ideia e que cada aluno investigue as regras da tela, escolha comportamentos esperados e crie seus proprios testes.

## Como preparar

1. Copie o arquivo `framework.js` para a pasta `js/` deste projeto.
2. Crie um arquivo chamado `testes.js` dentro da pasta `js/`.
3. No final do `index.html`, carregue os arquivos nesta ordem:

```html
<script src="js/framework.js"></script>
<script src="js/app.js"></script>
<script src="js/testes.js"></script>
```

## Ideia geral de um teste

Um teste deve seguir tres passos:

1. Preparar o estado inicial.
2. Executar uma funcao do sistema.
3. Comparar o resultado esperado com o resultado recebido.

Exemplo apenas demonstrativo:

```js
TestFramework.test("descricao do comportamento esperado", function() {
    // preparar dados
    // chamar uma funcao do app
    // usar assertEquals, assertTrue ou assertFalse
});
```

Sugestoes de cenarios: cadastro com campos vazios, busca por texto, mudanca de status, calculo de valor, remocao de atendimento e atualizacao dos totais.
# Testes
