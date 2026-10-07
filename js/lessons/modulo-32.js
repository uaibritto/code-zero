/* ============================================================
   Léxico — Conteúdo do Módulo 32
   "Template literal types e infer"
   Estreia o bloco 'strtype': expansor de template literal types —
   uma união de strings distribui pelo template e vira outra união.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["template-infer"] = {
  title: "Template literal types e infer",
  lead: "O JavaScript monta strings com template literals. O TypeScript faz o mesmo — mas no nível dos tipos. Junte isso ao infer, que extrai um pedaço de dentro de outro tipo, e você consegue ler e escrever a forma de strings e estruturas inteiras.",

  steps: [
    /* 1 */
    {
      label: "Strings nos tipos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Template literals, agora em tipos",
          html: `
            <p>Você já usou <code>&#96;Olá, ${'${nome}'}&#96;</code> para montar strings (Módulo 13). O TypeScript traz a mesma sintaxe para os <strong>tipos</strong>: um <strong>template literal type</strong> descreve o formato de uma string, combinando partes fixas com outros tipos.</p>
            <p>Isso transforma strings de "texto qualquer" em contratos precisos: uma rota que precisa começar com <code>/</code>, um nome de evento que precisa ter o prefixo <code>on</code>, um id com um formato fixo.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔤",
          title: "Modelo mental: o molde de etiquetas",
          html: `
            <p>Um template literal type é um molde com espaços em branco. Você passa uma união de valores pelos espaços e o molde carimba uma etiqueta para cada combinação. Uma entrada com três opções sai com três etiquetas prontas.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O molde",
      kind: "interactive",
      blocks: [
        {
          type: "strtype",
          heading: "Veja a união distribuir pelo template",
          intro: "Os eventos à esquerda são uma união de strings. Escolha um molde e veja cada membro passar por ele — com <code>Capitalize</code> ou <code>Uppercase</code> aplicados — formando uma nova união de strings.",
          union: ["click", "focus", "blur"],
          templates: [
            { id: "on", label: "`on${Capitalize<E>}`", prefix: "on", xform: "capitalize", suffix: "" },
            { id: "handle", label: "`handle${Capitalize<E>}`", prefix: "handle", xform: "capitalize", suffix: "" },
            { id: "upper", label: "`${Uppercase<E>}_EVENT`", prefix: "", xform: "upper", suffix: "_EVENT" }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "A sintaxe",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Partes fixas + tipos",
          html: `
            <p>Dentro das crases, o <code>${'${...}'}</code> aceita qualquer tipo de string — uniões de literais, <code>string</code>, ou os <strong>utilitários de string</strong> embutidos: <code>Uppercase</code>, <code>Lowercase</code>, <code>Capitalize</code>, <code>Uncapitalize</code>.</p>`
        },
        {
          type: "code",
          file: "template.ts",
          code: [
            'type Evento = "click" | "focus"',
            '',
            '// cada membro vira "on" + versão capitalizada',
            'type Handler = `on${Capitalize<Evento>}`',
            '// "onClick" | "onFocus"',
            '',
            '// contrato de formato: precisa começar com /',
            'type Rota = `/${string}`',
            'let r: Rota = "/usuarios"   // ok'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Distribuição",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Por que uma vira várias",
          html: `
            <p>Quando você passa uma <strong>união</strong> por um template, o TypeScript aplica o molde a <strong>cada membro</strong> separadamente e junta os resultados numa nova união. Foi o que o laboratório mostrou: três eventos entram, três handlers saem. Com duas uniões no mesmo template, ele faz todas as combinações — o produto cartesiano.</p>`
        },
        {
          type: "code",
          file: "distribui.ts",
          code: [
            'type Tamanho = "p" | "g"',
            'type Cor = "azul" | "verde"',
            '',
            '// todas as combinações:',
            'type Variante = `${Tamanho}-${Cor}`',
            '// "p-azul" | "p-verde" | "g-azul" | "g-verde"'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "infer",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Capturar um pedaço de dentro",
          html: `
            <p><code>infer</code> vive dentro de um conditional type (Módulo 38) e faz uma coisa só: <strong>captura</strong> parte do tipo que está sendo testado, dando um nome a ela. Leia <code>T extends Array&lt;infer U&gt; ? U : never</code> como: "se <code>T</code> é um array de <em>algo</em>, chame esse algo de <code>U</code> e devolva <code>U</code>".</p>`
        },
        {
          type: "code",
          file: "infer.ts",
          code: [
            '// extrai o tipo dos elementos de um array',
            'type Elemento<T> = T extends Array<infer U> ? U : never',
            '',
            'type A = Elemento<number[]>    // number',
            'type B = Elemento<string[]>    // string',
            '',
            '// extrai o tipo que uma Promise resolve',
            'type Resolvido<T> = T extends Promise<infer U> ? U : T',
            'type C = Resolvido<Promise<string>>   // string'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "infer na prática",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Como os utilitários são feitos",
          html: `
            <p><code>infer</code> é a peça por trás de utilitários famosos. <code>ReturnType&lt;F&gt;</code>, que extrai o tipo de retorno de uma função, é basicamente um <code>infer</code> na posição do retorno. Entender isso desmistifica metade da biblioteca padrão:</p>`
        },
        {
          type: "code",
          file: "returntype.ts",
          code: [
            '// a definição real, simplificada:',
            'type ReturnType<F> =',
            '  F extends (...args: any[]) => infer R ? R : never',
            '',
            'function criar() {',
            '  return { id: 1, nome: "Ana" }',
            '}',
            '',
            'type Resultado = ReturnType<typeof criar>',
            '// { id: number; nome: string }'
          ].join("\n")
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
          heading: "O que o infer captura?",
          code: 'type Primeiro<T> =\n  T extends [infer A, ...any[]] ? A : never\n\ntype R = Primeiro<[string, number, boolean]>',
          question: "Qual é o tipo R?",
          options: [
            { label: "string", correct: true },
            { label: "string | number | boolean" },
            { label: "[string, number, boolean]" }
          ],
          okText: "<b>Certo.</b> O padrão <code>[infer A, ...any[]]</code> casa a tupla contra \"primeiro elemento, depois o resto\". <code>infer A</code> captura só o primeiro — <code>string</code> — e o <code>...any[]</code> absorve o resto.",
          noText: "<b>Olhe a posição do infer.</b> <code>[infer A, ...any[]]</code> coloca <code>A</code> na primeira posição da tupla e deixa o resto para <code>...any[]</code>. Então <code>A</code> captura apenas o primeiro elemento: <code>string</code>."
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
          heading: "Desafio: o contrato de formato",
          html: `
            <p>O tipo <code>Rota</code> exige que a string comece com <code>/</code>. Antes de clicar, preveja qual atribuição o TypeScript recusa — e lembre que, em runtime, strings são só strings.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'type Rota = `/${string}`',
            '',
            'const a: Rota = "/home"',
            'const b: Rota = "/perfil/42"',
            'const c: Rota = "sobre"'
          ],
          errors: {
            "4": "Type '\"sobre\"' is not assignable to type '`/${string}`'. (precisa começar com /)"
          },
          js: {
            logs: [],
            crash: "Em JavaScript os três são apenas strings — \"sobre\" passaria batido e viraria uma rota quebrada em runtime."
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
            "Template literal types descrevem o formato de strings, misturando partes fixas com outros tipos.",
            "Os utilitários Uppercase, Lowercase, Capitalize e Uncapitalize transformam strings no nível dos tipos.",
            "Uma união passada por um template distribui: aplica o molde a cada membro e junta os resultados.",
            "infer captura um pedaço do tipo testado dentro de um conditional type, dando um nome a ele.",
            "infer é a peça por trás de ReturnType e muitos outros utilitários da biblioteca padrão.",
            "Template literal types viram contratos de formato — como exigir que uma rota comece com /."
          ]
        }
      ]
    }
  ]
};
