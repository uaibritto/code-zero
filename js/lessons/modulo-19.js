/* ============================================================
   Léxico — Conteúdo do Módulo 19
   "Promises e async/await"
   Estreia o bloco 'promiseviz': estados de uma Promise.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["promises-async-await"] = {
  title: "Promises e async/await",
  lead: "Agora que você entende o event loop, pode dominar as ferramentas que todo JavaScript moderno usa para lidar com o tempo: Promises e async/await. Elas transformam código assíncrono emaranhado em algo que se lê quase como código normal.",

  steps: [
    /* 1 */
    {
      label: "O problema dos callbacks",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Do caos dos callbacks às Promises",
          html: `
            <p>Antes das Promises, código assíncrono se encadeava com callbacks dentro de callbacks dentro de callbacks — o infame "callback hell". Difícil de ler, difícil de tratar erros, difícil de manter.</p>
            <p>Uma <strong>Promise</strong> é um objeto que representa um <strong>valor que vai existir no futuro</strong>. Em vez de passar um callback para "quando terminar", você recebe um objeto que promete entregar o resultado — e nele você pluga o que fazer quando chegar.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🎫",
          title: "Modelo mental: o comprovante da lanchonete",
          html: `
            <p>Você pede um lanche e recebe um <strong>comprovante com número</strong>. O lanche não está pronto, mas o comprovante é a <em>promessa</em> de que estará. Você pode guardá-lo, repassá-lo, e combinar "quando chamarem meu número, eu busco". A Promise é esse comprovante: um objeto que você segura agora por um valor que chega depois.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O que é uma Promise",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um valor que chega depois",
          html: `
            <p>Uma Promise tem três estados: <strong>pending</strong> (pendente, ainda sem resultado), <strong>fulfilled</strong> (resolvida com sucesso) ou <strong>rejected</strong> (falhou). Você reage ao sucesso com <code>.then</code>. Rode e veja o valor chegar depois de meio segundo:</p>`
        },
        {
          type: "runnable",
          file: "promise.js",
          autorun: true,
          code: [
            'const promessa = new Promise((resolve) => {',
            '  setTimeout(() => resolve("dados chegaram!"), 500)',
            '})',
            '',
            'console.log("esperando...")',
            'promessa.then((valor) => {',
            '  console.log("recebi:", valor)',
            '})'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Estados de uma Promise",
      kind: "interactive",
      blocks: [
        {
          type: "promiseviz",
          heading: "Do pending ao valor final",
          intro: "Avance e veja a Promise sair de <em>pending</em>, resolver com um valor, e esse valor fluir por cada <code>.then</code> da cadeia. Repare no fim: sem erro, o <code>.catch</code> é pulado.",
          chain: ["  .then(n => n * 2)", "  .then(n => n + 1)", "  .catch(err => trata(err))"],
          steps: [
            { state: "pending", value: "—", note: "A Promise nasce <strong>pending</strong>: o resultado ainda não existe. Ela promete entregar um valor no futuro." },
            { state: "fulfilled", value: "10", note: "A Promise é <strong>resolvida</strong> (fulfilled) com o valor <code>10</code>. Agora a cadeia de handlers começa a rodar." },
            { state: "fulfilled", value: "20", active: 0, note: "O primeiro <code>.then</code> recebe <code>10</code> e retorna <code>10 * 2 = 20</code>. Esse novo valor desce na cadeia." },
            { state: "fulfilled", value: "21", active: 1, note: "O segundo <code>.then</code> recebe <code>20</code> e retorna <code>20 + 1 = 21</code>." },
            { state: "fulfilled", value: "21", skipped: 2, note: "Como <strong>nenhum erro</strong> ocorreu, o <code>.catch</code> é pulado. Se qualquer <code>.then</code> tivesse falhado, o valor saltaria direto para ele." }
          ]
        }
      ]
    },

    /* 4 */
    {
      label: "then, catch, chaining",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Encadeando transformações",
          html: `
            <p>Cada <code>.then</code> recebe o valor anterior e pode devolver um novo, que desce para o próximo <code>.then</code> — exatamente o que você viu no visualizador. Se algo falhar em qualquer ponto, o fluxo pula direto para o <code>.catch</code>. Rode:</p>`
        },
        {
          type: "runnable",
          file: "chaining.js",
          autorun: true,
          code: [
            'Promise.resolve(10)',
            '  .then(n => n * 2)   // 20',
            '  .then(n => n + 1)   // 21',
            '  .then(n => console.log("resultado:", n))',
            '  .catch(err => console.log("erro:", err))'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "async / await",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Assíncrono que se lê como síncrono",
          html: `
            <p><code>async</code>/<code>await</code> é açúcar sintático sobre Promises. Uma função <code>async</code> pode usar <code>await</code> para <strong>pausar</strong> até uma Promise resolver, recebendo o valor direto — sem <code>.then</code>. O código fica linear, fácil de ler, e erros voltam ao bom e velho <code>try/catch</code>. Importante: isso <strong>não bloqueia</strong> a thread; por baixo, continua o event loop. Rode:</p>`
        },
        {
          type: "runnable",
          file: "async-await.js",
          autorun: true,
          code: [
            'function buscarDados() {',
            '  return new Promise(resolve => {',
            '    setTimeout(() => resolve("usuário carregado"), 400)',
            '  })',
            '}',
            '',
            'async function main() {',
            '  console.log("início")',
            '  const dados = await buscarDados() // pausa aqui',
            '  console.log(dados)',
            '  console.log("fim")',
            '}',
            '',
            'main()'
          ].join("\n")
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
          heading: "Onde o await pausa?",
          code: 'async function f() {\n  console.log("2")\n  await Promise.resolve()\n  console.log("4")\n}\nconsole.log("1")\nf()\nconsole.log("3")',
          question: "Qual a ordem dos logs?",
          options: [
            { label: "1, 2, 3, 4", correct: true },
            { label: "1, 2, 4, 3" },
            { label: "2, 1, 3, 4" }
          ],
          okText: "<b>Certo.</b> <code>1</code> roda; <code>f()</code> imprime <code>2</code> e então o <code>await</code> pausa a função — tudo depois dele (<code>4</code>) vira uma microtask. O síncrono continua: <code>3</code>. Só depois roda <code>4</code>. Ordem: 1, 2, 3, 4.",
          noText: "<b>O await devolve o controle.</b> Antes dele, <code>f</code> roda normal (2). No <code>await</code>, <code>f</code> pausa e o resto (4) vira microtask; o código síncrono segue (3). Por isso: 1, 2, 3, 4."
        }
      ]
    },

    /* 7 */
    {
      label: "Promise.all e amigos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Lidando com várias ao mesmo tempo",
          html: `
            <p>Quando você tem várias Promises independentes, não precisa esperar uma de cada vez. <code>Promise.all</code> dispara todas em paralelo e resolve quando <strong>todas</strong> terminam, devolvendo um array com os resultados. Rode:</p>`
        },
        {
          type: "runnable",
          file: "promise-all.js",
          autorun: true,
          code: [
            'const p1 = Promise.resolve("A")',
            'const p2 = new Promise(r => setTimeout(() => r("B"), 300))',
            'const p3 = Promise.resolve("C")',
            '',
            'Promise.all([p1, p2, p3]).then(resultados => {',
            '  console.log(resultados) // ["A","B","C"]',
            '})'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🧩",
          title: "A família Promise",
          html: `
            <p><code>Promise.all</code> — espera todas (falha se uma falhar). <code>Promise.allSettled</code> — espera todas, reportando sucesso ou falha de cada uma. <code>Promise.race</code> — resolve/rejeita com a <strong>primeira</strong> que terminar. <code>Promise.any</code> — resolve com a primeira que der <strong>certo</strong>.</p>`
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
          heading: "Desafio: aguarde o nome",
          html: `
            <p>A função <code>buscarNome()</code> devolve uma Promise que resolve com <code>"Ana"</code> após um tempo. Escreva uma função <code>async</code> que <code>await</code> esse resultado e o imprime — depois chame-a.</p>`
        },
        {
          type: "runnable",
          file: "aguarde.js",
          code: [
            'function buscarNome() {',
            '  return new Promise(r => setTimeout(() => r("Ana"), 300))',
            '}',
            '',
            '// Crie uma função async que aguarda buscarNome()',
            '// e imprime o nome. Depois chame-a.',
            ''
          ].join("\n"),
          solution: [
            'function buscarNome() {',
            '  return new Promise(r => setTimeout(() => r("Ana"), 300))',
            '}',
            '',
            'async function mostrar() {',
            '  const nome = await buscarNome()',
            '  console.log(nome) // "Ana"',
            '}',
            '',
            'mostrar()'
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
            "Uma Promise representa um valor futuro, com três estados: pending, fulfilled, rejected.",
            ".then reage ao sucesso e pode encadear transformações; .catch trata erros da cadeia inteira.",
            "async/await é açúcar sobre Promises: await pausa a função até resolver, sem bloquear a thread.",
            "Em funções async, erros se tratam com try/catch normal.",
            "O código após um await vira microtask — por isso o síncrono roda antes.",
            "Promise.all (todas), allSettled (todas com status), race (a primeira) e any (a primeira que dá certo)."
          ]
        }
      ]
    }
  ]
};
