/* ============================================================
   Léxico — Conteúdo do Módulo 10
   "Arrays"
   Estreia o bloco 'arrayop': laboratório de map/filter/reduce/find.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["arrays"] = {
  title: "Arrays",
  lead: "Quase todo programa lida com listas: tarefas, produtos, mensagens, resultados. O array é a estrutura que guarda uma coleção ordenada de valores — e os métodos modernos de array são onde o JavaScript fica elegante de verdade.",

  steps: [
    /* 1 */
    {
      label: "O que é um array",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma lista ordenada de valores",
          html: `
            <p>Um <strong>array</strong> guarda vários valores numa única variável, em ordem. Você o cria com colchetes <code>[ ]</code> e acessa cada item pela sua <strong>posição</strong> — o índice. O detalhe que pega todo iniciante: a contagem <strong>começa no zero</strong>. O primeiro item é <code>[0]</code>, o segundo é <code>[1]</code>, e assim por diante.</p>`
        },
        {
          type: "runnable",
          file: "array.js",
          autorun: true,
          code: [
            'const frutas = ["maçã", "banana", "uva"]',
            '',
            'console.log(frutas[0])     // "maçã" (índice 0)',
            'console.log(frutas[2])     // "uva"',
            'console.log(frutas.length) // 3 (quantos itens)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: a fileira numerada",
          html: `
            <p>Pense numa fileira de armários numerados a partir do <strong>0</strong>. O índice é o número do armário; o valor é o que está guardado dentro. <code>frutas[2]</code> quer dizer "abra o armário de número 2".</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Acessar e modificar",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Mexendo na lista",
          html: `
            <p>Arrays são modificáveis. Você troca um item pelo índice, adiciona no fim com <code>push</code> e remove do fim com <code>pop</code>. Rode e acompanhe a lista mudar:</p>`
        },
        {
          type: "runnable",
          file: "modificar.js",
          autorun: true,
          code: [
            'const lista = ["a", "b"]',
            '',
            'lista.push("c")    // adiciona no fim',
            'console.log(lista) // ["a","b","c"]',
            '',
            'lista[0] = "x"     // troca pelo índice',
            'console.log(lista) // ["x","b","c"]',
            '',
            'const removido = lista.pop() // remove do fim',
            'console.log(removido, lista) // "c" ["x","b"]'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Percorrer",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Passando por cada item",
          html: `
            <p>Você já conhece o <code>for...of</code>. Arrays trazem também o <code>forEach</code>, um método que recebe um <strong>callback</strong> e o executa para cada item — exatamente a ideia de "função como valor" do módulo anterior. Rode e compare os dois:</p>`
        },
        {
          type: "runnable",
          file: "percorrer.js",
          autorun: true,
          code: [
            'const nums = [10, 20, 30]',
            '',
            '// for...of: direto e simples',
            'for (const n of nums) {',
            '  console.log(n)',
            '}',
            '',
            '// forEach: um método que recebe um callback',
            'nums.forEach(n => console.log("item:", n))'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Laboratório de arrays",
      kind: "interactive",
      blocks: [
        {
          type: "arrayop",
          heading: "map, filter, reduce e find em ação",
          intro: "Existem métodos que transformam uma lista inteira sem você escrever o loop na mão. Clique em cada operação e veja o que acontece com a mesma lista de entrada — repare na diferença entre gerar uma nova lista e produzir um único valor.",
          input: [1, 2, 3, 4, 5],
          ops: [
            { label: "map(n => n * 2)", kind: "map", fn: "n => n * 2" },
            { label: "filter(n => n % 2 === 0)", kind: "filter", fn: "n => n % 2 === 0" },
            { label: "reduce((a, b) => a + b)", kind: "reduce", fn: "(a, b) => a + b", init: 0 },
            { label: "find(n => n > 3)", kind: "find", fn: "n => n > 3" }
          ]
        }
      ]
    },

    /* 5 */
    {
      label: "map",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "map: transformar cada item",
          html: `
            <p>O <code>map</code> aplica uma função a cada item e devolve um <strong>novo array</strong>, do mesmo tamanho, com os resultados. O array original <strong>não é alterado</strong> — map cria uma lista nova. Rode:</p>`
        },
        {
          type: "runnable",
          file: "map.js",
          autorun: true,
          code: [
            'const nums = [1, 2, 3, 4]',
            '',
            'const dobrados = nums.map(n => n * 2)',
            '',
            'console.log(dobrados) // [2,4,6,8]',
            'console.log(nums)     // [1,2,3,4] — intacto'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "filter",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "filter: manter só o que interessa",
          html: `
            <p>O <code>filter</code> também devolve um novo array, mas com <strong>apenas os itens que passam num teste</strong> — o callback retorna <code>true</code> para manter, <code>false</code> para descartar. O resultado pode ser menor que o original. Rode:</p>`
        },
        {
          type: "runnable",
          file: "filter.js",
          autorun: true,
          code: [
            'const nums = [1, 2, 3, 4, 5, 6]',
            '',
            'const pares = nums.filter(n => n % 2 === 0)',
            '',
            'console.log(pares) // [2,4,6]'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🔎",
          title: "find: o primo próximo do filter",
          html: `
            <p>Precisa de apenas <strong>um</strong> item, não de uma lista? O <code>find</code> funciona como o <code>filter</code>, mas devolve só o <strong>primeiro</strong> item que passa no teste (ou <code>undefined</code> se nenhum passar).</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "reduce",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "reduce: tudo num só valor",
          html: `
            <p>O <code>reduce</code> é o mais poderoso — e o que mais assusta. Ele <strong>combina todos os itens num único valor</strong>. O callback recebe dois argumentos: o <strong>acumulador</strong> (o resultado parcial) e o <strong>item atual</strong>. O segundo argumento do reduce é o <strong>valor inicial</strong> do acumulador. Rode:</p>`
        },
        {
          type: "runnable",
          file: "reduce.js",
          autorun: true,
          code: [
            'const nums = [1, 2, 3, 4]',
            '',
            'const soma = nums.reduce((acumulador, atual) => {',
            '  return acumulador + atual',
            '}, 0) // 0 é o valor inicial',
            '',
            'console.log(soma) // 10'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: a bola de neve",
          html: `
            <p>Imagine uma bola de neve rolando montanha abaixo. Ela começa pequena (o valor inicial) e, a cada item que encontra, incorpora um pouco e cresce. No fim da descida, você tem uma única bola — o valor acumulado. Esse é o <code>reduce</code>.</p>`
        }
      ]
    },

    /* 8 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "predict",
          heading: "Encadeando métodos",
          code: 'const nums = [1, 2, 3, 4]\nconst r = nums.filter(n => n > 1).map(n => n * 10)\nconsole.log(r)',
          question: "Como cada método devolve um array, dá para encadeá-los. O que é impresso?",
          options: [
            { label: "[20, 30, 40]", correct: true },
            { label: "[10, 20, 30, 40]" },
            { label: "[2, 3, 4]" }
          ],
          okText: "<b>Perfeito.</b> Lê-se da esquerda para a direita: <code>filter(n => n > 1)</code> mantém <code>[2,3,4]</code>; sobre esse resultado, <code>map(n => n * 10)</code> gera <code>[20,30,40]</code>. Encadear map e filter é uma das coisas mais elegantes do JavaScript.",
          noText: "<b>Siga a ordem.</b> Primeiro o <code>filter(n => n > 1)</code> descarta o 1, sobrando <code>[2,3,4]</code>. Depois o <code>map(n => n * 10)</code> multiplica cada um por 10: <code>[20,30,40]</code>."
        }
      ]
    },

    /* 9 */
    {
      label: "Sua vez",
      kind: "challenge",
      blocks: [
        {
          type: "prose",
          heading: "Desafio: a soma da lista",
          html: `
            <p>Dado o array de números, imprima a <strong>soma</strong> de todos eles usando <code>reduce</code>. Lembre do valor inicial do acumulador.</p>`
        },
        {
          type: "runnable",
          file: "soma.js",
          code: [
            'const nums = [5, 10, 15, 20]',
            '',
            '// Imprima a soma de todos (use reduce)',
            ''
          ].join("\n"),
          solution: [
            'const nums = [5, 10, 15, 20]',
            '',
            'const soma = nums.reduce((acc, n) => acc + n, 0)',
            'console.log(soma) // 50'
          ].join("\n")
        }
      ]
    },

    /* 10 */
    {
      label: "Resumo",
      kind: "summary",
      blocks: [
        {
          type: "summary",
          heading: "O que você aprendeu",
          items: [
            "Um array é uma lista ordenada de valores, com índices que começam no 0.",
            "push adiciona no fim, pop remove do fim, e você troca itens pelo índice.",
            "forEach executa um callback para cada item (função como valor).",
            "map transforma cada item e devolve um novo array do mesmo tamanho.",
            "filter devolve um novo array só com os itens que passam no teste; find devolve o primeiro.",
            "reduce combina todos os itens num único valor, partindo de um valor inicial."
          ]
        }
      ]
    }
  ]
};
