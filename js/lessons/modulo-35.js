/* ============================================================
   Léxico — Conteúdo do Módulo 35
   "TypeScript no mundo real"
   Estreia o bloco 'strictlab': flags do tsconfig que ligam e
   desligam, ao vivo, o que o compilador pega no código.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["typescript-real"] = {
  title: "TypeScript no mundo real",
  lead: "O sistema de tipos é lindo no vácuo. Mas um projeto de verdade tem configuração, bibliotecas de terceiros, código legado e prazos. Este módulo é sobre as decisões que fazem o TypeScript trabalhar a seu favor fora do playground.",

  steps: [
    /* 1 */
    {
      label: "Do playground ao projeto",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O arquivo que manda em tudo",
          html: `
            <p>Num projeto real, o comportamento do TypeScript é controlado pelo <code>tsconfig.json</code>. Ele define quais arquivos compilar, para qual versão de JavaScript, e — o mais importante — <strong>quão rigoroso</strong> o verificador deve ser. Dois projetos com o mesmo código podem ter resultados opostos só por causa dessas flags.</p>`
        },
        {
          type: "code",
          file: "tsconfig.json",
          code: [
            '{',
            '  "compilerOptions": {',
            '    "target": "ES2022",',
            '    "module": "ESNext",',
            '    "strict": true,          // o mais importante',
            '    "noUncheckedIndexedAccess": true',
            '  }',
            '}'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🎚️",
          title: "Modelo mental: o painel de rigor",
          html: `
            <p>As flags são botões num painel. Cada um que você liga faz o verificador cobrar mais de você — e pegar mais bugs. O trabalho não é "fazer os erros sumirem", é escolher quais perigos você quer que a máquina vigie.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O painel",
      kind: "interactive",
      blocks: [
        {
          type: "strictlab",
          heading: "Veja a configuração mudar o que é erro",
          intro: "O mesmo código, as mesmas linhas. Ligue e desligue as flags e observe os erros aparecerem e sumirem. Note como <code>strict</code> acende tudo de uma vez — é por isso que ele é o ponto de partida recomendado.",
          file: "exemplo.ts",
          code: [
            "function dobro(x) {",
            "  return x * 2",
            "}",
            "",
            "let user: { nome: string } | null = carregar()",
            "console.log(user.nome)"
          ],
          flags: [
            { id: "noImplicitAny", label: "noImplicitAny", desc: "Proíbe parâmetros sem tipo (any implícito)." },
            { id: "strictNullChecks", label: "strictNullChecks", desc: "null e undefined precisam ser tratados." },
            { id: "strict", label: "strict", desc: "Liga todas as checagens rigorosas de uma vez." }
          ],
          errors: [
            { line: 0, flag: "noImplicitAny", msg: "Parameter 'x' implicitly has an 'any' type." },
            { line: 5, flag: "strictNullChecks", msg: "'user' is possibly 'null'." }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "strict desde o dia 1",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A única configuração que você precisa decorar",
          html: `
            <p>A recomendação é quase unânime: ligue <code>"strict": true</code> no primeiro dia do projeto. Ele habilita de uma vez <code>noImplicitAny</code>, <code>strictNullChecks</code> e outras checagens que, juntas, eliminam as classes de bug mais comuns do JavaScript.</p>
            <p>Começar permissivo e "apertar depois" raramente acontece — o código legado se acumula, e ligar <code>strict</code> num projeto grande vira uma montanha de erros. É muito mais barato ser rigoroso desde o início.</p>`
        }
      ]
    },

    /* 4 */
    {
      label: "Tipando bibliotecas",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Declaration files (.d.ts)",
          html: `
            <p>Bibliotecas em JavaScript puro não têm tipos. A solução são os <strong>declaration files</strong> (<code>.d.ts</code>): arquivos que descrevem só a <em>forma</em> de uma biblioteca, sem implementação. Muitas já vêm com os seus; para as que não têm, existe o repositório <strong>DefinitelyTyped</strong>, instalável como <code>@types/nome-do-pacote</code>.</p>`
        },
        {
          type: "code",
          file: "tipos.d.ts",
          code: [
            '// um .d.ts só declara formas, não roda nada:',
            'declare function soma(a: number, b: number): number',
            '',
            'declare module "biblioteca-antiga" {',
            '  export function fazer(x: string): void',
            '}',
            '',
            '// no terminal, para pacotes sem tipos próprios:',
            '// npm install --save-dev @types/lodash'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "A fuga perigosa",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "as e any: use com culpa",
          html: `
            <p>Duas ferramentas desligam o verificador — e são tentadoras quando o prazo aperta:</p>
            <ul>
              <li><strong>Type assertion</strong> (<code>valor as Tipo</code>): você jura ao compilador que sabe o tipo. Se jurar errado, o bug volta em runtime, sem aviso.</li>
              <li><strong>any</strong>: contamina. Um <code>any</code> se espalha pelas variáveis que tocam nele, apagando a segurança em silêncio ("any creep").</li>
            </ul>
            <p>Não são proibidos — são dívidas. Prefira <code>unknown</code> + narrowing (Módulos 27 e 29). Quando usar <code>as</code>, deixe um comentário explicando por que é seguro.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Boas práticas",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Deixe o verificador trabalhar",
          html: `
            <p>O resumo prático de tudo que você aprendeu:</p>
            <ul>
              <li><strong>Confie na inferência.</strong> Não anote o óbvio (<code>const n = 0</code> já é <code>number</code>). Anote parâmetros, retornos públicos e as fronteiras.</li>
              <li><strong>Tipe as bordas.</strong> O que entra de fora (um <code>fetch</code>, um formulário) é <code>unknown</code> até ser validado. O miolo do sistema fica limpo.</li>
              <li><strong>Leia os erros até o fim.</strong> Mensagens do TypeScript são longas, mas a primeira linha quase sempre diz o essencial: o que esperava e o que recebeu.</li>
              <li><strong>Prefira o tipo mais simples que resolve.</strong> Clareza vale mais que esperteza.</li>
            </ul>`
        }
      ]
    },

    /* 6.5 — o compilador nativo */
    {
      label: "O compilador em Go",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "TypeScript 7: 10× mais rápido",
          html: `
            <p>Por mais de uma década, o <code>tsc</code> foi escrito em... TypeScript. Isso é elegante, mas tem um teto de desempenho — em projetos grandes, checar tipos e carregar o editor ficava lento. A resposta da equipe foi reescrever o compilador em <strong>Go</strong>, uma linguagem compilada e com paralelismo nativo.</p>
            <p>Esse compilador nativo (apelidado de <strong>tsgo</strong>) estreia na linha do <strong>TypeScript 7</strong> e entrega, nos números divulgados pela Microsoft, por volta de <strong>10× mais velocidade</strong> em builds e no tempo de resposta do editor. A linguagem e os tipos que você aprendeu aqui não mudam — muda a máquina que os verifica.</p>`
        },
        {
          type: "callout",
          variant: "info",
          icon: "⚡",
          title: "O que isso muda para você",
          html: `
            <p>Na prática: a mesma sintaxe, o mesmo <code>tsconfig</code>, os mesmos tipos — só que o feedback no editor e o build ficam quase instantâneos mesmo em bases enormes. A linha anterior (TypeScript 5/6, em JavaScript) ainda convive durante a transição, então vale conferir qual o projeto usa.</p>`
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
          heading: "O que strictNullChecks muda?",
          code: 'function tamanho(s: string | null) {\n  return s.length\n}',
          question: "Com strictNullChecks LIGADO, o que acontece com s.length?",
          options: [
            { label: "Erro: s pode ser null, verifique antes", correct: true },
            { label: "Nada: strictNullChecks não afeta isto" },
            { label: "Erro: strings não têm .length" }
          ],
          okText: "<b>Certo.</b> Com <code>strictNullChecks</code>, <code>null</code> faz parte do tipo e precisa ser tratado. Como <code>s</code> pode ser <code>null</code>, acessar <code>.length</code> direto é bloqueado — você precisa estreitar com <code>if (s !== null)</code> antes.",
          noText: "<b>É exatamente o que ele vigia.</b> Com a flag ligada, <code>null</code> não cabe silenciosamente: <code>s</code> é <code>string | null</code>, então o TypeScript exige uma verificação antes de usar <code>.length</code>."
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
          heading: "Desafio: trate o null",
          html: `
            <p>Com <code>strict</code> ligado, o código abaixo não compila. Antes de clicar, descubra qual linha o TypeScript recusa — e lembre que a correção é um <code>if</code> de narrowing antes do uso.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            "interface User { nome: string; apelido: string | null }",
            "",
            "function saudar(u: User) {",
            "  return u.apelido.toUpperCase()",
            "}"
          ],
          errors: {
            "3": "'u.apelido' is possibly 'null'. (estreite com um if antes de usar)"
          },
          js: {
            logs: [],
            crash: "Em runtime, se apelido for null: TypeError: Cannot read properties of null (reading 'toUpperCase')."
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
            "O tsconfig.json controla o comportamento do compilador — principalmente o quão rigoroso ele é.",
            "Ligue strict: true desde o primeiro dia; apertar depois num projeto grande é caro.",
            "Declaration files (.d.ts) descrevem a forma de bibliotecas; pacotes sem tipos usam @types (DefinitelyTyped).",
            "as (assertion) e any desligam o verificador e são dívidas: prefira unknown + narrowing.",
            "Confie na inferência, tipe as fronteiras, leia a primeira linha dos erros e escolha o tipo mais simples.",
            "O que o TypeScript 'pega' é uma escolha de configuração, não um dado fixo da linguagem."
          ]
        }
      ]
    }
  ]
};
