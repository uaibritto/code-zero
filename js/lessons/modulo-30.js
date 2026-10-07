/* ============================================================
   Léxico — Conteúdo do Módulo 30
   "Generics"
   Estreia o bloco 'genericlab': o argumento infere T e o
   TypeScript carimba a assinatura concreta (T → number, string…).
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["generics"] = {
  title: "Generics",
  lead: "Como escrever uma função que funciona com qualquer tipo, sem perder a informação de qual tipo é? Essa é a pergunta que os generics respondem. Eles são variáveis — mas para tipos, não para valores.",

  steps: [
    /* 1 */
    {
      label: "O problema",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A escolha ruim: duplicar ou perder tipos",
          html: `
            <p>Imagine uma função que devolve o primeiro item de uma lista. Em JavaScript ela funciona com qualquer coisa:</p>`
        },
        {
          type: "runnable",
          file: "primeiro.js",
          autorun: true,
          code: [
            'function primeiro(lista) {',
            '  return lista[0]',
            '}',
            '',
            'console.log(primeiro([1, 2, 3]))',
            'console.log(primeiro(["a", "b", "c"]))'
          ].join("\n")
        },
        {
          type: "prose",
          html: `
            <p>Mas em TypeScript, que tipo você anota? Se usar <code>any[]</code>, o retorno vira <code>any</code> e você <strong>perde</strong> toda a segurança. Se escrever uma versão para <code>number[]</code> e outra para <code>string[]</code>, você <strong>duplica</strong> código sem fim. Os generics resolvem os dois problemas de uma vez.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🏷️",
          title: "Modelo mental: a etiqueta em branco",
          html: `
            <p><code>T</code> é uma etiqueta em branco que você cola na função. No momento da chamada, o TypeScript lê o argumento e <strong>preenche a etiqueta</strong> com o tipo real. A mesma função serve para todos — mas cada chamada sabe exatamente com que tipo está lidando.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "T preenchido",
      kind: "interactive",
      blocks: [
        {
          type: "genericlab",
          heading: "Veja o TypeScript inferir T",
          intro: "A função é genérica: <code>T</code> é um espaço reservado. Clique num argumento e veja o TypeScript descobrir o tipo de <code>T</code> e carimbar a assinatura concreta daquela chamada.",
          signature: "function primeiro<T>(lista: T[]): T",
          concrete: "function primeiro(lista: §[]): §",
          cases: [
            { arg: "[1, 2, 3]", bind: "number" },
            { arg: '["a", "b", "c"]', bind: "string" },
            { arg: "[true, false]", bind: "boolean" },
            { arg: "[{ id: 1 }]", bind: "{ id: number }" }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Funções genéricas",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A sintaxe <T>",
          html: `
            <p>Você declara o parâmetro de tipo entre <code>&lt;&gt;</code> logo após o nome da função. A partir daí, <code>T</code> pode ser usado como qualquer outro tipo nos parâmetros e no retorno. A ligação entre a entrada e a saída é o que importa: <strong>o que entra como <code>T</code> sai como <code>T</code></strong>.</p>`
        },
        {
          type: "code",
          file: "generica.ts",
          code: [
            'function identidade<T>(valor: T): T {',
            '  return valor',
            '}',
            '',
            'const a = identidade(42)        // a: number',
            'const b = identidade("texto")   // b: string',
            'const c = identidade(true)      // c: boolean'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Tipos genéricos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Interfaces e tipos também parametrizam",
          html: `
            <p>Generics não vivem só em funções. Uma interface ou <code>type</code> pode receber um parâmetro de tipo — é assim que coleções reutilizáveis funcionam. Na verdade, você já usou um generic sem saber: <code>Array&lt;T&gt;</code> é a forma por extenso de <code>T[]</code>, e <code>Promise&lt;T&gt;</code> (Módulo 22) é a promessa de um valor do tipo <code>T</code>.</p>`
        },
        {
          type: "code",
          file: "tipos.ts",
          code: [
            'interface Caixa<T> {',
            '  valor: T',
            '}',
            '',
            'const n: Caixa<number> = { valor: 42 }',
            'const s: Caixa<string> = { valor: "oi" }',
            '',
            '// você já conhecia estes generics:',
            'let nums: Array<number> = [1, 2, 3]      // = number[]',
            'let p: Promise<string>                    // resolve com string'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Restrições",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "extends: um T com requisitos",
          html: `
            <p>Às vezes <code>T</code> não pode ser <em>qualquer</em> coisa — precisa ter certa forma. Use <code>T extends ...</code> para <strong>restringir</strong> o parâmetro. Aqui, <code>T</code> pode ser qualquer tipo, desde que tenha um campo <code>length</code>:</p>`
        },
        {
          type: "code",
          file: "restricao.ts",
          code: [
            'function logTamanho<T extends { length: number }>(x: T): T {',
            '  console.log(x.length)   // seguro: T garante .length',
            '  return x',
            '}',
            '',
            'logTamanho("texto")      // ok: string tem length',
            'logTamanho([1, 2, 3])    // ok: array tem length',
            '// logTamanho(42)        // ✗ number não tem length'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🔗",
          title: "extends aqui é 'tem a forma de'",
          html: `
            <p>Não confunda com herança de classes. Em generics, <code>T extends X</code> significa "<code>T</code> precisa ser atribuível a <code>X</code>" — ou seja, ter pelo menos a forma de <code>X</code>. É a tipagem estrutural (Módulo 33) de novo.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Inferência",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Você quase nunca escreve <T>",
          html: `
            <p>O ponto que trava muita gente: na maioria das chamadas, <strong>você não passa o tipo</strong>. O TypeScript infere <code>T</code> a partir do argumento — foi o que o laboratório mostrou. Escrever <code>primeiro&lt;number&gt;([1,2,3])</code> funciona, mas é redundante. Deixe o verificador trabalhar; só anote o tipo explícito quando a inferência não tiver como adivinhar.</p>`
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
          heading: "Qual o tipo de retorno?",
          code: 'function par<T>(a: T, b: T): T[] {\n  return [a, b]\n}\n\nconst r = par("x", "y")',
          question: "Qual o tipo inferido de r?",
          options: [
            { label: "string[]", correct: true },
            { label: "T[]" },
            { label: "any[]" }
          ],
          okText: "<b>Certo.</b> Os dois argumentos são <code>string</code>, então o TypeScript infere <code>T = string</code>. O retorno declarado é <code>T[]</code>, que com <code>T</code> preenchido vira <code>string[]</code>.",
          noText: "<b>Preencha a etiqueta.</b> <code>T</code> não fica como <code>T</code> nem vira <code>any</code>: os argumentos <code>\"x\"</code> e <code>\"y\"</code> são strings, então <code>T = string</code>, e <code>T[]</code> vira <code>string[]</code>."
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
          heading: "Desafio: a restrição em ação",
          html: `
            <p>A função exige que <code>T</code> tenha <code>length</code>. Antes de clicar, descubra qual chamada o TypeScript recusa — e por quê.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'function primeiro<T extends { length: number }>(x: T) {',
            '  return x.length > 0',
            '}',
            '',
            'primeiro("café")',
            'primeiro([1, 2, 3])',
            'primeiro(42)'
          ],
          errors: {
            "6": "Argument of type 'number' is not assignable to parameter of type '{ length: number }'. (number não tem .length)"
          },
          js: {
            logs: [],
            crash: "Em JavaScript, primeiro(42) lê 42.length — que é undefined — e undefined > 0 é false. Bug silencioso que a restrição teria barrado."
          }
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
            "Generics são variáveis de tipo: uma função serve a muitos tipos sem perder a informação de qual é.",
            "A sintaxe é <T> após o nome; o que entra como T sai como T, ligando entrada e saída.",
            "Interfaces e types também parametrizam: Caixa<T>, Array<T>, Promise<T>.",
            "T extends X restringe T a ter a forma de X — é tipagem estrutural, não herança de classe.",
            "Na maioria das chamadas o TypeScript infere T pelo argumento; você raramente escreve <T> explícito.",
            "Sem generics, você escolheria entre duplicar funções ou perder a segurança com any."
          ]
        }
      ]
    }
  ]
};
