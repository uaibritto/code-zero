/* ============================================================
   Léxico — Conteúdo do Módulo 15
   "Tratamento de erros"
   Estreia o bloco 'tryflow': fluxo do try/catch/finally.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["erros"] = {
  title: "Tratamento de erros",
  lead: "Programas falham: uma API cai, um dado vem torto, uma conta não bate. A diferença entre um software frágil e um robusto não é a ausência de erros — é o que acontece quando eles surgem. Aqui você aprende a reagir, em vez de quebrar.",

  steps: [
    /* 1 */
    {
      label: "Erros acontecem",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um erro não tratado derruba o programa",
          html: `
            <p>Lá no começo você viu um <code>ReferenceError</code> interromper a execução. Quando um erro surge e <strong>ninguém o trata</strong>, ele "sobe" pelo programa e, se não for pego, derruba tudo a partir dali.</p>
            <p>Tratar erros é decidir, de propósito, o que fazer quando algo dá errado — mostrar uma mensagem amigável, tentar de novo, registrar o problema — em vez de deixar a aplicação simplesmente travar.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🎪",
          title: "Modelo mental: a rede do trapezista",
          html: `
            <p>O trecho arriscado do código é o número do trapézio. O <strong>catch</strong> é a rede de segurança embaixo. Se o trapezista cai (um erro é lançado), a rede o segura e o espetáculo continua — em vez de o show terminar em desastre.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "try / catch",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Cercando o código arriscado",
          html: `
            <p>Você coloca o código que <strong>pode</strong> falhar dentro de um bloco <code>try</code>. Se algo der errado ali, o controle salta imediatamente para o bloco <code>catch</code>, que recebe o objeto de erro e decide o que fazer. O programa não quebra. Rode:</p>`
        },
        {
          type: "runnable",
          file: "try-catch.js",
          autorun: true,
          code: [
            'try {',
            '  const dados = JSON.parse("isto não é json")',
            '  console.log(dados)',
            '} catch (erro) {',
            '  console.log("Deu erro, mas tratei:", erro.message)',
            '}',
            '',
            'console.log("O programa continua normalmente")'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Fluxo do try/catch",
      kind: "interactive",
      blocks: [
        {
          type: "tryflow",
          heading: "Quais linhas rodam em cada caso?",
          intro: "Alterne entre os dois cenários e observe o caminho da execução. Preste atenção especial no <code>finally</code> — ele roda nos dois casos.",
          code: [
            "try {",
            '  console.log("1. tentando...")',
            "  fazerAlgo() // pode dar erro",
            '  console.log("2. deu certo")',
            "} catch (erro) {",
            '  console.log("3. peguei:", erro.message)',
            "} finally {",
            '  console.log("4. isto SEMPRE roda")',
            "}"
          ],
          scenarios: {
            ok: {
              label: "Tudo certo",
              runs: [0, 1, 2, 3, 6, 7, 8],
              out: ["1. tentando...", "2. deu certo", "4. isto SEMPRE roda"],
              tone: "ok",
              note: "<strong>Sem erro:</strong> o <code>try</code> roda até o fim, o <code>catch</code> é completamente pulado, e o <code>finally</code> roda ao final."
            },
            err: {
              label: "Dá erro",
              runs: [0, 1, 2, 4, 5, 6, 7, 8],
              out: ["1. tentando...", "3. peguei: algo falhou", "4. isto SEMPRE roda"],
              tone: "err",
              note: "<strong>Com erro:</strong> a linha que falha interrompe o <code>try</code> (o <code>\"2. deu certo\"</code> é pulado), o controle salta para o <code>catch</code>, e o <code>finally</code> roda mesmo assim. É por isso que o <code>finally</code> serve para limpeza: ele acontece aconteça o que acontecer."
            }
          }
        }
      ]
    },

    /* 4 */
    {
      label: "throw",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Lançando seus próprios erros",
          html: `
            <p>Você não precisa esperar o JavaScript falhar — pode <strong>lançar</strong> um erro de propósito com <code>throw</code> quando detecta algo inválido na sua lógica. Como o <code>return</code>, o <code>throw</code> interrompe a função na hora; o erro então sobe até encontrar um <code>catch</code>. Rode:</p>`
        },
        {
          type: "runnable",
          file: "throw.js",
          autorun: true,
          code: [
            'function sacar(saldo, valor) {',
            '  if (valor > saldo) {',
            '    throw new Error("Saldo insuficiente")',
            '  }',
            '  return saldo - valor',
            '}',
            '',
            'try {',
            '  sacar(100, 500)',
            '} catch (erro) {',
            '  console.log("Bloqueado:", erro.message)',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "O objeto Error",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "name e message",
          html: `
            <p>O que o <code>catch</code> recebe é um <strong>objeto de erro</strong>. Ele carrega duas informações essenciais: <code>name</code> (o tipo do erro — <code>Error</code>, <code>TypeError</code>, <code>RangeError</code>…) e <code>message</code> (a descrição). Ler esses dois resolve a maioria dos problemas. Rode:</p>`
        },
        {
          type: "runnable",
          file: "error.js",
          autorun: true,
          code: [
            'try {',
            '  const x = null',
            '  x.foo // acessar propriedade de null: erro real',
            '} catch (erro) {',
            '  console.log(erro.name)    // "TypeError"',
            '  console.log(erro.message) // descrição do problema',
            '}'
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
          type: "predict",
          heading: "A ordem da execução",
          code: 'try {\n  throw new Error("x")\n  console.log("A")\n} catch (e) {\n  console.log("B")\n} finally {\n  console.log("C")\n}',
          question: "O que é impresso, e em que ordem?",
          options: [
            { label: "B e C", correct: true },
            { label: "A, B e C" },
            { label: "apenas B" }
          ],
          okText: "<b>Certo.</b> O <code>throw</code> interrompe o <code>try</code> antes de <code>\"A\"</code> (que nunca roda), salta para o <code>catch</code> imprimindo <code>\"B\"</code>, e o <code>finally</code> — que sempre roda — imprime <code>\"C\"</code>. Ordem: B, C.",
          noText: "<b>O throw corta o try.</b> A linha <code>\"A\"</code> nunca é alcançada. Vai direto para o <code>catch</code> (<code>\"B\"</code>) e depois o <code>finally</code>, que sempre executa (<code>\"C\"</code>). Então: B e C."
        }
      ]
    },

    /* 7 */
    {
      label: "Erros customizados",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Criando seus próprios tipos de erro",
          html: `
            <p>Lembra que classes podem estender outras? Você pode criar <strong>tipos de erro próprios</strong> estendendo <code>Error</code>. Isso deixa claro <em>o que</em> deu errado e permite tratar cada tipo de forma diferente — distinguir, por exemplo, um erro de validação de um erro de rede. Rode:</p>`
        },
        {
          type: "runnable",
          file: "customizado.js",
          autorun: true,
          code: [
            'class ValidacaoError extends Error {',
            '  constructor(mensagem) {',
            '    super(mensagem)',
            '    this.name = "ValidacaoError"',
            '  }',
            '}',
            '',
            'try {',
            '  throw new ValidacaoError("E-mail inválido")',
            '} catch (erro) {',
            '  console.log(erro.name)              // "ValidacaoError"',
            '  console.log(erro.message)           // "E-mail inválido"',
            '  console.log(erro instanceof Error)  // true',
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
          heading: "Desafio: a divisão segura",
          html: `
            <p>Escreva <code>dividir(a, b)</code> que <strong>lança</strong> um erro se <code>b</code> for <code>0</code>, e retorna <code>a / b</code> caso contrário. Depois chame-a dentro de um <code>try/catch</code>, testando um caso válido e a divisão por zero, imprimindo a mensagem do erro.</p>`
        },
        {
          type: "runnable",
          file: "dividir.js",
          code: [
            '// dividir(a, b):',
            '//  - se b === 0, lance um Error("divisão por zero")',
            '//  - senão, retorne a / b',
            '// Chame dentro de try/catch para 10/2 e 10/0.',
            ''
          ].join("\n"),
          solution: [
            'function dividir(a, b) {',
            '  if (b === 0) {',
            '    throw new Error("divisão por zero")',
            '  }',
            '  return a / b',
            '}',
            '',
            'try {',
            '  console.log(dividir(10, 2)) // 5',
            '  console.log(dividir(10, 0)) // lança',
            '} catch (erro) {',
            '  console.log("Erro:", erro.message)',
            '}'
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
            "Um erro não tratado interrompe a execução e pode derrubar o programa.",
            "try cerca o código arriscado; catch recebe o erro e decide o que fazer.",
            "finally sempre roda — com ou sem erro —, ideal para limpeza.",
            "throw lança um erro de propósito e interrompe a função, como um return abrupto.",
            "O objeto de erro traz name (o tipo) e message (a descrição).",
            "Estender Error cria tipos de erro próprios, deixando claro o que falhou."
          ]
        }
      ]
    }
  ]
};
