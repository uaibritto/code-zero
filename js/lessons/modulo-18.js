/* ============================================================
   Léxico — Conteúdo do Módulo 18
   "Event loop, tasks & microtasks"
   Estreia o bloco 'eventloop': animação do event loop.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["event-loop"] = {
  title: "Event loop, tasks & microtasks",
  lead: "JavaScript faz uma coisa de cada vez — e, mesmo assim, lida com timers, cliques e requisições sem travar. O segredo é o event loop. Esta é, talvez, a peça mais importante para entender código assíncrono.",

  steps: [
    /* 1 */
    {
      label: "Uma coisa de cada vez",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "JavaScript é single-threaded",
          html: `
            <p>O JavaScript tem <strong>uma única linha de execução</strong> (single-threaded): só consegue fazer uma coisa por vez, na call stack. Então como ele espera um timer de 3 segundos, ou uma resposta da internet, sem congelar a página inteira?</p>
            <p>A resposta é que ele <strong>não espera parado</strong>. Ele delega essas tarefas demoradas para o ambiente (as Web APIs), continua rodando o resto do código, e só volta a mexer no resultado quando a stack estiver livre. Quem orquestra isso é o <strong>event loop</strong>.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "☕",
          title: "Modelo mental: o caixa único",
          html: `
            <p>Imagine uma cafeteria com <strong>um só caixa</strong>. Você pede um café que demora. Em vez de travar a fila esperando, o caixa anota seu pedido, manda para a cozinha (a Web API) e já atende o próximo cliente. Quando o café fica pronto, ele te chama de volta — mas só quando estiver livre. O caixa é a thread única; o event loop é essa coordenação.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "setTimeout não espera",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Mesmo com 0ms, roda depois",
          html: `
            <p>Veja uma prova. Mesmo com um atraso de <code>0</code> milissegundos, o callback do <code>setTimeout</code> <strong>não</strong> roda na hora: ele espera todo o código síncrono terminar. Rode e observe a ordem — o "3" aparece por último:</p>`
        },
        {
          type: "runnable",
          file: "ordem.js",
          autorun: true,
          code: [
            'console.log("1 - começo")',
            '',
            'setTimeout(() => {',
            '  console.log("3 - no setTimeout")',
            '}, 0)',
            '',
            'console.log("2 - fim")'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "O Event Loop",
      kind: "interactive",
      blocks: [
        {
          type: "eventloop",
          heading: "A dança completa, quadro a quadro",
          intro: "Avance passo a passo e acompanhe cada callback percorrer o sistema: a Call Stack, as Web APIs, a Microtask Queue e a Task Queue. Preste atenção na regra de ouro no fim — microtasks antes de macrotasks.",
          file: "async.js",
          code: [
            'console.log("A")',
            'setTimeout(() => console.log("B"), 0)',
            'Promise.resolve().then(() => console.log("C"))',
            'console.log("D")'
          ],
          events: [
            { op: "push", arg: "main()", note: "A execução começa: <code>main()</code> entra na Call Stack." },
            { op: "log", arg: "A", note: "<code>console.log(\"A\")</code> roda imediatamente e imprime <strong>A</strong>." },
            { op: "web+", arg: "setTimeout → log('B')", note: "<code>setTimeout</code> entrega seu callback às <strong>Web APIs</strong> (um timer). O código não para aqui." },
            { op: "web>macro", note: "O timer (0ms) expira e o callback é colocado na <strong>Task Queue</strong>. Ele ainda NÃO roda — espera a stack esvaziar." },
            { op: "micro+", arg: "Promise.then → log('C')", note: "<code>Promise.resolve().then</code> agenda o callback direto na <strong>Microtask Queue</strong>." },
            { op: "log", arg: "D", note: "<code>console.log(\"D\")</code> roda e imprime <strong>D</strong>. Acabou o código síncrono." },
            { op: "pop", note: "<code>main()</code> termina. A Call Stack está <strong>vazia</strong> — o event loop entra em ação." },
            { op: "note", note: "Regra de ouro: com a stack vazia, o event loop esvazia <strong>TODAS as microtasks</strong> antes de tocar nas macrotasks." },
            { op: "micro>stack", note: "A microtask (callback da Promise) é movida para a Call Stack." },
            { op: "log", arg: "C", note: "A microtask roda e imprime <strong>C</strong>." },
            { op: "pop", note: "A microtask termina e sai da stack. A Microtask Queue está vazia." },
            { op: "note", note: "Microtasks esgotadas. Agora sim o event loop pega <strong>UMA</strong> macrotask da Task Queue." },
            { op: "macro>stack", note: "O callback do <code>setTimeout</code> entra na Call Stack." },
            { op: "log", arg: "B", note: "A macrotask roda e imprime <strong>B</strong>." },
            { op: "pop", note: "Fim! A ordem impressa foi: <strong>A, D, C, B</strong>." }
          ]
        }
      ]
    },

    /* 4 */
    {
      label: "Micro antes de macro",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Promises furam a fila dos timers",
          html: `
            <p>Existem duas filas, e elas não têm o mesmo peso. Callbacks de <strong>Promises</strong> vão para a <strong>Microtask Queue</strong>; callbacks de <code>setTimeout</code> vão para a <strong>Task Queue</strong> (macrotasks). A regra: a cada ciclo, o event loop <strong>esvazia todas as microtasks antes</strong> de pegar uma única macrotask. Rode e confirme a ordem:</p>`
        },
        {
          type: "runnable",
          file: "filas.js",
          autorun: true,
          code: [
            'console.log("1")',
            'setTimeout(() => console.log("4 - macrotask"), 0)',
            'Promise.resolve().then(() => console.log("3 - microtask"))',
            'console.log("2")'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "quiz",
          heading: "Em que ordem imprime?",
          code: 'console.log("A")\nsetTimeout(() => console.log("B"), 0)\nPromise.resolve().then(() => console.log("C"))\nconsole.log("D")',
          question: "Qual a ordem exata dos quatro logs?",
          options: [
            { label: "A, D, C, B", correct: true },
            { label: "A, B, C, D" },
            { label: "A, D, B, C" }
          ],
          okText: "<b>Perfeito.</b> Primeiro o síncrono: <strong>A</strong> e <strong>D</strong>. Depois as microtasks: <strong>C</strong> (da Promise). Por último, as macrotasks: <strong>B</strong> (do setTimeout). Microtasks sempre antes de macrotasks.",
          noText: "<b>Separe em três ondas.</b> Síncrono primeiro (A, D). Depois a Microtask Queue, onde está a Promise (C). Só então a Task Queue do setTimeout (B). Resultado: A, D, C, B."
        }
      ]
    },

    /* 6 */
    {
      label: "Por que não trava",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A UI continua respondendo",
          html: `
            <p>Agora o quadro fecha. Como as tarefas demoradas são delegadas e seus callbacks só rodam quando a stack está livre, a thread principal <strong>raramente fica bloqueada</strong> — a página continua reagindo a cliques e rolagem enquanto espera um timer ou uma requisição.</p>
            <p>O reverso também é verdade: se você colocar um loop pesado e <strong>síncrono</strong> na stack, nada mais roda até ele terminar — nem cliques, nem timers. A página congela. Entender o event loop é entender por que isso acontece e como evitar.</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "Sua vez",
      kind: "challenge",
      blocks: [
        {
          type: "prose",
          heading: "Desafio: agende para depois",
          html: `
            <p>Imprima <code>"A"</code> imediatamente e <code>"B"</code> depois de <strong>1 segundo</strong>, usando <code>setTimeout</code>. Rode e observe o "B" aparecer com um atraso real — a prova de que o timer não bloqueou nada.</p>`
        },
        {
          type: "runnable",
          file: "agende.js",
          code: [
            '// Imprima "A" imediatamente.',
            '// Imprima "B" depois de 1 segundo (setTimeout).',
            ''
          ].join("\n"),
          solution: [
            'console.log("A")',
            '',
            'setTimeout(() => {',
            '  console.log("B")',
            '}, 1000)'
          ].join("\n")
        }
      ]
    },

    /* 8 */
    {
      label: "Resumo",
      kind: "summary",
      blocks: [
        {
          type: "summary",
          heading: "O que você aprendeu",
          items: [
            "JavaScript é single-threaded: uma coisa por vez na call stack.",
            "Tarefas demoradas são delegadas às Web APIs; a execução não espera parada.",
            "O event loop só move um callback para a stack quando ela está vazia.",
            "setTimeout, mesmo com 0ms, roda depois de todo o código síncrono.",
            "Microtasks (Promises) são sempre esvaziadas antes das macrotasks (timers).",
            "Loops síncronos pesados bloqueiam a thread e congelam a página — por isso o assíncrono importa."
          ]
        }
      ]
    }
  ]
};
