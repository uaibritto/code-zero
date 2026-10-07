/* ============================================================
   Léxico — Conteúdo do Módulo 13
   "Escopo e closures"
   Estreia o bloco 'scopeviz': cadeia de escopo visual.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["escopo-e-closures"] = {
  title: "Escopo e closures",
  lead: "Por que uma variável funciona num lugar e some em outro? Por que uma função parece 'lembrar' valores de muito tempo depois? As respostas estão em dois conceitos ligados — escopo e closures — que separam quem copia código de quem entende JavaScript.",

  steps: [
    /* 1 */
    {
      label: "O que é escopo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Onde uma variável existe",
          html: `
            <p><strong>Escopo</strong> é a região do código onde uma variável pode ser usada. Nem toda variável existe em todo lugar: uma criada dentro de uma função só vive ali dentro; uma criada no topo do arquivo vive em todo lugar (escopo global). Rode e veja o que acontece ao tentar usar uma variável fora do seu escopo:</p>`
        },
        {
          type: "runnable",
          file: "escopo.js",
          autorun: true,
          code: [
            'const global = "visível em todo lugar"',
            '',
            'function teste() {',
            '  const local = "só existe aqui dentro"',
            '  console.log(global) // enxerga o de fora',
            '  console.log(local)  // ok',
            '}',
            '',
            'teste()',
            'console.log(local) // erro: local não existe aqui fora'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: os cômodos da casa",
          html: `
            <p>Pense numa casa com cômodos. De dentro de um quarto, você enxerga a sala e o resto da casa (os escopos de fora). Mas, da sala, você <strong>não</strong> vê o que está dentro do quarto. O código funciona assim: de dentro você acessa o que está fora, mas de fora não acessa o que está dentro.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Escopo léxico",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Definido por onde o código é escrito",
          html: `
            <p>O JavaScript usa <strong>escopo léxico</strong>: o alcance de uma variável é determinado por <strong>onde ela é escrita</strong> no código — não por onde a função é chamada. Funções escritas dentro de outras enxergam as variáveis das externas, formando uma cadeia de dentro para fora. Rode:</p>`
        },
        {
          type: "runnable",
          file: "lexico.js",
          autorun: true,
          code: [
            'const mensagem = "oi do global"',
            '',
            'function externa() {',
            '  function interna() {',
            '    console.log(mensagem) // enxerga lá do global',
            '  }',
            '  interna()',
            '}',
            '',
            'externa()'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Cadeia de escopo",
      kind: "interactive",
      blocks: [
        {
          type: "scopeviz",
          heading: "Como o JavaScript procura uma variável",
          intro: "Quando você usa um nome, o JavaScript o procura começando pelo escopo mais interno e subindo até achar. Avance a busca por <code>nome</code> e veja o caminho — repare onde ele para.",
          scopes: [
            { label: "Escopo global", lines: ['const nome = "global"', 'const pais = "Brasil"'], declares: ["nome", "pais"] },
            { label: "função saudar()", lines: ['const saudacao = "Olá"'], declares: ["saudacao"] },
            { label: "bloco interno", lines: ['const nome = "local"', "console.log(nome)"], declares: ["nome"] }
          ],
          lookup: "nome",
          result: "local",
          note: "A busca começou no bloco mais interno e, como ele <strong>declara seu próprio</strong> <code>nome</code>, parou ali — sem nunca chegar ao <code>nome</code> global. Quando um escopo interno tem uma variável com o mesmo nome de uma externa, ele a 'esconde'. Isso se chama <strong>shadowing</strong>."
        }
      ]
    },

    /* 4 */
    {
      label: "Shadowing",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quando o de dentro esconde o de fora",
          html: `
            <p><strong>Shadowing</strong> (sombreamento) acontece quando um escopo interno declara uma variável com o mesmo nome de uma externa. Dentro daquele escopo, vale a de dentro; a de fora continua intacta, só fica "coberta". Rode:</p>`
        },
        {
          type: "runnable",
          file: "shadowing.js",
          autorun: true,
          code: [
            'const cor = "azul"',
            '',
            'function pintar() {',
            '  const cor = "vermelho" // esconde a de fora',
            '  console.log(cor)       // "vermelho"',
            '}',
            '',
            'pintar()',
            'console.log(cor)         // "azul" — a de fora, intacta'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Closures: o modelo mental",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Funções que lembram onde nasceram",
          html: `
            <p>Agora o conceito que assusta pelo nome, mas é intuitivo. Imagine uma função criada <strong>dentro</strong> de outra. Essa função interna nasceu num lugar que tinha certas variáveis à vista.</p>
            <p>O surpreendente: mesmo depois que a função externa termina de executar e "fecha as portas", a função interna <strong>continua enxergando aquelas variáveis</strong>. É como se ela tivesse guardado uma fotografia do ambiente onde foi criada. Esse comportamento tem um nome: <strong>closure</strong>.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🎒",
          title: "Modelo mental: a mochila",
          html: `
            <p>Toda função carrega uma <strong>mochila</strong> com as variáveis do lugar onde foi criada. Aonde quer que ela vá — passada como callback, retornada, chamada muito depois —, leva a mochila junto e pode usar o que há dentro. A closure é essa mochila que a função nunca larga.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Closure em ação",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um contador com memória",
          html: `
            <p>Veja o exemplo clássico. <code>criarContador</code> cria uma variável <code>count</code> e devolve uma função. Mesmo depois que <code>criarContador</code> termina, a função devolvida continua lembrando — e atualizando — aquele <code>count</code>. Rode e repare o número crescendo:</p>`
        },
        {
          type: "runnable",
          file: "contador.js",
          autorun: true,
          code: [
            'function criarContador() {',
            '  let count = 0',
            '  return function () {',
            '    count++',
            '    return count',
            '  }',
            '}',
            '',
            'const contar = criarContador()',
            'console.log(contar()) // 1',
            'console.log(contar()) // 2',
            'console.log(contar()) // 3'
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
          type: "predict",
          heading: "A memória da closure",
          code: 'function criar() {\n  let n = 0\n  return function () {\n    n = n + 1\n    return n\n  }\n}\nconst f = criar()\nf()\nf()\nconsole.log(f())',
          question: "f é chamada três vezes. O que a última linha imprime?",
          options: [
            { label: "3", correct: true },
            { label: "1" },
            { label: "undefined" }
          ],
          okText: "<b>Exato.</b> A closure mantém o mesmo <code>n</code> vivo entre as chamadas: a 1ª deixa <code>n = 1</code>, a 2ª <code>n = 2</code>, e a 3ª faz <code>n = 3</code> e retorna <code>3</code>. Esse estado que persiste e é privado é o superpoder das closures.",
          noText: "<b>A função lembra o n da mochila.</b> Cada chamada incrementa o <strong>mesmo</strong> <code>n</code>: 1, depois 2, depois 3. Como só a terceira chamada é impressa, aparece <code>3</code>."
        }
      ]
    },

    /* 8 */
    {
      label: "Por que importam",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Estado privado e contexto preservado",
          html: `
            <p>Closures não são curiosidade acadêmica — estão por toda parte. Elas permitem <strong>estado privado</strong> (dados que ninguém de fora consegue tocar), fazem callbacks <strong>lembrarem</strong> o contexto em que foram criados, e são a base de padrões modernos inteiros. Veja uma "conta" cujo saldo só pode ser mexido pelos métodos que ela expõe:</p>`
        },
        {
          type: "runnable",
          file: "privado.js",
          autorun: true,
          code: [
            'function criarConta(saldoInicial) {',
            '  let saldo = saldoInicial // privado pela closure',
            '  return {',
            '    depositar(valor) { saldo += valor },',
            '    ver() { return saldo }',
            '  }',
            '}',
            '',
            'const conta = criarConta(100)',
            'conta.depositar(50)',
            'console.log(conta.ver()) // 150',
            '// não há como ler "saldo" diretamente de fora'
          ].join("\n")
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
          heading: "Desafio: a fábrica de somadores",
          html: `
            <p>Escreva <code>makeAdder(x)</code>: uma função que <strong>retorna outra função</strong>, a qual soma <code>x</code> ao valor que receber. Depois crie <code>add5 = makeAdder(5)</code> e imprima <code>add5(3)</code> (deve dar 8). Repare que a função devolvida "lembra" o <code>x</code> — é uma closure.</p>`
        },
        {
          type: "runnable",
          file: "makeadder.js",
          code: [
            '// Crie makeAdder(x) que retorna uma função somando x ao argumento.',
            '// Depois: const add5 = makeAdder(5)',
            '// console.log(add5(3)) // 8',
            ''
          ].join("\n"),
          solution: [
            'function makeAdder(x) {',
            '  return function (y) {',
            '    return x + y',
            '  }',
            '}',
            '',
            'const add5 = makeAdder(5)',
            'console.log(add5(3))  // 8',
            'console.log(add5(10)) // 15'
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
            "Escopo é a região onde uma variável existe: global, de função ou de bloco.",
            "De dentro você enxerga o que está fora; de fora, não enxerga o que está dentro.",
            "Escopo léxico: o alcance é definido por onde o código é escrito, não de onde é chamado.",
            "A busca por um nome vai do escopo mais interno ao mais externo; shadowing esconde o de fora.",
            "Closure: uma função lembra as variáveis do lugar onde foi criada, mesmo depois que ele termina.",
            "Closures permitem estado privado e persistente — base de contadores, callbacks e muito mais."
          ]
        }
      ]
    }
  ]
};
