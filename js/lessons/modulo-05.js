/* ============================================================
   Léxico — Conteúdo do Módulo 05
   "Variáveis (let, const, var)"
   Estreia o bloco 'codetabs': comparar versões de código.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["variaveis"] = {
  title: "Variáveis: let, const e var",
  lead: "Até agora os valores apareciam soltos. Variáveis dão nomes a eles — para você guardar, reusar e, quando preciso, trocar. A escolha entre let, const e var parece detalhe, mas molda como seu código se comporta.",

  steps: [
    /* 1 */
    {
      label: "Guardar valores",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma variável é um nome para um valor",
          html: `
            <p>Escrever <code>42</code> solto no código não serve de muita coisa — você não consegue se referir a esse valor depois. Uma <strong>variável</strong> resolve isso: ela dá um <strong>nome</strong> a um valor, para você guardá-lo e reusá-lo quantas vezes quiser.</p>
            <p>No JavaScript, você cria variáveis com três palavras-chave: <code>const</code>, <code>let</code> e <code>var</code>. Elas fazem coisas parecidas, mas com regras diferentes — e saber qual usar é a primeira decisão de qualidade que você toma ao escrever código.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: a caixa com nome",
          html: `
            <p>Pense numa caixa com uma etiqueta escrita por fora. A etiqueta é o <strong>nome</strong> da variável; o que está dentro é o <strong>valor</strong>. Quando você escreve o nome no código, o JavaScript vai até a caixa e usa o que achar lá dentro.</p>
            <p>A diferença entre <code>const</code>, <code>let</code> e <code>var</code> é, basicamente, <strong>o que você pode fazer com essa caixa depois de criá-la</strong>.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "const: o padrão",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Comece sempre por const",
          html: `
            <p>A recomendação moderna é simples: <strong>use <code>const</code> por padrão</strong>. Ele cria uma variável cujo nome aponta para um valor que <strong>não será reatribuído</strong>. A maior parte das variáveis de um programa é assim — nasce com um valor e fica com ele.</p>
            <p>Usar <code>const</code> comunica intenção: quem lê sabe, só de bater o olho, que aquele nome não vai mudar de valor. Rode:</p>`
        },
        {
          type: "runnable",
          file: "const.js",
          autorun: true,
          code: [
            'const nome = "Ana"',
            'const pi = 3.14',
            '',
            'console.log(nome)',
            'console.log(pi)'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "let: quando muda",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "let para valores que mudam",
          html: `
            <p>Quando um valor precisa <strong>mudar ao longo do tempo</strong> — um contador, um placar, um total que vai sendo somado — use <code>let</code>. Ele cria uma variável que pode ser <strong>reatribuída</strong> quantas vezes for necessário.</p>
            <p>Repare que reatribuir não é criar de novo: é trocar o conteúdo da mesma caixa. Rode e acompanhe o contador mudar:</p>`
        },
        {
          type: "runnable",
          file: "let.js",
          autorun: true,
          code: [
            'let contador = 0',
            'contador = contador + 1',
            'contador = contador + 1',
            '',
            'console.log(contador)'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "predict",
          heading: "E se eu tentar mudar um const?",
          code: "const taxa = 0.1\ntaxa = 0.2",
          question: "O que acontece ao rodar este código?",
          options: [
            { label: "TypeError: Assignment to constant variable.", correct: true },
            { label: "taxa passa a valer 0.2, sem problema." },
            { label: "Nada: a segunda linha é simplesmente ignorada." }
          ],
          okText: "<b>Exato.</b> <code>const</code> proíbe reatribuição. Ao tentar, a engine lança um <code>TypeError</code> e para ali. Se você sabe que o valor vai mudar, use <code>let</code> desde o início.",
          noText: "<b>Não é bem assim.</b> <code>const</code> não deixa reatribuir: a engine lança um <code>TypeError</code> e interrompe a execução. Para valores que mudam, o certo é <code>let</code>. (Teste no editor do passo anterior, se quiser ver o erro.)"
        }
      ]
    },

    /* 5 */
    {
      label: "Escopo de bloco",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Onde a variável existe",
          html: `
            <p>Toda variável tem um <strong>escopo</strong>: a região do código onde ela existe e pode ser usada. Com <code>let</code> e <code>const</code>, esse escopo é o <strong>bloco</strong> — o trecho entre chaves <code>{ }</code> onde ela foi declarada.</p>
            <p>Fora daquele bloco, é como se a variável nunca tivesse existido. Rode e veja: a primeira linha funciona, a última dá erro.</p>`
        },
        {
          type: "runnable",
          file: "escopo.js",
          autorun: true,
          code: [
            'if (true) {',
            '  const dentro = "só existo aqui"',
            '  console.log(dentro)',
            '}',
            '',
            'console.log(dentro) // fora do bloco: erro'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "var e hoisting",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "var: o jeito antigo (e suas surpresas)",
          html: `
            <p><code>var</code> é a forma original de declarar variáveis, de antes de 2015. Ela ainda funciona, mas tem comportamentos que pegam iniciantes de surpresa — por isso hoje preferimos <code>const</code> e <code>let</code>.</p>
            <p>O principal é o <strong>hoisting</strong>: a engine "eleva" as declarações <code>var</code> para o topo antes de executar. Use as abas para ver o que você escreve e o que a engine realmente faz:</p>`
        },
        {
          type: "codetabs",
          caption: "O mesmo código, dois pontos de vista:",
          tabs: [
            {
              label: "Como você escreve",
              file: "hoisting.js",
              code: [
                'console.log(nome)',
                'var nome = "Ana"',
                'console.log(nome)'
              ].join("\n"),
              note: "Instinto de iniciante: a primeira linha deveria dar erro, porque <code>nome</code> ainda não foi criada. Mas não dá…"
            },
            {
              label: "O que a engine faz",
              file: "hoisting.js",
              code: [
                'var nome            // declaração "elevada" ao topo',
                'console.log(nome)   // undefined (existe, mas sem valor)',
                'nome = "Ana"        // só agora recebe o valor',
                'console.log(nome)   // "Ana"'
              ].join("\n"),
              note: "A engine separa a <strong>declaração</strong> (que sobe) da <strong>atribuição</strong> (que fica no lugar). Por isso a linha 1 imprime <code>undefined</code> em vez de quebrar. Com <code>let</code> e <code>const</code> isso vira um erro claro — o que é mais seguro e previsível."
            }
          ]
        }
      ]
    },

    /* 7 */
    {
      label: "Qual usar?",
      kind: "exercise",
      blocks: [
        {
          type: "classify",
          heading: "const ou let?",
          question: "Para cada situação, decida: o valor nunca muda (const) ou vai mudar ao longo do programa (let)?",
          buckets: [
            { id: "const", label: "const (não muda)", short: "const" },
            { id: "let", label: "let (vai mudar)", short: "let" }
          ],
          items: [
            { text: "O valor de PI (3.14159…)", bucket: "const" },
            { text: "Um contador de cliques", bucket: "let" },
            { text: "O e-mail de cadastro do usuário", bucket: "const" },
            { text: "O total somado dentro de um loop", bucket: "let" },
            { text: "A URL base da API", bucket: "const" },
            { text: "O slide atual de um carrossel", bucket: "let" }
          ],
          okText: "A regra prática: comece sempre com <code>const</code>; só troque para <code>let</code> quando perceber que vai mesmo reatribuir aquele valor. Isso deixa o código mais previsível.",
          noText: "Dica: se o valor é fixo e serve de referência (PI, um e-mail, uma URL), use <code>const</code>. Se ele é atualizado durante a execução (contador, total, posição), use <code>let</code>."
        }
      ]
    },

    /* 8 */
    {
      label: "Sua vez",
      kind: "challenge",
      blocks: [
        {
          type: "prose",
          heading: "Desafio: conserte o contador",
          html: `
            <p>O código abaixo tenta contar de 1 a 3, mas quebra na segunda linha de atribuição. Descubra por quê e conserte para que ele imprima <code>1</code>, <code>2</code> e <code>3</code>. (Dica: olhe a palavra-chave da declaração.)</p>`
        },
        {
          type: "runnable",
          file: "conserte.js",
          autorun: true,
          code: [
            '// Conserte para imprimir 1, 2 e 3',
            'const n = 1',
            'console.log(n)',
            'n = 2',
            'console.log(n)',
            'n = 3',
            'console.log(n)'
          ].join("\n"),
          solution: [
            '// n precisa mudar, então usamos let',
            'let n = 1',
            'console.log(n)',
            'n = 2',
            'console.log(n)',
            'n = 3',
            'console.log(n)'
          ].join("\n")
        }
      ]
    },

    /* 9 */
    {
      label: "Resumo",
      kind: "summary",
      blocks: [
        {
          type: "summary",
          heading: "O que você aprendeu",
          items: [
            "Uma variável dá nome a um valor, para guardá-lo e reusá-lo.",
            "const é o padrão: cria um nome que não pode ser reatribuído.",
            "let é para valores que mudam ao longo do tempo (contadores, totais, estado).",
            "Reatribuir um const lança TypeError — a engine impede e para.",
            "let e const têm escopo de bloco: só existem entre as chaves onde nasceram.",
            "var é o jeito antigo e sofre hoisting (declaração elevada ao topo); prefira const e let."
          ]
        }
      ]
    }
  ]
};
