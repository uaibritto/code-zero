/* ============================================================
   Léxico — Conteúdo do Módulo 20
   "Iterators, generators & symbols"
   Estreia o bloco 'genstep': generator passo a passo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["iterators-generators"] = {
  title: "Iterators, generators & symbols",
  lead: "Por que o for...of funciona em arrays e strings? O que torna algo 'percorrível'? Aqui você vê o protocolo que está por trás disso — e conhece generators, funções que pausam e retomam, e symbols, os valores únicos da linguagem.",

  steps: [
    /* 1 */
    {
      label: "Iteráveis",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O protocolo de iteração",
          html: `
            <p>Você já usou <code>for...of</code> em arrays e strings. Por que funciona neles? Porque eles seguem um <strong>protocolo de iteração</strong> — um acordo: todo objeto "iterável" sabe entregar seus itens, um a um, quando pedido.</p>
            <p>Esse acordo é definido por uma chave especial, <code>Symbol.iterator</code>. Qualquer objeto que a tenha pode ser percorrido com <code>for...of</code>, spread, destructuring e companhia.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🎟️",
          title: "Modelo mental: o dispenser de senhas",
          html: `
            <p>Um iterável é como o <strong>dispenser de senhas</strong> daquele balcão. A cada "puxada", ele entrega a próxima senha e sinaliza se ainda há mais. O <code>for...of</code> só fica puxando senhas até o dispenser dizer "acabou".</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Iterators",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O objeto com next()",
          html: `
            <p>Por baixo do <code>for...of</code> existe um <strong>iterator</strong>: um objeto com um método <code>next()</code> que, a cada chamada, devolve <code>{ value, done }</code> — o próximo valor e se a sequência acabou. Rode e veja o iterator de um array na mão:</p>`
        },
        {
          type: "runnable",
          file: "iterator.js",
          autorun: true,
          code: [
            'const arr = ["a", "b"]',
            'const it = arr[Symbol.iterator]() // pega o iterator',
            '',
            'console.log(it.next()) // { value: "a", done: false }',
            'console.log(it.next()) // { value: "b", done: false }',
            'console.log(it.next()) // { value: undefined, done: true }'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Generators",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Funções que pausam",
          html: `
            <p>Criar iterators na mão é trabalhoso. Os <strong>generators</strong> fazem isso por você. Uma função com <code>function*</code> pode usar <code>yield</code> para <strong>pausar</strong> e devolver um valor; na próxima chamada, ela <strong>retoma de onde parou</strong>. E já implementa o protocolo de iteração — por isso funciona em <code>for...of</code>. Rode:</p>`
        },
        {
          type: "runnable",
          file: "generator.js",
          autorun: true,
          code: [
            'function* contador() {',
            '  yield 1',
            '  yield 2',
            '  yield 3',
            '}',
            '',
            'for (const n of contador()) {',
            '  console.log(n)',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Generator passo a passo",
      kind: "interactive",
      blocks: [
        {
          type: "genstep",
          heading: "Veja o yield pausar e retomar",
          intro: "Clique em <code>.next()</code> e acompanhe: o generator roda até um <code>yield</code>, <strong>pausa</strong> ali (linha destacada) e devolve o valor. Na próxima chamada, retoma do mesmo ponto. Quando não há mais yields, chega <code>done: true</code>.",
          file: "contador.js",
          code: [
            "function* contador() {",
            "  yield 1",
            "  yield 2",
            "  yield 3",
            "}"
          ],
          gen: function* () { yield 1; yield 2; yield 3; },
          lines: [1, 2, 3, 4]
        }
      ]
    },

    /* 5 */
    {
      label: "Sob demanda",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Sequências que nunca acabam (sem travar)",
          html: `
            <p>Como o generator só produz um valor <strong>quando você pede</strong>, dá para ter sequências infinitas sem congelar nada — ele calcula o próximo só na hora. Rode: um gerador de IDs sem fim, consumido um por vez:</p>`
        },
        {
          type: "runnable",
          file: "infinito.js",
          autorun: true,
          code: [
            'function* idsInfinitos() {',
            '  let id = 1',
            '  while (true) {',
            '    yield id++',
            '  }',
            '}',
            '',
            'const gen = idsInfinitos()',
            'console.log(gen.next().value) // 1',
            'console.log(gen.next().value) // 2',
            'console.log(gen.next().value) // 3'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Symbols",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Valores únicos por natureza",
          html: `
            <p>O <code>Symbol</code> é um primitivo cujo valor é <strong>sempre único</strong> — dois symbols nunca são iguais, mesmo com a mesma descrição. Isso os torna ideais como <strong>chaves de propriedade que nunca colidem</strong>. É por isso que o protocolo de iteração usa <code>Symbol.iterator</code>: uma chave garantidamente exclusiva. Rode:</p>`
        },
        {
          type: "runnable",
          file: "symbol.js",
          autorun: true,
          code: [
            'const a = Symbol("id")',
            'const b = Symbol("id")',
            '',
            'console.log(a === b)  // false — cada Symbol é único!',
            'console.log(typeof a) // "symbol"',
            '',
            'const obj = {}',
            'obj[a] = "valor secreto"',
            'console.log(obj[a])'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔑",
          title: "Modelo mental: a impressão digital",
          html: `
            <p>Dois symbols com a mesma descrição são como duas pessoas com o mesmo nome: parecem iguais, mas têm <strong>impressões digitais diferentes</strong>. A descrição é só um rótulo para humanos — a identidade de cada Symbol é única e intransferível.</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "quiz",
          heading: "O que cada next() devolve?",
          code: 'function* g() {\n  yield "a"\n  yield "b"\n}\nconst it = g()\nconsole.log(it.next().value)\nconsole.log(it.next().value)\nconsole.log(it.next().done)',
          question: "Quais são os três logs, nesta ordem?",
          options: [
            { label: '"a", "b", true', correct: true },
            { label: '"a", "b", false' },
            { label: '"a", "a", false' }
          ],
          okText: "<b>Certo.</b> Cada <code>next()</code> retoma o generator até o próximo <code>yield</code>: <code>\"a\"</code>, depois <code>\"b\"</code>. Na terceira chamada não há mais yields, então <code>value</code> é <code>undefined</code> e <code>done</code> é <code>true</code>.",
          noText: "<b>Um yield por next().</b> Primeiro <code>\"a\"</code>, depois <code>\"b\"</code>. Na terceira chamada, o generator já terminou — não há mais yield —, então <code>done</code> vira <code>true</code>."
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
          heading: "Desafio: um generator de intervalo",
          html: `
            <p>Escreva um generator <code>intervalo(inicio, fim)</code> que faça <code>yield</code> de cada número de <code>inicio</code> até <code>fim</code> (inclusive). Depois use <code>for...of</code> para imprimir <code>intervalo(1, 4)</code> → 1, 2, 3, 4.</p>`
        },
        {
          type: "runnable",
          file: "intervalo.js",
          code: [
            '// Crie um generator intervalo(inicio, fim) que',
            '// faz yield de cada número de inicio até fim.',
            '// Depois: for (const n of intervalo(1, 4)) console.log(n)',
            ''
          ].join("\n"),
          solution: [
            'function* intervalo(inicio, fim) {',
            '  for (let n = inicio; n <= fim; n++) {',
            '    yield n',
            '  }',
            '}',
            '',
            'for (const n of intervalo(1, 4)) {',
            '  console.log(n) // 1, 2, 3, 4',
            '}'
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
            "Um objeto é iterável se tem Symbol.iterator — é o que faz o for...of funcionar.",
            "Um iterator é um objeto com next(), que devolve { value, done } a cada chamada.",
            "Generators (function* + yield) pausam e retomam, implementando iterators automaticamente.",
            "Como produzem sob demanda, generators permitem sequências infinitas sem travar.",
            "Symbol é um primitivo sempre único — ideal como chave de propriedade que não colide.",
            "O protocolo de iteração usa Symbol.iterator justamente por ser uma chave exclusiva."
          ]
        }
      ]
    }
  ]
};
