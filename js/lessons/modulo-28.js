/* ============================================================
   Léxico — Conteúdo do Módulo 28
   "Interfaces e tipos"
   Estreia o bloco 'shapecheck': tipagem estrutural — um objeto
   satisfaz um contrato pela FORMA (campos e tipos), não pelo nome.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["interfaces-e-tipos"] = {
  title: "Interfaces e tipos",
  lead: "Até agora você tipou valores soltos. Programas reais lidam com objetos: um usuário, um pedido, uma configuração. Interfaces e type aliases dão nome à FORMA desses objetos — um contrato que o verificador passa a cobrar.",

  steps: [
    /* 1 */
    {
      label: "Dando nome à forma",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O contrato de um objeto",
          html: `
            <p>Repetir <code>{ nome: string; idade: number }</code> em todo lugar é cansativo e frágil. Uma <strong>interface</strong> dá um nome a essa forma. A partir daí, qualquer objeto marcado como <code>Usuario</code> precisa cumprir o contrato — ter os campos certos, com os tipos certos.</p>`
        },
        {
          type: "code",
          file: "interface.ts",
          code: [
            'interface Usuario {',
            '  nome: string',
            '  idade: number',
            '  email?: string      // o ? marca um campo opcional',
            '}',
            '',
            'const ana: Usuario = { nome: "Ana", idade: 30 }'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "📋",
          title: "Modelo mental: a lista de requisitos",
          html: `
            <p>Uma interface é a lista de requisitos de uma vaga. O candidato (o objeto) não precisa se chamar nada específico — precisa <strong>ter</strong> o que a vaga pede. Quem tem todos os requisitos passa; faltou um obrigatório, está fora.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "A forma importa",
      kind: "interactive",
      blocks: [
        {
          type: "shapecheck",
          heading: "O objeto satisfaz o contrato?",
          intro: "Toque em cada campo para alternar entre <strong>tipo certo</strong>, <strong>tipo errado</strong> e <strong>ausente</strong>. O veredito mostra, ao vivo, se o objeto cumpre a interface — e por quê. Experimente ativar o campo extra.",
          interfaceName: "Usuario",
          fields: [
            { name: "nome", type: "string", required: true, okVal: '"Ana"', wrongType: "number", wrongVal: "42" },
            { name: "idade", type: "number", required: true, okVal: "30", wrongType: "string", wrongVal: '"trinta"' },
            { name: "email", type: "string", required: false, okVal: '"ana@x.com"', wrongType: "number", wrongVal: "999" }
          ],
          extra: { name: "papel", type: "string", val: '"admin"' }
        }
      ]
    },

    /* 3 */
    {
      label: "Tipagem estrutural",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Pela forma, não pelo nome",
          html: `
            <p>Como você viu, o TypeScript é <strong>estrutural</strong>: um objeto satisfaz <code>Usuario</code> se tem a forma certa — não importa de onde veio nem como foi declarado. Ter campos <strong>a mais</strong> é permitido (quando atribuído por uma variável). Faltar um obrigatório ou errar um tipo é que reprova.</p>
            <p>É o "duck typing" do JavaScript, agora verificado: se anda como um pato e grasna como um pato, o TypeScript aceita como pato.</p>`
        }
      ]
    },

    /* 4 */
    {
      label: "interface vs type",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Duas formas de nomear tipos",
          html: `
            <p>Além de <code>interface</code>, existe o <code>type</code> (type alias). Para descrever a forma de um objeto, os dois fazem quase a mesma coisa. A diferença prática: <code>type</code> também nomeia <strong>qualquer</strong> tipo — uniões, primitivos, tuplas — enquanto <code>interface</code> é feita para objetos e pode ser estendida.</p>`
        },
        {
          type: "codetabs",
          tabs: [
            {
              label: "interface",
              file: "interface.ts",
              code: [
                'interface Ponto {',
                '  x: number',
                '  y: number',
                '}',
                '',
                '// pode ser estendida depois:',
                'interface Ponto3D extends Ponto {',
                '  z: number',
                '}'
              ].join("\n"),
              note: "Ideal para a forma de objetos e hierarquias que crescem."
            },
            {
              label: "type",
              file: "type.ts",
              code: [
                'type Ponto = {',
                '  x: number',
                '  y: number',
                '}',
                '',
                '// mas type vai além de objetos:',
                'type Id = string | number',
                'type Par = [number, number]'
              ].join("\n"),
              note: "Nomeia qualquer tipo — uniões, tuplas, primitivos. Mais flexível."
            }
          ]
        },
        {
          type: "callout",
          variant: "info",
          icon: "🧭",
          title: "Qual usar?",
          html: `
            <p>Regra simples e sem drama: use <code>interface</code> para a forma de objetos; use <code>type</code> quando precisar de uniões, tuplas ou combinações. Muitos times escolhem um e seguem em frente — a consistência vale mais que a escolha.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "Uniões",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Isto OU aquilo",
          html: `
            <p>O operador <code>|</code> cria um tipo <strong>união</strong>: um valor que pode ser de um tipo <em>ou</em> de outro. É uma das ferramentas mais usadas do TypeScript — modela estados, opções fechadas e campos que aceitam formatos diferentes:</p>`
        },
        {
          type: "code",
          file: "uniao.ts",
          code: [
            'type Id = string | number',
            'let a: Id = 42',
            'let b: Id = "u-42"      // os dois cabem',
            '',
            '// união de literais = lista de opções fechada',
            'type Status = "ativo" | "pausado" | "cancelado"',
            'let s: Status = "ativo"',
            '// let errado: Status = "sumiu"   // ✗ fora da lista'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Interseções",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Isto E aquilo",
          html: `
            <p>Se <code>|</code> é "ou", o <code>&</code> é "e": uma <strong>interseção</strong> combina várias formas numa só, exigindo <strong>todos</strong> os campos ao mesmo tempo. Ótimo para montar tipos a partir de peças menores:</p>`
        },
        {
          type: "code",
          file: "intersecao.ts",
          code: [
            'type ComId = { id: number }',
            'type ComNome = { nome: string }',
            '',
            '// precisa ter id E nome',
            'type Registro = ComId & ComNome',
            '',
            'const r: Registro = { id: 1, nome: "Ana" }',
            '// const falta: Registro = { id: 1 }   // ✗ falta nome'
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
          heading: "O que uma união permite fazer?",
          code: 'function imprimir(id: string | number) {\n  id.toUpperCase()\n}',
          question: "Por que o TypeScript recusa id.toUpperCase() aqui?",
          options: [
            { label: "Porque id pode ser number, e number não tem toUpperCase", correct: true },
            { label: "Porque uniões não permitem chamar nenhum método" },
            { label: "Porque toUpperCase só existe em any" }
          ],
          okText: "<b>Certo.</b> Numa união <code>string | number</code>, você só pode usar o que é comum aos <strong>dois</strong>. Como <code>number</code> não tem <code>toUpperCase</code>, o acesso é bloqueado até você estreitar o tipo (narrowing, Módulo 35).",
          noText: "<b>Pense no caso pior.</b> <code>id</code> pode ser <code>number</code>, e números não têm <code>toUpperCase</code>. Por isso a união só libera o que é seguro para <strong>ambos</strong> os tipos — até você verificar qual é."
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
          heading: "Desafio: cumpra o contrato",
          html: `
            <p>A interface <code>Produto</code> exige <code>nome: string</code> e <code>preco: number</code>. Antes de clicar, descubra qual linha o TypeScript recusa — e por quê.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'interface Produto {',
            '  nome: string',
            '  preco: number',
            '}',
            '',
            'const a: Produto = { nome: "Café", preco: 20 }',
            'const b: Produto = { nome: "Chá", preco: "15" }',
            'const c: Produto = { nome: "Suco" }'
          ],
          errors: {
            "6": "Type 'string' is not assignable to type 'number'. (preco deveria ser number)",
            "7": "Property 'preco' is missing in type '{ nome: string; }' but required in type 'Produto'."
          },
          js: {
            logs: [],
            crash: "Em JavaScript os três objetos existem sem reclamação — e o preço \"15\" (string) vira uma conta errada mais tarde."
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
            "Interfaces e type aliases dão nome à forma de um objeto — um contrato que o verificador cobra.",
            "O ? marca campos opcionais; os demais são obrigatórios.",
            "A tipagem é estrutural: o que vale é a forma (campos e tipos), não o nome; ter campos a mais é permitido.",
            "interface é feita para objetos e pode ser estendida; type nomeia qualquer tipo (uniões, tuplas, primitivos).",
            "União (|) é 'isto OU aquilo' e só libera o que é comum aos tipos; interseção (&) é 'isto E aquilo'.",
            "Uniões de literais ('ativo' | 'pausado') criam listas de opções fechadas."
          ]
        }
      ]
    }
  ]
};
