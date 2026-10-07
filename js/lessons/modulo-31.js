/* ============================================================
   Léxico — Conteúdo do Módulo 31
   "Conditional e mapped types"
   Estreia o bloco 'mapper': um transformador de mapped types que
   percorre keyof T e reescreve cada campo (readonly, opcional…).
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["conditional-mapped"] = {
  title: "Conditional e mapped types",
  lead: "Até aqui, tipos descreviam dados. Agora eles passam a calcular. Conditional e mapped types transformam a tipagem numa pequena linguagem de programação — tipos que recebem tipos e produzem novos tipos.",

  steps: [
    /* 1 */
    {
      label: "Tipos que calculam",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma linguagem dentro da linguagem",
          html: `
            <p>Pense no que você já viu: <code>Array&lt;T&gt;</code> recebe um tipo e devolve outro. Isso é um tipo que <strong>computa</strong>. O type-level programming leva essa ideia adiante — você escreve "funções" que recebem tipos como entrada e produzem tipos como saída, com condicionais e iteração.</p>
            <p>Soa abstrato, mas resolve um problema concreto e diário: derivar um tipo a partir de outro, sem reescrever tudo à mão e sem deixar os dois dessincronizarem.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "⚙️",
          title: "Modelo mental: a fábrica de tipos",
          html: `
            <p>Um tipo comum é uma peça pronta. Um conditional ou mapped type é a <strong>máquina</strong> que fabrica peças: você alimenta com um tipo de origem e ela cospe um tipo derivado. Mude a origem, e a saída se atualiza sozinha.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "keyof",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "As chaves de um tipo, como união",
          html: `
            <p>O operador <code>keyof</code> pega um tipo de objeto e devolve a <strong>união das suas chaves</strong>. É a peça que torna a iteração possível — para percorrer os campos de um tipo, primeiro você precisa deles como um conjunto:</p>`
        },
        {
          type: "code",
          file: "keyof.ts",
          code: [
            'interface User {',
            '  id: number',
            '  nome: string',
            '}',
            '',
            'type Chaves = keyof User   // "id" | "nome"',
            '',
            '// e T[K] acessa o tipo de uma propriedade:',
            'type TipoDoId = User["id"]  // number'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "A fábrica",
      kind: "interactive",
      blocks: [
        {
          type: "mapper",
          heading: "Veja um mapped type reescrever cada campo",
          intro: "À esquerda, o tipo de origem. Escolha uma transformação e veja o tipo gerado à direita — campo por campo. Embaixo, a fórmula que percorre <code>keyof T</code> e aplica a regra a cada chave.",
          source: {
            name: "User",
            fields: [
              { k: "id", t: "number" },
              { k: "nome", t: "string" },
              { k: "ativo", t: "boolean" }
            ]
          },
          transforms: [
            { id: "readonly", label: "Readonly<T>", formula: "{ readonly [K in keyof T]: T[K] }", line: "readonly §K: §T" },
            { id: "partial", label: "Partial<T>", formula: "{ [K in keyof T]?: T[K] }", line: "§K?: §T" },
            { id: "nullable", label: "Nullable<T>", formula: "{ [K in keyof T]: T[K] | null }", line: "§K: §T | null" },
            { id: "stringify", label: "Stringify<T>", formula: "{ [K in keyof T]: string }", line: "§K: string" }
          ]
        }
      ]
    },

    /* 4 */
    {
      label: "Mapped types",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A sintaxe [K in keyof T]",
          html: `
            <p>Um <strong>mapped type</strong> é um <code>for</code> no nível dos tipos: <code>[K in keyof T]</code> percorre cada chave <code>K</code> e define um campo no resultado. Você pode mudar o <strong>valor</strong> (<code>T[K]</code>, <code>string</code>, <code>T[K] | null</code>) e os <strong>modificadores</strong> (<code>readonly</code>, <code>?</code>). O TypeScript já traz vários prontos:</p>`
        },
        {
          type: "code",
          file: "mapped.ts",
          code: [
            '// definidos na biblioteca padrão do TypeScript:',
            'type Readonly<T> = { readonly [K in keyof T]: T[K] }',
            'type Partial<T>  = { [K in keyof T]?: T[K] }',
            '',
            '// usando:',
            'type UserImutavel = Readonly<User>   // tudo readonly',
            'type UserParcial  = Partial<User>    // tudo opcional'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Conditional types",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O if dos tipos",
          html: `
            <p>Um <strong>conditional type</strong> escolhe entre dois tipos com base numa condição: <code>T extends U ? X : Y</code>. Leia como "se <code>T</code> tem a forma de <code>U</code>, use <code>X</code>; senão, <code>Y</code>". É o <code>if</code> da fábrica de tipos:</p>`
        },
        {
          type: "code",
          file: "conditional.ts",
          code: [
            'type EhString<T> = T extends string ? "sim" : "não"',
            '',
            'type A = EhString<string>   // "sim"',
            'type B = EhString<number>   // "não"',
            '',
            '// útil de verdade: extrair, filtrar, transformar',
            'type SemNulo<T> = T extends null | undefined ? never : T',
            'type C = SemNulo<string | null>   // string'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Por que importa",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um tipo, uma fonte da verdade",
          html: `
            <p>O ganho real não é a sintaxe — é manter tipos <strong>em sincronia</strong>. Defina <code>User</code> uma vez; derive <code>Readonly&lt;User&gt;</code>, <code>Partial&lt;User&gt;</code> e o formato que a API devolve a partir dele. No dia em que <code>User</code> ganhar um campo, <strong>todos</strong> os tipos derivados se atualizam juntos. Sem fábrica de tipos, você editaria cinco lugares e esqueceria o sexto.</p>`
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
          heading: "O que o mapped type produz?",
          code: 'interface Ponto { x: number; y: number }\n\ntype R = Partial<Ponto>',
          question: "Qual é o tipo R?",
          options: [
            { label: "{ x?: number; y?: number }", correct: true },
            { label: "{ x: number; y: number }" },
            { label: '{ x: "number"; y: "number" }' }
          ],
          okText: "<b>Certo.</b> <code>Partial&lt;T&gt;</code> percorre <code>keyof Ponto</code> (<code>\"x\" | \"y\"</code>) e adiciona <code>?</code> a cada campo, mantendo o tipo original. Resultado: ambos os campos viram opcionais.",
          noText: "<b>Siga a fórmula.</b> <code>Partial&lt;T&gt; = { [K in keyof T]?: T[K] }</code> mantém o tipo de cada campo e só acrescenta o <code>?</code>. Então <code>x</code> e <code>y</code> continuam <code>number</code>, mas opcionais."
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
          heading: "Desafio: Readonly protege de verdade",
          html: `
            <p><code>Readonly&lt;T&gt;</code> marca todos os campos como somente-leitura. Antes de clicar, preveja: o TypeScript deixa reatribuir um campo depois? E o JavaScript, deixa?</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'interface Config { tema: string }',
            '',
            'const c: Readonly<Config> = { tema: "escuro" }',
            '',
            'console.log(c.tema)',
            'c.tema = "claro"'
          ],
          errors: {
            "5": "Cannot assign to 'tema' because it is a read-only property."
          },
          js: {
            logs: ["escuro"],
            crash: "Em JavaScript readonly não existe: c.tema vira \"claro\" sem reclamação. A proteção é só em tempo de verificação — e por isso é tão valiosa."
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
            "Conditional e mapped types transformam a tipagem numa linguagem: tipos que recebem tipos e produzem tipos.",
            "keyof T devolve a união das chaves de T; T[K] acessa o tipo de uma propriedade.",
            "Mapped types ([K in keyof T]) iteram sobre as chaves e reescrevem cada campo — valor e modificadores (readonly, ?).",
            "Conditional types (T extends U ? X : Y) são o if dos tipos: escolhem um ramo pela forma de T.",
            "A biblioteca padrão já traz Readonly, Partial e outros construídos com esses recursos.",
            "O maior ganho é manter tipos em sincronia: derive de uma fonte da verdade e tudo se atualiza junto."
          ]
        }
      ]
    }
  ]
};
