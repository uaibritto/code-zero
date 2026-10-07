/* ============================================================
   Léxico — Conteúdo do Módulo 17
   "Execution context & call stack"
   Estreia o bloco 'callstack': pilha de execução animada.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["execution-context"] = {
  title: "Execution context & call stack",
  lead: "Como o JavaScript sabe onde está no meio de dez funções chamando umas às outras? A resposta é a call stack — a estrutura que organiza a execução. Entendê-la ilumina erros, recursão e tudo o que vem no runtime.",

  steps: [
    /* 1 */
    {
      label: "Contexto de execução",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Cada chamada ganha seu mundo",
          html: `
            <p>Toda vez que uma função é chamada, o JavaScript cria um <strong>contexto de execução</strong>: um pequeno mundo próprio para aquela chamada, com suas variáveis, seus parâmetros e seu <code>this</code>. Quando a função termina, esse mundo é descartado.</p>
            <p>É por isso que variáveis de uma função não vazam para outra: cada chamada tem seu contexto isolado.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "📝",
          title: "Modelo mental: a folha de rascunho",
          html: `
            <p>Cada chamada de função é como pegar uma <strong>folha de rascunho nova</strong>. Você faz as contas daquela função ali, só com o que cabe na folha. Quando termina, entrega o resultado e <strong>joga a folha fora</strong> — o rascunho não sobrevive à chamada.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "A call stack",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A pilha que organiza a execução",
          html: `
            <p>Mas funções chamam outras funções. Como o JavaScript sabe para onde voltar quando uma termina? Ele empilha os contextos numa estrutura chamada <strong>call stack</strong> (pilha de chamadas).</p>
            <p>A função que está rodando fica no <strong>topo</strong>. Quando ela termina, é removida (pop) e o controle volta para a função logo abaixo — exatamente de onde tinha parado.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🍽️",
          title: "Modelo mental: a pilha de pratos",
          html: `
            <p>Pense numa pilha de pratos: você só mexe no prato do <strong>topo</strong>. O último prato empilhado é o primeiro a sair. Isso tem um nome: <strong>LIFO</strong> — <em>Last In, First Out</em> (último a entrar, primeiro a sair). A call stack funciona assim.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "A stack em ação",
      kind: "interactive",
      blocks: [
        {
          type: "callstack",
          heading: "Veja a pilha crescer e encolher",
          intro: "Avance a execução deste programa e acompanhe a call stack à direita: cada chamada empilha um contexto no topo; cada return o desempilha. Repare que a função mais interna é a primeira a terminar.",
          file: "programa.js",
          code: [
            "function multiplicar(a, b) {",
            "  return a * b",
            "}",
            "function quadrado(n) {",
            "  return multiplicar(n, n)",
            "}",
            "function imprimirQuadrado(n) {",
            "  const r = quadrado(n)",
            "  console.log(r)",
            "}",
            "imprimirQuadrado(4)"
          ],
          events: [
            { type: "push", frame: "main() — contexto global" },
            { type: "push", frame: "imprimirQuadrado(4)" },
            { type: "push", frame: "quadrado(4)" },
            { type: "push", frame: "multiplicar(4, 4)" },
            { type: "pop" },
            { type: "pop" },
            { type: "log", text: "16" },
            { type: "pop" },
            { type: "pop" }
          ]
        }
      ]
    },

    /* 4 */
    {
      label: "Ambiente léxico",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O que cada contexto carrega",
          html: `
            <p>Cada contexto na pilha guarda duas coisas importantes: um <strong>environment record</strong> — basicamente uma tabela com as variáveis daquele escopo — e um <strong>link para o ambiente de fora</strong>, o <em>lexical environment</em>.</p>
            <p>Esse link para fora você já viu em ação: é exatamente ele que permite o escopo léxico e as closures. A call stack e o escopo são dois lados da mesma moeda — a pilha organiza <em>quando</em> o código roda; o ambiente léxico organiza <em>o que</em> ele enxerga.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "Stack overflow",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quando a pilha enche",
          html: `
            <p>A call stack tem um tamanho máximo. Se uma função chama a si mesma sem nunca parar (recursão infinita), os contextos se empilham sem fim até estourar o limite — o famoso <strong>stack overflow</strong>. Rode e veja o erro:</p>`
        },
        {
          type: "runnable",
          file: "overflow.js",
          autorun: true,
          code: [
            'function semFim(n) {',
            '  return semFim(n + 1) // chama a si mesma, para sempre',
            '}',
            '',
            'semFim(1) // estoura a pilha'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "🧱",
          title: "Todo recursão precisa de um freio",
          html: `
            <p><code>RangeError: Maximum call stack size exceeded</code> é a pilha dizendo "cheia". Toda função recursiva precisa de um <strong>caso base</strong> — uma condição que a faça parar de se chamar. Sem ele, overflow garantido.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "quiz",
          heading: "Em que ordem?",
          code: 'function a() { console.log("a") }\nfunction b() { a(); console.log("b") }\nfunction c() { b(); console.log("c") }\nc()',
          question: "Chamando c(), em que ordem os logs aparecem?",
          options: [
            { label: "a, b, c", correct: true },
            { label: "c, b, a" },
            { label: "c, a, b" }
          ],
          okText: "<b>Certo.</b> <code>c()</code> chama <code>b()</code>, que chama <code>a()</code>. Como <code>a()</code> está no topo, termina primeiro e imprime <code>\"a\"</code>; a pilha desempilha para <code>b()</code> (<code>\"b\"</code>) e depois <code>c()</code> (<code>\"c\"</code>). Desempilha de dentro para fora.",
          noText: "<b>Siga a pilha.</b> <code>c</code> chama <code>b</code> chama <code>a</code>. A mais interna (<code>a</code>) está no topo e termina primeiro: <code>\"a\"</code>. Depois <code>\"b\"</code>, depois <code>\"c\"</code>."
        }
      ]
    },

    /* 7 */
    {
      label: "Stack traces",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O rastro que o erro deixa",
          html: `
            <p>Quando um erro acontece, ele carrega uma <strong>fotografia da call stack</strong> naquele instante — o caminho de chamadas que levou até ali. É isso que você lê num "stack trace": a trilha de funções, do ponto do erro até a origem. Rode:</p>`
        },
        {
          type: "runnable",
          file: "trace.js",
          autorun: true,
          code: [
            'function nivel3() {',
            '  throw new Error("algo quebrou")',
            '}',
            'function nivel2() { nivel3() }',
            'function nivel1() { nivel2() }',
            '',
            'try {',
            '  nivel1()',
            '} catch (e) {',
            '  console.log(e.message)',
            '  // e.stack mostra o caminho: nivel3 ← nivel2 ← nivel1',
            '}'
          ].join("\n")
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
          heading: "Desafio: fatorial recursivo",
          html: `
            <p>Escreva <code>fatorial(n)</code> de forma recursiva: <code>n * fatorial(n - 1)</code>, com o <strong>caso base</strong> de <code>n &lt;= 1</code> retornar <code>1</code>. Imprima <code>fatorial(5)</code> (deve dar 120). Cada chamada empilha um contexto — exatamente o que você viu no visualizador.</p>`
        },
        {
          type: "runnable",
          file: "fatorial.js",
          code: [
            '// fatorial(n) = n * fatorial(n - 1)',
            '// caso base: n <= 1 retorna 1',
            '// Imprima fatorial(5) // 120',
            ''
          ].join("\n"),
          solution: [
            'function fatorial(n) {',
            '  if (n <= 1) return 1        // caso base (freio)',
            '  return n * fatorial(n - 1) // passo recursivo',
            '}',
            '',
            'console.log(fatorial(5)) // 120'
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
            "Cada chamada de função cria um contexto de execução próprio, descartado ao terminar.",
            "A call stack empilha esses contextos; o do topo é o que está rodando (LIFO).",
            "Quando uma função retorna, seu contexto é desempilhado e o controle volta ao de baixo.",
            "Cada contexto guarda suas variáveis e um link para o ambiente externo — base do escopo e das closures.",
            "Recursão sem caso base enche a pilha e causa stack overflow (RangeError).",
            "O stack trace de um erro é a fotografia da pilha no momento da falha — leia-o para achar a origem."
          ]
        }
      ]
    }
  ]
};
