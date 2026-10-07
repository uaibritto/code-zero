/* ============================================================
   Léxico — Conteúdo do Módulo 08
   "Loops"
   Estreia o bloco 'looptrace': tracer de loop passo a passo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["loops"] = {
  title: "Loops",
  lead: "Computadores são incansáveis — e loops são como você aproveita isso. Em vez de repetir a mesma linha cem vezes, você escreve uma vez e manda repetir. Aqui o contador do módulo de variáveis e as condições do módulo anterior se juntam.",

  steps: [
    /* 1 */
    {
      label: "Repetir trabalho",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Deixe a máquina repetir por você",
          html: `
            <p>Imagine imprimir os números de 1 a 100. Você poderia escrever cem <code>console.log</code> — mas isso é exatamente o tipo de trabalho repetitivo que o computador faz melhor. Um <strong>loop</strong> (laço) executa o mesmo bloco de código várias vezes, mudando um pouquinho a cada volta.</p>
            <p>Todo loop precisa de três coisas para não dar errado: um <strong>ponto de partida</strong>, uma <strong>condição de parada</strong> e uma forma de <strong>avançar</strong> em direção a essa parada. Sem a parada, ele roda para sempre.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: a esteira",
          html: `
            <p>Pense numa esteira de fábrica. A cada volta, uma peça nova passa pela sua frente e você faz a mesma tarefa com ela. O loop é a esteira; o bloco de código é a tarefa; a condição de parada é o momento de desligar a máquina.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "for",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O loop for e suas três partes",
          html: `
            <p>O <code>for</code> reúne as três partes num só lugar, separadas por ponto e vírgula: <code>for (início; condição; passo)</code>. Lê-se assim: "comece com <code>i = 1</code>; <strong>enquanto</strong> <code>i &lt;= 5</code>; a cada volta faça <code>i++</code> (soma 1)". Rode:</p>`
        },
        {
          type: "runnable",
          file: "for.js",
          autorun: true,
          code: [
            'for (let i = 1; i <= 5; i++) {',
            '  console.log("Volta número", i)',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Trace o loop",
      kind: "interactive",
      blocks: [
        {
          type: "looptrace",
          heading: "Uma volta de cada vez",
          intro: "Agora veja o loop por dentro. Avance passo a passo e observe o <code>i</code> mudar a cada volta e a saída se acumular. É assim que a máquina enxerga a repetição.",
          file: "for.js",
          code: [
            'for (let i = 1; i <= 5; i++) {',
            '  console.log(i)',
            '}'
          ].join("\n"),
          varName: "i",
          start: 1,
          end: 5,
          step: 1,
          line: function (i) { return String(i); }
        }
      ]
    },

    /* 4 */
    {
      label: "while",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "while: repita enquanto for verdade",
          html: `
            <p>O <code>while</code> é mais simples: ele repete <strong>enquanto</strong> uma condição for verdadeira. Use-o quando você não sabe de antemão quantas voltas vai dar — só sabe a condição que faz parar. Repare que você mesmo precisa cuidar do "avançar":</p>`
        },
        {
          type: "runnable",
          file: "while.js",
          autorun: true,
          code: [
            'let contador = 1',
            '',
            'while (contador <= 3) {',
            '  console.log("Contagem:", contador)',
            '  contador++  // sem isto, o loop nunca para!',
            '}'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "♾️",
          title: "Cuidado com o loop infinito",
          html: `
            <p>Se a condição nunca ficar falsa, o loop roda para sempre e <strong>trava a página</strong>. O esquecimento mais comum é não atualizar a variável (o <code>contador++</code> acima). Sempre garanta que cada volta aproxima o loop da sua parada.</p>
            <p>Existe ainda o <code>do...while</code>, uma variação que executa o bloco <strong>pelo menos uma vez</strong> antes de testar a condição.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "predict",
          heading: "Some tudo",
          code: 'let soma = 0\nfor (let i = 1; i <= 4; i++) {\n  soma = soma + i\n}\nconsole.log(soma)',
          question: "O loop acumula valores em soma. O que é impresso no final?",
          options: [
            { label: "10", correct: true },
            { label: "4" },
            { label: "24" }
          ],
          okText: "<b>Isso.</b> O loop dá quatro voltas (i = 1, 2, 3, 4) e a cada uma soma o i: 1 + 2 + 3 + 4 = <code>10</code>. Esse padrão de acumular num total é um dos usos mais comuns de loops.",
          noText: "<b>Acompanhe o acúmulo.</b> A cada volta, <code>soma</code> recebe <code>soma + i</code>: 0+1=1, depois +2=3, +3=6, +4=10. O resultado é <code>10</code> — a soma de 1 a 4."
        }
      ]
    },

    /* 6 */
    {
      label: "for...of",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Percorrendo uma lista diretamente",
          html: `
            <p>Muitas vezes você não quer contar números — quer passar por cada item de uma <strong>lista</strong> (um array). O <code>for...of</code> faz exatamente isso, entregando cada valor direto, sem você precisar controlar um índice. Rode:</p>`
        },
        {
          type: "runnable",
          file: "for-of.js",
          autorun: true,
          code: [
            'const frutas = ["maçã", "banana", "uva"]',
            '',
            'for (const fruta of frutas) {',
            '  console.log(fruta)',
            '}'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🔀",
          title: "for...of vs for...in",
          html: `
            <p>Não confunda: <code>for...of</code> percorre os <strong>valores</strong> de uma lista. Já o <code>for...in</code> percorre as <strong>chaves/índices</strong> — ele é mais usado com objetos, que você verá em breve. Para arrays, prefira <code>for...of</code>.</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "break & continue",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Controlando o loop por dentro",
          html: `
            <p>Dois comandos ajustam o loop no meio do caminho. <code>break</code> <strong>encerra</strong> o loop na hora, saindo dele. <code>continue</code> <strong>pula o resto da volta atual</strong> e vai direto para a próxima. Rode e acompanhe o que é (e o que não é) impresso:</p>`
        },
        {
          type: "runnable",
          file: "break-continue.js",
          autorun: true,
          code: [
            'for (let i = 1; i <= 5; i++) {',
            '  if (i === 3) continue // pula o 3',
            '  if (i === 5) break    // para antes do 5',
            '  console.log(i)',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 8 */
    {
      label: "Exercício",
      kind: "exercise",
      blocks: [
        {
          type: "quiz",
          heading: "O que o continue deixa passar?",
          code: 'for (let i = 1; i <= 5; i++) {\n  if (i % 2 === 0) continue\n  console.log(i)\n}',
          question: "O continue roda quando i é par. O que aparece no console?",
          options: [
            { label: "1, 3, 5", correct: true },
            { label: "2, 4" },
            { label: "1, 2, 3, 4, 5" }
          ],
          okText: "<b>Certo.</b> Quando <code>i</code> é par (<code>i % 2 === 0</code>), o <code>continue</code> pula o <code>console.log</code> e vai para a próxima volta. Sobram só os ímpares: <code>1, 3, 5</code>.",
          noText: "<b>Pense no que o continue pula.</b> Ele é acionado nos pares (2 e 4), fazendo o loop ignorar o <code>console.log</code> nessas voltas. Então imprime apenas os ímpares: <code>1, 3, 5</code>."
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
          heading: "Desafio: só os pares",
          html: `
            <p>Escreva um loop que imprima apenas os números <strong>pares</strong> de 1 a 10. Dica: um número é par quando o resto da divisão por 2 é zero — <code>i % 2 === 0</code>.</p>`
        },
        {
          type: "runnable",
          file: "pares.js",
          code: [
            '// Imprima os números pares de 1 a 10',
            '',
            ''
          ].join("\n"),
          solution: [
            'for (let i = 1; i <= 10; i++) {',
            '  if (i % 2 === 0) {',
            '    console.log(i)',
            '  }',
            '}'
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
            "Loops repetem um bloco de código várias vezes — trabalho repetitivo é tarefa da máquina.",
            "Todo loop precisa de início, condição de parada e um passo que avança até ela.",
            "for reúne as três partes; while repete enquanto a condição for verdadeira.",
            "Esquecer de avançar cria um loop infinito que trava a página.",
            "for...of percorre os valores de uma lista; for...in percorre chaves/índices.",
            "break encerra o loop; continue pula o resto da volta atual e segue para a próxima."
          ]
        }
      ]
    }
  ]
};
