/* ============================================================
   Léxico — Conteúdo do Módulo 26
   "Tipos fundamentais"
   Estreia o bloco 'assign': explorador de atribuibilidade —
   quais valores cabem num tipo (um tipo é um conjunto de valores).
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["tipos-fundamentais"] = {
  title: "Tipos fundamentais",
  lead: "Antes de decorar nomes de tipos, entenda a ideia por trás deles: um tipo não é um rótulo, é um conjunto. Dizer que algo é number é dizer de qual conjunto de valores ele pode vir — e, por tabela, o que você pode fazer com ele.",

  steps: [
    /* 1 */
    {
      label: "Tipo = conjunto",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O que um tipo realmente é",
          html: `
            <p>No fundo, um tipo é a resposta para a pergunta: <strong>quais valores são permitidos aqui?</strong></p>
            <ul>
              <li><code>boolean</code> é o conjunto <code>{ true, false }</code> — só dois valores.</li>
              <li><code>number</code> é o conjunto de todos os números.</li>
              <li><code>string</code> é o conjunto de todos os textos possíveis.</li>
            </ul>
            <p>Quando você escreve <code>let x: number</code>, está prometendo que <code>x</code> só receberá valores desse conjunto. O TypeScript passa a recusar qualquer valor de fora dele.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🪣",
          title: "Modelo mental: baldes rotulados",
          html: `
            <p>Cada tipo é um balde com um rótulo. O balde <code>number</code> só aceita números; tentar jogar um texto nele derrama. A pergunta que o verificador faz o tempo todo é simples: <em>esse valor cabe nesse balde?</em></p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O que cabe?",
      kind: "interactive",
      blocks: [
        {
          type: "assign",
          heading: "Explore a atribuibilidade",
          intro: "Escolha um tipo no topo e veja, para cada valor, se ele cabe (✓) ou é recusado (✗) — com a mensagem exata que o TypeScript daria. Repare como <code>number[]</code> recusa <code>[\"a\", \"b\"]</code>, mas <code>any</code> aceita tudo.",
          types: [
            { id: "string", label: "string", accepts: ["string"] },
            { id: "number", label: "number", accepts: ["number"] },
            { id: "boolean", label: "boolean", accepts: ["boolean"] },
            { id: "number[]", label: "number[]", accepts: ["number[]"] },
            { id: "string[]", label: "string[]", accepts: ["string[]"] },
            { id: "tuple", label: "[string, number]", accepts: ["tuple-sn"] },
            { id: "any", label: "any", accepts: [] }
          ],
          values: [
            { code: '"café"', tstype: "string", kind: "string" },
            { code: "42", tstype: "number", kind: "number" },
            { code: "true", tstype: "boolean", kind: "boolean" },
            { code: "[1, 2, 3]", tstype: "number[]", kind: "number[]" },
            { code: '["a", "b"]', tstype: "string[]", kind: "string[]" },
            { code: '["Ana", 30]', tstype: "[string, number]", kind: "tuple-sn" }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Primitivos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "string, number, boolean",
          html: `
            <p>São os três tipos primitivos que você usará o tempo todo. Note que <code>number</code> cobre inteiros e decimais — não existe <code>int</code> ou <code>float</code> separados, igual ao JavaScript (Módulo 04):</p>`
        },
        {
          type: "code",
          file: "primitivos.ts",
          code: [
            'let nome: string = "Ana"',
            'let altura: number = 1.72    // inteiros e decimais, tudo number',
            'let maiorDeIdade: boolean = true',
            '',
            '// escrito em minúsculas: string, não String',
            '// (String com maiúscula é outra coisa — evite)'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Arrays e tuplas",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Coleções com tipo",
          html: `
            <p>Um <strong>array</strong> é uma lista de tamanho livre em que todos os itens têm o <strong>mesmo</strong> tipo: <code>number[]</code>, <code>string[]</code>. Uma <strong>tupla</strong> é uma lista de tamanho <strong>fixo</strong> em que cada posição tem seu próprio tipo — útil para pares como "nome e idade":</p>`
        },
        {
          type: "code",
          file: "colecoes.ts",
          code: [
            '// array: muitos itens, mesmo tipo',
            'let notas: number[] = [8, 6, 10]',
            'let nomes: string[] = ["Ana", "Rui"]',
            '',
            '// tupla: tamanho fixo, tipo por posição',
            'let pessoa: [string, number] = ["Ana", 30]',
            '',
            'notas.push(7)        // ok',
            '// notas.push("x")   // ✗ string não cabe em number[]'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "null e undefined",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A ausência, levada a sério",
          html: `
            <p>Lembra dos "dois vazios" do JavaScript (Módulo 04)? <code>undefined</code> ("nunca recebeu valor") e <code>null</code> ("vazio de propósito"). Com a opção <code>strictNullChecks</code> ligada — o padrão em projetos sérios — eles <strong>não</strong> cabem automaticamente em outros tipos. Isso elimina o erro mais comum do JavaScript: ler uma propriedade de algo que é <code>null</code>.</p>`
        },
        {
          type: "code",
          file: "nulos.ts",
          code: [
            'let nome: string = "Ana"',
            '// nome = null   // ✗ null não cabe em string',
            '',
            '// para permitir, diga explicitamente (união — Módulo 33):',
            'let apelido: string | null = null',
            'apelido = "Aninha"   // ok nos dois casos'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Tipos literais",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quando um valor vira um tipo",
          html: `
            <p>Um tipo pode ser <strong>um único valor</strong>. O tipo <code>"escuro"</code> aceita exatamente a string <code>"escuro"</code> e nada mais. Isso parece inútil sozinho, mas é a base para listas de opções fechadas (Módulo 33). É também por isso que <code>const</code> e <code>let</code> inferem tipos diferentes:</p>`
        },
        {
          type: "code",
          file: "literais.ts",
          code: [
            'let tema1 = "escuro"      // inferido: string (pode mudar)',
            'const tema2 = "escuro"    // inferido: "escuro" (tipo literal!)',
            '',
            '// um tipo literal como anotação:',
            'let direcao: "cima" | "baixo" = "cima"',
            '// direcao = "lado"   // ✗ só "cima" ou "baixo" cabem'
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
          heading: "Array ou tupla?",
          code: 'let par: [string, number] = ["Ana", 30]\npar = [30, "Ana"]',
          question: "O que o TypeScript diz sobre a segunda linha?",
          options: [
            { label: "Erro: a ordem dos tipos não bate com a tupla", correct: true },
            { label: "Tudo certo — tem um string e um number" },
            { label: "Tudo certo — tuplas ignoram a ordem" }
          ],
          okText: "<b>Certo.</b> Numa tupla, <strong>cada posição tem seu tipo</strong>. <code>[string, number]</code> exige texto na posição 0 e número na 1. <code>[30, \"Ana\"]</code> inverte isso: <code>number</code> não cabe onde se espera <code>string</code>.",
          noText: "<b>Tupla não é array comum.</b> A posição importa: <code>[string, number]</code> quer texto primeiro, número depois. <code>[30, \"Ana\"]</code> troca a ordem, então os dois tipos ficam no lugar errado — erro."
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
          heading: "Desafio: cada valor no seu balde",
          html: `
            <p>Antes de clicar, descubra qual linha o TypeScript recusa. Depois use os botões para conferir o comportamento em JavaScript e a verificação de tipos.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'let idades: number[] = [20, 30, 40]',
            'let ativo: boolean = true',
            '',
            'idades.push(50)',
            'idades.push("60")',
            'ativo = "sim"'
          ],
          errors: {
            "4": "Argument of type 'string' is not assignable to parameter of type 'number'.",
            "5": "Type 'string' is not assignable to type 'boolean'."
          },
          js: {
            logs: [],
            crash: "Em JavaScript nada disto dá erro: idades vira [20,30,40,50,\"60\"] e ativo vira \"sim\" — bugs esperando para acontecer."
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
            "Um tipo é um conjunto de valores permitidos — a pergunta é sempre 'esse valor cabe aqui?'.",
            "Os primitivos são string, number (inteiros e decimais juntos) e boolean, em minúsculas.",
            "Arrays (number[]) têm tamanho livre e um só tipo; tuplas ([string, number]) têm tamanho fixo e tipo por posição.",
            "Com strictNullChecks, null e undefined não cabem em outros tipos sem você permitir.",
            "Tipos literais tratam um valor específico como um tipo — por isso const infere o tipo literal, let não.",
            "A posição importa numa tupla: inverter a ordem dos tipos é um erro."
          ]
        }
      ]
    }
  ]
};
