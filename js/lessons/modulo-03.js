/* ============================================================
   Léxico — Conteúdo do Módulo 03
   "Primeiros passos com JavaScript"
   Estreia o bloco 'runnable': editor executável embutido.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["primeiros-passos"] = {
  title: "Primeiros passos com JavaScript",
  lead: "Chega de teoria por um instante. Aqui você escreve e roda código de verdade, direto na página. Vamos começar pela ferramenta que vai te acompanhar em toda a jornada: console.log.",

  steps: [
    /* 1 */
    {
      label: "Olá, mundo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Sua primeira instrução",
          html: `
            <p>Existe uma tradição em programação: o primeiro código que você escreve em qualquer linguagem manda a máquina dizer "Olá, mundo". É pequeno, mas prova que tudo está funcionando — e que <strong>você acabou de dar sua primeira ordem a um computador</strong>.</p>
            <p>O editor abaixo é real. Clique em <strong>Rodar</strong> e veja a saída aparecer no painel de baixo.</p>`
        },
        {
          type: "runnable",
          file: "ola.js",
          autorun: true,
          code: 'console.log("Olá, mundo!")'
        }
      ]
    },

    /* 2 */
    {
      label: "console.log de perto",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "console.log: sua janela para o programa",
          html: `
            <p><code>console.log</code> mostra um valor no console — aquele painel de saída. Parece simples, mas é a ferramenta que você mais vai usar: é assim que você <strong>espia o que está acontecendo</strong> dentro do seu código.</p>
            <p>Ele aceita textos (entre aspas), números (sem aspas) e vários valores separados por vírgula. Experimente mudar o código abaixo e rodar de novo.</p>`
        },
        {
          type: "runnable",
          file: "console.js",
          autorun: true,
          code: [
            'console.log("Textos ficam entre aspas")',
            'console.log(42)',
            'console.log("Você pode juntar", "vários valores", "assim")',
            'console.log(2 + 2)'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "predict",
          heading: "O que será impresso?",
          code: "console.log(3 + 4)",
          question: "Antes de rodar mentalmente: o que aparece no console?",
          options: [
            { label: "7", correct: true },
            { label: "3 + 4" },
            { label: "34" }
          ],
          okText: "<b>Certo.</b> O JavaScript primeiro resolve a conta <code>3 + 4</code>, chega em <code>7</code>, e só então entrega esse resultado ao <code>console.log</code>. Ele nunca imprime a conta em si — imprime o valor final.",
          noText: "<b>Ainda não.</b> Entre dois números, o <code>+</code> faz matemática: <code>3 + 4</code> vira <code>7</code> antes de o <code>console.log</code> receber qualquer coisa. (O resultado <code>34</code> só apareceria juntando textos — você verá isso em coerção.)"
        }
      ]
    },

    /* 4 */
    {
      label: "Experimente",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Errar aqui não custa nada",
          html: `
            <p>A melhor forma de aprender a programar é <strong>mexer</strong>. Trocar um valor, rodar, ver o que muda. O editor não quebra nada, não envia nada para lugar nenhum — é um laboratório só seu.</p>
            <p>Pegue o código abaixo e brinque: mude os textos, os números, adicione mais linhas de <code>console.log</code>. Rode quantas vezes quiser.</p>`
        },
        {
          type: "runnable",
          file: "brincar.js",
          code: [
            'const nome = "Ana"',
            'const idade = 28',
            '',
            'console.log("Oi, eu sou", nome)',
            'console.log("Tenho", idade, "anos")'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Erros são normais",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Erros não são fracasso",
          html: `
            <p>Todo programador — do iniciante ao sênior — passa o dia inteiro vendo erros. Isso não é sinal de que você é ruim. É parte normal do processo. Um erro é o computador tentando <strong>te ajudar</strong>: ele diz que não entendeu algo, e geralmente diz exatamente onde.</p>
            <p>O instinto de iniciante é entrar em pânico e apagar tudo. O hábito de programador é <strong>ler a mensagem de erro</strong> — ela quase sempre aponta o caminho.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧭",
          title: "Modelo mental: o GPS recalculando",
          html: `
            <p>Pense num GPS. Quando você erra uma conversão, ele não desliga nem te xinga — ele diz "recalculando" e mostra o novo caminho. Uma mensagem de erro é isso: o computador dizendo "por aqui não dá, e o motivo é este".</p>
            <p>Ler o erro com calma é o atalho mais rápido para resolver o problema.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Encontre o erro",
      kind: "interactive",
      blocks: [
        {
          type: "prose",
          heading: "Um erro de propósito",
          html: `
            <p>O código abaixo já vem quebrado — de propósito. Clique em <strong>Rodar</strong> e leia a mensagem que aparece. Depois tente consertar (dica: a variável <code>mensagem</code> nunca foi criada). Se travar, use <strong>Ver solução</strong>.</p>`
        },
        {
          type: "runnable",
          file: "erro.js",
          autorun: true,
          code: [
            "// Este código tem um erro. Rode e leia a mensagem!",
            "console.log(mensagem)"
          ].join("\n"),
          solution: [
            'const mensagem = "Agora sim!"',
            "console.log(mensagem)"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🔎",
          title: "Lendo a mensagem",
          html: `
            <p><code>ReferenceError: mensagem is not defined</code> quer dizer: "você me pediu para usar algo chamado <code>mensagem</code>, mas eu nunca vi essa variável ser criada". O tipo do erro (<code>ReferenceError</code>) e o nome citado já entregam o problema.</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "Leia o erro",
      kind: "exercise",
      blocks: [
        {
          type: "quiz",
          heading: "Interpretando a mensagem",
          code: "ReferenceError: total is not defined",
          question: "Você rodou seu código e recebeu a mensagem acima. O que ela está dizendo?",
          options: [
            { label: "Usei uma variável chamada total que nunca foi criada.", correct: true },
            { label: "O valor de total é grande demais para o JavaScript." },
            { label: "Preciso reiniciar o navegador para continuar." }
          ],
          okText: "<b>Exato.</b> <code>ReferenceError ... is not defined</code> quase sempre significa um nome usado antes de existir — talvez um erro de digitação, talvez uma variável esquecida. O nome citado (<code>total</code>) é onde você começa a procurar.",
          noText: "<b>Releia a mensagem.</b> <code>is not defined</code> não fala sobre tamanho nem sobre o navegador. Fala sobre um nome — <code>total</code> — que foi usado sem nunca ter sido definido."
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
          heading: "Desafio: apresente-se ao computador",
          html: `
            <p>Escreva o código você mesmo. O objetivo: usar <strong>dois</strong> <code>console.log</code> — um imprimindo seu nome, outro imprimindo sua idade. Rode e veja as duas linhas aparecerem. Depois compare com uma solução possível.</p>`
        },
        {
          type: "runnable",
          file: "sua-vez.js",
          code: [
            "// Escreva dois console.log:",
            "// 1) com o seu nome",
            "// 2) com a sua idade",
            ""
          ].join("\n"),
          solution: [
            'console.log("Meu nome é Ana")',
            'console.log("Tenho 28 anos")'
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
            "console.log mostra valores no console — é sua janela para dentro do programa.",
            "Textos vão entre aspas; números, sem aspas; vários valores, separados por vírgula.",
            "Expressões são resolvidas antes de imprimir: console.log(3 + 4) mostra 7.",
            "Experimentar é a forma mais rápida de aprender — o editor é um laboratório seguro.",
            "Erros são feedback, não fracasso: leia a mensagem, ela aponta o caminho.",
            "ReferenceError: x is not defined = você usou um nome que nunca foi criado."
          ]
        }
      ]
    }
  ]
};
