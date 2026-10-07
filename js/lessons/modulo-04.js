/* ============================================================
   Léxico — Conteúdo do Módulo 04
   "Valores e tipos"
   Estreia o bloco 'typeprobe': explorador de typeof ao vivo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["valores-e-tipos"] = {
  title: "Valores e tipos",
  lead: "Todo programa manipula dados: textos, números, respostas de sim ou não. Cada pedaço de dado é um valor — e todo valor tem um tipo. Entender os tipos é entender o material com que você constrói tudo.",

  steps: [
    /* 1 */
    {
      label: "O que é um valor",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Valores são o material do programa",
          html: `
            <p>Um <strong>valor</strong> é qualquer pedaço de dado que o programa manipula: o texto <code>"Ana"</code>, o número <code>42</code>, a resposta <code>true</code>. São os tijolos de tudo que você vai construir.</p>
            <p>E todo valor carrega um <strong>tipo</strong> — uma categoria que diz o que aquele valor é e o que dá para fazer com ele. Você pode somar números, mas somar textos faz outra coisa. O tipo é o que define essas regras.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: etiquetas nas caixas",
          html: `
            <p>Imagine uma prateleira de caixas. Cada caixa guarda um valor, e cada uma tem uma etiqueta dizendo o que há dentro: "texto", "número", "sim/não". Essa etiqueta é o tipo.</p>
            <p>O JavaScript olha a etiqueta o tempo todo para saber como tratar o conteúdo. Somar duas caixas de "número" dá matemática; juntar duas de "texto" gruda as palavras.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Os primitivos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Os tipos primitivos",
          html: `
            <p>Os valores mais básicos do JavaScript são chamados de <strong>primitivos</strong>. Eles são as peças indivisíveis da linguagem. Estes cinco são os que você vai usar o tempo todo:</p>`
        },
        {
          type: "cards",
          cards: [
            { n: "📝", title: "string (texto)", text: "Uma sequência de caracteres, sempre entre aspas: \"Olá\", 'abc', \"42\"." },
            { n: "🔢", title: "number (número)", text: "Inteiros e decimais no mesmo tipo: 42, 3.14, -7. Não existe int vs float." },
            { n: "🔘", title: "boolean", text: "Apenas dois valores: true ou false. A base de toda decisão no código." },
            { n: "🫥", title: "undefined", text: "O valor automático de algo que foi criado mas ainda não recebeu nada." },
            { n: "⬛", title: "null", text: "Um vazio proposital: “aqui não há valor, e isso é intencional”." }
          ]
        },
        {
          type: "callout",
          variant: "info",
          icon: "➕",
          title: "Existem mais dois",
          html: `
            <p>Há ainda <code>symbol</code> e <code>bigint</code>, primitivos mais especializados que você encontrará bem mais à frente. Por enquanto, foque nestes cinco — eles cobrem a imensa maioria do código do dia a dia.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "Explorador typeof",
      kind: "interactive",
      blocks: [
        {
          type: "typeprobe",
          heading: "Descubra o tipo de qualquer valor",
          intro: "O operador <code>typeof</code> responde “que tipo é este valor?”. Digite qualquer coisa abaixo (ou clique nos exemplos) e veja o valor e seu tipo. Repare bem no resultado de <code>null</code>…",
          initial: '"Olá"',
          presets: ['"Olá"', '42', '3.14', 'true', 'null', 'undefined', '2 > 5']
        }
      ]
    },

    /* 4 */
    {
      label: "Texto e número",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "string e number na prática",
          html: `
            <p>Texto vai sempre entre aspas; número, nunca. Isso muda tudo: <code>42</code> é um número que você pode somar, enquanto <code>"42"</code> é um texto que por acaso parece um número.</p>
            <p>E atenção a um detalhe que surpreende quem vem de outras linguagens: no JavaScript, <strong>inteiros e decimais são o mesmo tipo</strong> — ambos são <code>number</code>. Rode e confira:</p>`
        },
        {
          type: "runnable",
          file: "tipos.js",
          autorun: true,
          code: [
            'const nome = "Ricardo"',
            'const idade = 30',
            'const altura = 1.75',
            '',
            'console.log(typeof nome)',
            'console.log(typeof idade)',
            'console.log(typeof altura)'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Booleanos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "boolean: sim ou não",
          html: `
            <p>Um <code>boolean</code> só pode ser <code>true</code> (verdadeiro) ou <code>false</code> (falso). Pode parecer pouco, mas é o que permite ao programa <strong>tomar decisões</strong> — você verá isso virar condicionais em breve.</p>
            <p>O mais comum é que booleanos nasçam de <strong>comparações</strong>. Rode e veja cada comparação virar true ou false:</p>`
        },
        {
          type: "runnable",
          file: "booleanos.js",
          autorun: true,
          code: [
            'console.log(10 > 5)',
            'console.log(10 === 10)',
            'console.log("a" === "b")',
            '',
            'const maiorDeIdade = 20 >= 18',
            'console.log(maiorDeIdade)'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "undefined vs null",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O par que mais confunde",
          html: `
            <p>Os dois representam "ausência de valor", mas por motivos diferentes — e essa diferença importa.</p>
            <p><strong>undefined</strong> é o JavaScript dizendo "ninguém colocou nada aqui ainda". É automático: criou uma variável sem valor? Ela nasce <code>undefined</code>.</p>
            <p><strong>null</strong> é você dizendo, de propósito, "aqui não há valor". É uma escolha explícita, nunca algo que a linguagem faz sozinha.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: o formulário",
          html: `
            <p>Pense num campo de formulário. Se ninguém chegou a mexer nele, está <strong>undefined</strong> — simplesmente nunca foi preenchido. Se a pessoa escreveu "não se aplica" de propósito, está <strong>null</strong> — alguém decidiu deixá-lo vazio.</p>`
        },
        {
          type: "callout",
          variant: "warn",
          icon: "🐛",
          title: "O bug mais famoso do JavaScript",
          html: `
            <p>Você viu no explorador: <code>typeof null</code> devolve <code>"object"</code>, não <code>"null"</code>. Isso é um erro histórico da linguagem, dos primeiros dias, que nunca foi corrigido para não quebrar código antigo. Não faz sentido lógico — apenas memorize que <code>null</code> é um primitivo, mesmo que o <code>typeof</code> minta sobre isso.</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "predict",
          heading: "O resultado estranho",
          code: "console.log(typeof null)",
          question: "Depois do que você acabou de ver: o que isto imprime?",
          options: [
            { label: '"object"', correct: true },
            { label: '"null"' },
            { label: '"undefined"' }
          ],
          okText: "<b>Isso mesmo.</b> Mesmo <code>null</code> sendo um primitivo, <code>typeof null</code> devolve <code>\"object\"</code> por causa daquele bug histórico. É a exceção que todo mundo precisa decorar.",
          noText: "<b>Lembra do aviso?</b> <code>typeof null</code> é a famosa exceção: devolve <code>\"object\"</code>, não <code>\"null\"</code>. É um bug antigo da linguagem que ficou para sempre."
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
          heading: "Desafio: um de cada tipo",
          html: `
            <p>Crie uma variável para cada um dos cinco primitivos e imprima o <code>typeof</code> de cada uma. Observe o que aparece para a variável sem valor e para o <code>null</code>. Rode e, se quiser, compare com uma solução.</p>`
        },
        {
          type: "runnable",
          file: "um-de-cada.js",
          code: [
            "// Crie uma variável de cada tipo primitivo",
            "// (texto, número, boolean, sem valor, null)",
            "// e imprima o typeof de cada uma.",
            ""
          ].join("\n"),
          solution: [
            'const texto = "oi"',
            'const numero = 42',
            'const ligado = true',
            'let semValor',
            'const nulo = null',
            '',
            'console.log(typeof texto)',
            'console.log(typeof numero)',
            'console.log(typeof ligado)',
            'console.log(typeof semValor)',
            'console.log(typeof nulo)'
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
            "Um valor é um dado; todo valor tem um tipo que define como ele se comporta.",
            "Os cinco primitivos essenciais: string, number, boolean, undefined e null.",
            "Texto vai entre aspas; número nunca — e inteiros e decimais são o mesmo tipo (number).",
            "Booleanos (true/false) costumam nascer de comparações e são a base das decisões.",
            "undefined é ausência automática; null é um vazio intencional que você define.",
            "typeof null devolve \"object\" — um bug histórico que vale decorar."
          ]
        }
      ]
    }
  ]
};
