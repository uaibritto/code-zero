/* ============================================================
   Léxico — Conteúdo do Módulo (slug: devtools-debugging)
   "DevTools e depuração" — exibido como nº 28 na trilha JS.
   Estreia o bloco 'debugpanel': um depurador simulado — step com
   breakpoint, escopo e console ao vivo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["devtools-debugging"] = {
  title: "DevTools e depuração",
  lead: "Escrever código é metade do trabalho; a outra metade é descobrir por que ele não faz o que você esperava. Depurar bem não é adivinhar — é observar. As ferramentas do navegador transformam o código de uma caixa-preta num aquário onde você vê tudo acontecendo.",

  steps: [
    /* 1 */
    {
      label: "Observar, não adivinhar",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A mentalidade",
          html: `
            <p>O erro mais comum ao caçar um bug é <strong>adivinhar</strong> a causa e sair mudando código. O caminho rápido é o oposto: <strong>observar</strong> o que de fato acontece — quais valores as variáveis têm, por onde a execução passa — e só então agir sobre evidência.</p>
            <p>Duas ferramentas dão essa visão: o <strong>console</strong>, para imprimir o estado, e o <strong>debugger</strong>, para <em>congelar</em> o programa num ponto e inspecionar tudo. Dominar as duas é o que separa horas de frustração de minutos de diagnóstico.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔦",
          title: "Modelo mental: a lanterna",
          html: `
            <p>O bug mora no escuro — na diferença entre o que você <em>acha</em> que o código faz e o que ele <em>faz</em>. Depurar é apontar uma lanterna para esse ponto. Cada <code>console.log</code> e cada breakpoint é um facho de luz; o bug não resiste a ser visto.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O depurador",
      kind: "interactive",
      blocks: [
        {
          type: "debugpanel",
          heading: "Congele o programa e inspecione",
          intro: "Um breakpoint pausa a execução numa linha. Avance com <strong>Step</strong> e acompanhe o painel <strong>Scope</strong> (as variáveis vivas) e o <strong>Console</strong> se preenchendo — exatamente o que você vê nas DevTools.",
          file: "soma.js",
          code: [
            "function soma(a, b) {",
            "  const total = a + b",
            '  console.log("total:", total)',
            "  return total",
            "}",
            "const r = soma(5, 3)"
          ],
          steps: [
            { line: 5, scope: {}, console: null, note: "Breakpoint aqui. A linha <code>const r = soma(5, 3)</code> vai executar — mas ainda não executou." },
            { line: 0, scope: { a: "5", b: "3" }, console: null, note: "Entramos em <code>soma</code>. O painel Scope mostra os parâmetros: <code>a = 5</code>, <code>b = 3</code>." },
            { line: 1, scope: { a: "5", b: "3", total: "undefined" }, console: null, note: "<code>total</code> foi declarado, mas a atribuição ainda não rodou — por isso <code>undefined</code>." },
            { line: 2, scope: { a: "5", b: "3", total: "8" }, console: null, note: "Depois de <code>a + b</code>, o Scope atualiza: <code>total = 8</code>. Nada foi impresso ainda." },
            { line: 3, scope: { a: "5", b: "3", total: "8" }, console: "total: 8", note: "O <code>console.log</code> executou — a mensagem aparece no Console." },
            { line: 5, scope: { r: "8" }, console: null, note: "<code>return</code> devolve 8. De volta ao topo, <code>r</code> recebe o valor. O escopo de <code>soma</code> já não existe mais." }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "console além do log",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A família console",
          html: `
            <p><code>console.log</code> é só o começo. O console tem métodos que organizam a investigação — e deixam a saída muito mais legível que uma pilha de logs soltos:</p>`
        },
        {
          type: "code",
          file: "console.js",
          code: [
            'console.table(usuarios)   // array de objetos como tabela',
            'console.group("Pedido")   // agrupa logs aninhados',
            'console.groupEnd()',
            'console.warn("cuidado")   // amarelo',
            'console.error("falhou")   // vermelho + stack trace',
            'console.count("clique")   // conta quantas vezes passou aqui',
            'console.time("busca")     // mede duração...',
            'console.timeEnd("busca")  // ...até aqui'
          ].join("\n")
        },
        {
          type: "runnable",
          file: "inspecionar.js",
          autorun: true,
          code: [
            '// log aceita vários argumentos e rótulos — use isso a seu favor',
            'const usuario = { nome: "Ana", nivel: 7 }',
            '',
            'console.log("usuário:", usuario)',
            'console.log("nível é número?", typeof usuario.nivel === "number")'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Breakpoints",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Pausar, inspecionar, avançar",
          html: `
            <p>Nas DevTools (aba <strong>Sources</strong>), clicar no número de uma linha coloca um <strong>breakpoint</strong>: a execução para ali. A partir daí você comanda o passo a passo:</p>
            <ul>
              <li><strong>Step over</strong> — executa a linha e para na próxima (sem entrar em funções).</li>
              <li><strong>Step into</strong> — entra na função chamada, para investigar por dentro.</li>
              <li><strong>Step out</strong> — termina a função atual e volta para quem a chamou.</li>
            </ul>
            <p>Enquanto está pausado, o painel <strong>Scope</strong> mostra as variáveis (como no laboratório) e o <strong>Call Stack</strong> mostra a pilha de chamadas — exatamente a estrutura do Módulo 20.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "debugger",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um breakpoint no código",
          html: `
            <p>A palavra-chave <code>debugger</code> é um breakpoint escrito no próprio código: quando as DevTools estão abertas, a execução pausa naquela linha. Útil para parar dentro de uma condição específica, sem procurar a linha na aba Sources:</p>`
        },
        {
          type: "code",
          file: "debugger.js",
          code: [
            "function processar(pedido) {",
            "  if (pedido.total < 0) {",
            "    debugger   // pausa aqui SE o total for negativo",
            "  }",
            "  return pedido.total * 1.1",
            "}"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "🧹",
          title: "Nunca em produção",
          html: `
            <p>Tanto <code>debugger</code> quanto <code>console.log</code> de depuração devem sair antes de o código ir para produção. Linters costumam avisar sobre eles — deixe que avisem.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Memória & performance",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quando o problema não é um erro",
          html: `
            <p>Nem todo bug lança exceção. Dois tipos silenciosos exigem ferramentas próprias:</p>
            <ul>
              <li><strong>Vazamentos de memória</strong> — referências que você esqueceu de soltar (um listener não removido, um cache que só cresce) impedem o garbage collector (Módulo 25) de liberar objetos. A aba <strong>Memory</strong> tira "snapshots" do heap para comparar o que ficou retido.</li>
              <li><strong>Lentidão</strong> — a aba <strong>Performance</strong> grava o que a página faz ao longo do tempo e mostra onde o JavaScript gastou mais, revelando a função culpada em vez de você chutar.</li>
            </ul>
            <p>Você não precisa dominá-las agora. Basta saber que existem: quando o sintoma for "está lento" ou "a memória só sobe", a resposta é medir, não adivinhar.</p>`
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
          heading: "O que o Scope mostra?",
          code: "function f() {\n  let x = 1\n  // ← pausado aqui, antes da próxima linha\n  let y = 2\n  return x + y\n}",
          question: "Pausado na linha indicada, o que o painel Scope mostra para y?",
          options: [
            { label: "y: undefined — ainda não foi declarado/atribuído", correct: true },
            { label: "y: 2 — o valor que terá" },
            { label: "y nem aparece no Scope" }
          ],
          okText: "<b>Certo.</b> O depurador mostra o estado <strong>naquele instante</strong>. A linha <code>let y = 2</code> ainda não executou, então <code>y</code> existe no escopo (hoisted) mas vale <code>undefined</code>. Essa é a diferença entre o que o código <em>vai</em> fazer e o que <em>já</em> fez.",
          noText: "<b>Pense no 'agora'.</b> O Scope reflete o momento da pausa, não o futuro. Como <code>let y = 2</code> ainda não rodou, <code>y</code> aparece como <code>undefined</code> — igual ao <code>total</code> no laboratório antes da atribuição."
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
          heading: "Desafio: ache o bug",
          html: `
            <p>A função devolve <code>NaN</code> em vez da média. Rode para ver, depois conserte. (Dica: adicione um <code>console.log(i, nums[i])</code> dentro do loop e observe a última iteração — ou pense no limite do índice.)</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            "function media(nums) {",
            "  let soma = 0",
            "  for (let i = 0; i <= nums.length; i++) {",
            "    soma += nums[i]",
            "  }",
            "  return soma / nums.length",
            "}",
            "",
            "console.log(media([10, 20, 30]))   // esperado 20, mas dá NaN"
          ].join("\n"),
          solution: [
            "function media(nums) {",
            "  let soma = 0",
            "  // o bug era <= : na última volta i = nums.length, e nums[i] é undefined",
            "  for (let i = 0; i < nums.length; i++) {",
            "    soma += nums[i]",
            "  }",
            "  return soma / nums.length",
            "}",
            "",
            "console.log(media([10, 20, 30]))   // 20 ✓"
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
            "Depurar é observar, não adivinhar: colete evidência antes de mudar o código.",
            "O console vai além do log: table, group, warn, error, count, time dão estrutura à investigação.",
            "Um breakpoint congela o programa; Step over/into/out controlam o passo a passo.",
            "O painel Scope mostra as variáveis no instante da pausa; o Call Stack mostra a pilha de chamadas (Módulo 20).",
            "A palavra debugger é um breakpoint no código — útil dentro de condições; remova antes de produção.",
            "Para vazamentos de memória e lentidão, use as abas Memory e Performance: meça, não chute."
          ]
        }
      ]
    }
  ]
};
