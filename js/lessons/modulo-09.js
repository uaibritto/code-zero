/* ============================================================
   Léxico — Conteúdo do Módulo 09
   "Funções"
   Estreia o bloco 'funcmachine': máquina de função ao vivo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["funcoes"] = {
  title: "Funções",
  lead: "Se há um conceito central em toda a programação, é este. Funções empacotam um pedaço de lógica com um nome, para você reusar sem repetir. Entendê-las bem é destravar quase tudo o que vem depois — closures, callbacks, programação assíncrona.",

  steps: [
    /* 1 */
    {
      label: "O que é uma função",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um pacote de instruções com nome",
          html: `
            <p>Uma <strong>função</strong> é um bloco de código que você define uma vez e executa quantas vezes quiser. Em vez de repetir a mesma lógica em cinco lugares, você a embrulha numa função, dá um nome e a <strong>chama</strong> quando precisa.</p>
            <p>A forma mais útil de pensar nela é como uma <strong>máquina</strong>: você fornece alguns valores de entrada, ela faz um trabalho interno, e devolve um resultado de saída. Entrada → processo → saída.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: a receita nomeada",
          html: `
            <p>Lembra do algoritmo do sanduíche, lá no começo? Uma função é esse algoritmo com um nome na capa. Você não reescreve os passos toda vez — só diz "faça o sanduíche", passando os ingredientes (entradas) e recebendo o lanche pronto (saída).</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Declarar e chamar",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Definir uma vez, usar sempre",
          html: `
            <p>Você <strong>declara</strong> uma função com a palavra <code>function</code>, um nome e um bloco de código. Depois você a <strong>chama</strong> escrevendo o nome seguido de parênteses. Repare como a mesma função serve a entradas diferentes:</p>`
        },
        {
          type: "runnable",
          file: "declarar.js",
          autorun: true,
          code: [
            'function saudar(nome) {',
            '  return "Olá, " + nome + "!"',
            '}',
            '',
            'console.log(saudar("Ana"))',
            'console.log(saudar("Bruno"))'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Máquina de função",
      kind: "interactive",
      blocks: [
        {
          type: "funcmachine",
          heading: "Entra argumento, sai resultado",
          intro: "Esta função soma dois números. Pense nela como uma máquina: mude os valores de <code>a</code> e <code>b</code>, clique em chamar e veja o que ela devolve. Experimente com números, textos (entre aspas) e veja o que acontece.",
          name: "somar",
          params: ["a", "b"],
          body: "return a + b",
          display: ["function somar(a, b) {", "  return a + b", "}"].join("\n"),
          inputs: [{ label: "a", value: "3" }, { label: "b", value: "4" }]
        }
      ]
    },

    /* 4 */
    {
      label: "Parâmetros e argumentos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Os dois nomes da mesma coisa",
          html: `
            <p>Dois termos que confundem, mas são simples: o <strong>parâmetro</strong> é o nome que aparece na <em>definição</em> da função (o espaço reservado); o <strong>argumento</strong> é o valor real que você passa na <em>chamada</em>.</p>
            <p>Você também pode dar um <strong>valor padrão</strong> a um parâmetro, usado quando o argumento não é informado. Rode:</p>`
        },
        {
          type: "runnable",
          file: "parametros.js",
          autorun: true,
          code: [
            '// nome é o parâmetro; tem um valor padrão',
            'function saudar(nome = "visitante") {',
            '  return "Olá, " + nome',
            '}',
            '',
            'console.log(saudar("Ana")) // argumento informado',
            'console.log(saudar())      // usa o padrão'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "return",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Devolvendo um valor",
          html: `
            <p>O <code>return</code> é como a função <strong>entrega seu resultado</strong> para quem a chamou. E ele faz mais uma coisa: <strong>encerra a função na hora</strong> — qualquer código depois dele é ignorado.</p>
            <p>Se uma função não tem <code>return</code>, ela devolve <code>undefined</code>. Rode e confira os dois casos:</p>`
        },
        {
          type: "runnable",
          file: "return.js",
          autorun: true,
          code: [
            'function dobro(n) {',
            '  return n * 2',
            '  console.log("isto nunca roda") // após o return',
            '}',
            '',
            'console.log(dobro(5)) // 10',
            '',
            'function semReturn() {',
            '  const x = 10',
            '}',
            'console.log(semReturn()) // undefined'
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
          heading: "O return que para tudo",
          code: 'function teste() {\n  return 1\n  return 2\n}\nconsole.log(teste())',
          question: "A função tem dois return. O que é impresso?",
          options: [
            { label: "1", correct: true },
            { label: "2" },
            { label: "1 e 2" }
          ],
          okText: "<b>Exato.</b> O primeiro <code>return 1</code> entrega o valor e <strong>encerra</strong> a função imediatamente. A linha <code>return 2</code> nunca é alcançada. Por isso código depois de um return é inútil — e muitas vezes um sinal de bug.",
          noText: "<b>Lembre: return encerra a função.</b> Assim que <code>return 1</code> roda, a função devolve <code>1</code> e para ali mesmo. O <code>return 2</code> jamais é executado."
        }
      ]
    },

    /* 7 */
    {
      label: "Arrow functions",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma sintaxe mais curta",
          html: `
            <p>As <strong>arrow functions</strong> (funções de seta) são uma forma mais enxuta de escrever funções, muito comum no código moderno. Quando o corpo é só um <code>return</code>, você pode omitir as chaves e a própria palavra <code>return</code> — é o <strong>retorno implícito</strong>. Compare as duas versões da mesma função:</p>`
        },
        {
          type: "codetabs",
          caption: "A mesma função, duas sintaxes:",
          tabs: [
            {
              label: "Função tradicional",
              file: "dobro.js",
              code: ["function dobro(n) {", "  return n * 2", "}"].join("\n"),
              note: "A forma clássica, com a palavra <code>function</code> e um <code>return</code> explícito."
            },
            {
              label: "Arrow function",
              file: "dobro.js",
              code: ["const dobro = (n) => n * 2"].join("\n"),
              note: "Mais curta: sem chaves e sem <code>return</code> (retorno implícito). Note que guardamos a função numa <code>const</code> — porque funções são valores, como você verá a seguir."
            }
          ]
        }
      ]
    },

    /* 8 */
    {
      label: "Funções como valores",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Funções são valores — e isso muda tudo",
          html: `
            <p>Aqui está uma ideia poderosa: no JavaScript, <strong>uma função é um valor como qualquer outro</strong>. Dá para guardá-la numa variável, e — o mais importante — dá para <strong>passá-la como argumento</strong> para outra função.</p>
            <p>Uma função passada assim, para ser executada mais tarde por outra, é chamada de <strong>callback</strong>. Rode e veja uma função recebendo outra:</p>`
        },
        {
          type: "runnable",
          file: "callback.js",
          autorun: true,
          code: [
            'function repetir(vezes, acao) {',
            '  for (let i = 1; i <= vezes; i++) {',
            '    acao(i) // chama a função recebida',
            '  }',
            '}',
            '',
            'repetir(3, function (n) {',
            '  console.log("Executando #" + n)',
            '})'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: “me avise quando”",
          html: `
            <p>Um callback é como deixar um recado: "quando chegar a hora, execute isto para mim". Você entrega a função a quem controla o momento certo, e ela chama de volta (<em>call back</em>) na hora apropriada. Esse padrão é a base de eventos e de todo o código assíncrono que vem adiante.</p>`
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
          heading: "Desafio: a função dobro",
          html: `
            <p>Crie uma função chamada <code>dobro</code> que recebe um número e <strong>retorna</strong> o dobro dele. Depois imprima o resultado de <code>dobro(21)</code>. (Pode usar a forma tradicional ou arrow — você escolhe.)</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            '// Crie dobro(n) que RETORNA n * 2',
            '// e imprima dobro(21)',
            ''
          ].join("\n"),
          solution: [
            'function dobro(n) {',
            '  return n * 2',
            '}',
            '',
            'console.log(dobro(21)) // 42',
            '',
            '// Versão arrow equivalente:',
            '// const dobro = (n) => n * 2'
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
            "Uma função empacota lógica com um nome: entrada → processo → saída.",
            "Declara-se com function (ou arrow) e executa-se chamando o nome com ().",
            "Parâmetro é o nome na definição; argumento é o valor passado na chamada.",
            "return entrega o resultado e encerra a função; sem return, ela devolve undefined.",
            "Arrow functions são mais curtas e podem ter retorno implícito.",
            "Funções são valores: podem ser guardadas e passadas como argumento (callbacks)."
          ]
        }
      ]
    }
  ]
};
