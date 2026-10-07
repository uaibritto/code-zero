/* ============================================================
   Léxico — Conteúdo do Módulo 02
   "Como o código executa"
   Usa os blocos novos: 'layers' (diagrama clicável) e
   'classify' (classificar linguagem vs ambiente).
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["como-o-codigo-executa"] = {
  title: "Como o código executa",
  lead: "Você escreve texto. O processador só entende eletricidade — zeros e uns. Entre um e outro existe uma pilha de peças que quase ninguém explica no começo. Vamos abrir essa caixa-preta.",

  steps: [
    /* 1 */
    {
      label: "Do texto à máquina",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Seu código não é o que a máquina roda",
          html: `
            <p>No módulo anterior você viu que programar é escrever instruções. Mas há um detalhe incômodo: o processador do computador <strong>não entende JavaScript</strong>. Ele não entende português, inglês, nem nenhuma linguagem de programação. Ele entende apenas sinais elétricos — que representamos como <strong>zeros e uns</strong>.</p>
            <p>Então como o texto <code>const preco = 10</code> vira algo que a máquina executa? A resposta é que existe um tradutor no meio do caminho. E entender esse caminho muda completamente a forma como você enxerga bugs, performance e por que certas coisas funcionam em um lugar e quebram em outro.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: o tradutor simultâneo",
          html: `
            <p>Imagine que você fala português e precisa dar ordens a alguém que só entende uma língua alienígena. Você não aprende a língua alienígena — você contrata um <strong>tradutor simultâneo</strong> que ouve suas frases e as converte na hora.</p>
            <p>Seu código JavaScript é o português. O processador é o alienígena. O tradutor tem um nome: <strong>engine</strong>.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "A engine",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A engine: quem lê e executa seu código",
          html: `
            <p>Uma <strong>engine de JavaScript</strong> é um programa que lê seu código, traduz para instruções que o processador entende e as executa — otimizando tudo enquanto roda, para ganhar velocidade.</p>
            <p>Você provavelmente já usou várias sem saber. Cada navegador tem a sua, e elas seguem o mesmo padrão da linguagem, então o mesmo código funciona em todas.</p>`
        },
        {
          type: "callout",
          variant: "info",
          icon: "⚙️",
          title: "As engines que você já usou",
          html: `
            <p><strong>V8</strong> — Google Chrome, Microsoft Edge e o Node.js. <strong>SpiderMonkey</strong> — Firefox (foi a primeira engine de JavaScript da história). <strong>JavaScriptCore</strong> — Safari.</p>
            <p>São peças de engenharia gigantescas, mas o papel delas é simples de resumir: <strong>transformar seu texto em ação</strong>.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "quiz",
          heading: "Quem faz o trabalho?",
          question: "O que transforma seu código JavaScript em instruções que o processador executa?",
          options: [
            { label: "A engine (como a V8 ou a SpiderMonkey).", correct: true },
            { label: "O sistema operacional, sozinho." },
            { label: "O próprio arquivo .js, quando você o salva." }
          ],
          okText: "<b>Isso.</b> A engine é a peça que lê, traduz e executa. Salvar o arquivo não faz nada acontecer — é a engine, ao rodar, que dá vida ao código.",
          noText: "<b>Não é bem assim.</b> Salvar um arquivo só guarda texto no disco, e o sistema operacional não entende JavaScript. Quem faz a tradução e a execução é a engine — a resposta destacada."
        }
      ]
    },

    /* 4 */
    {
      label: "A engine não basta",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Runtime: dando superpoderes à engine",
          html: `
            <p>Aqui vem a parte que confunde quase todo mundo. A engine sabe <strong>a linguagem</strong> — variáveis, funções, contas, laços. Mas ela sozinha não sabe <strong>falar com o mundo</strong>: não sabe mostrar algo na tela, esperar 3 segundos, buscar dados na internet ou ler um arquivo.</p>
            <p>Essas capacidades extras vêm de fora, de uma camada chamada <strong>runtime</strong> (ambiente de execução). O runtime pega a engine e adiciona um conjunto de ferramentas ao redor dela.</p>`
        },
        {
          type: "callout",
          variant: "warn",
          icon: "💡",
          title: "JavaScript não é “o navegador”",
          html: `
            <p>Esse é um dos maiores mal-entendidos de quem começa. <code>console.log</code>, <code>setTimeout</code>, <code>fetch</code> e <code>document</code> <strong>não fazem parte da linguagem JavaScript</strong>. Eles são fornecidos pelo ambiente onde o código roda.</p>
            <p>É por isso que <code>document</code> funciona no navegador, mas quebra no Node.js.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "As camadas",
      kind: "concept",
      blocks: [
        {
          type: "layers",
          heading: "A pilha completa, camada por camada",
          intro: "Clique em cada camada para ver o que ela faz. De cima (o que você escreve) até embaixo (onde tudo roda):",
          layers: [
            {
              name: "Seu código",
              color: "var(--pink)",
              tag: "texto",
              desc: "O JavaScript que você escreve. Legível para humanos, mas sem nenhum sentido para o processador — é só texto até alguém traduzi-lo.",
              example: 'const preco = 10 * 2'
            },
            {
              name: "Engine",
              color: "var(--gold)",
              tag: "V8 · SpiderMonkey",
              desc: "Lê seu código, traduz para instruções de máquina e executa, otimizando enquanto roda. Entende o núcleo da linguagem: variáveis, funções, objetos, contas.",
            },
            {
              name: "Runtime",
              color: "var(--ts)",
              tag: "APIs extras",
              desc: "Envolve a engine e adiciona capacidades para interagir com o mundo: temporizadores, entrada e saída, rede. É a ponte entre a linguagem e o ambiente.",
              example: 'setTimeout(() => {}, 1000)'
            },
            {
              name: "Ambiente",
              color: "var(--purple)",
              tag: "Browser · Node · Deno · Bun",
              desc: "Onde tudo vive. No navegador você ganha o DOM e o fetch; no Node, acesso a arquivos e rede de servidor. Mesma linguagem, superpoderes diferentes.",
            }
          ],
          note: "Por isso <code>document.querySelector(...)</code> funciona no navegador mas quebra no Node: <code>document</code> vem do ambiente, não da linguagem."
        }
      ]
    },

    /* 6 */
    {
      label: "Linguagem ou ambiente?",
      kind: "exercise",
      blocks: [
        {
          type: "classify",
          heading: "De onde vem cada coisa?",
          question: "Classifique cada item: faz parte do núcleo da linguagem JavaScript, ou vem do ambiente onde o código roda?",
          buckets: [
            { id: "lang", label: "Núcleo da linguagem", short: "Linguagem" },
            { id: "env", label: "Vem do ambiente", short: "Ambiente" }
          ],
          items: [
            { text: "let e const", bucket: "lang" },
            { text: "for e while", bucket: "lang" },
            { text: "Math.max()", bucket: "lang" },
            { text: "setTimeout()", bucket: "env" },
            { text: "fetch()", bucket: "env" },
            { text: "document", bucket: "env" }
          ],
          okText: "A linguagem em si é surpreendentemente pequena: variáveis, controle de fluxo, funções, objetos e alguns embutidos como <code>Math</code>. Tudo que fala com o mundo — tela, rede, tempo — vem do ambiente.",
          noText: "Uma dica que quase nunca falha: se algo interage com o mundo fora do programa (tela, rede, arquivos, tempo), vem do ambiente. Se é uma regra pura de cálculo ou estrutura, é da linguagem."
        }
      ]
    },

    /* 7 */
    {
      label: "Um idioma, muitos lugares",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O mesmo JavaScript, ambientes diferentes",
          html: `
            <p>Como a linguagem é separada do ambiente, o mesmo JavaScript pode rodar em lugares muito diferentes. O que muda de um para o outro não é o idioma — são os superpoderes que cada ambiente oferece.</p>`
        },
        {
          type: "cards",
          cards: [
            { n: "🌐", title: "Navegador", text: "DOM, eventos, fetch, localStorage. Feito para páginas interativas na tela do usuário." },
            { n: "🖥️", title: "Node.js", text: "Sistema de arquivos, rede de servidor, processos. Feito para back-end, APIs e ferramentas." },
            { n: "🦕", title: "Deno & Bun", text: "Runtimes mais novos, com TypeScript nativo e foco em performance e segurança." },
            { n: "🔗", title: "Em comum", text: "Todos rodam a MESMA linguagem JavaScript. Muda o ambiente ao redor, não o idioma." }
          ]
        }
      ]
    },

    /* 8 */
    {
      label: "Desafio",
      kind: "challenge",
      blocks: [
        {
          type: "challenge",
          heading: "Junte as peças",
          prompt: "Com suas palavras: por que o mesmo código JavaScript pode rodar tanto no navegador quanto num servidor com Node.js? E por que document.querySelector(...) funciona em um, mas não no outro?",
          placeholder: "Escreva sua explicação...",
          model: `
            <p>A <strong>linguagem</strong> JavaScript é a mesma nos dois lugares — as regras de variáveis, funções, objetos e cálculos não mudam. Quem executa (a engine) segue o mesmo padrão em toda parte.</p>
            <p style="margin-top:10px">O que muda é o <strong>ambiente</strong> ao redor. O navegador oferece o DOM, incluindo o objeto <code>document</code>; o Node oferece acesso a arquivos e rede de servidor. Como <code>document</code> vem do ambiente do navegador — e não da linguagem —, ele existe lá, mas nunca foi definido no Node. Por isso <code>document.querySelector(...)</code> funciona no navegador e quebra no servidor.</p>`
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
            "O processador só entende zeros e uns — seu código precisa ser traduzido.",
            "A engine (V8, SpiderMonkey, JavaScriptCore) lê, traduz e executa o JavaScript.",
            "A engine conhece a linguagem, mas não sabe falar com o mundo sozinha.",
            "O runtime envolve a engine e adiciona capacidades: tempo, rede, entrada/saída.",
            "O ambiente (navegador, Node, Deno, Bun) define quais superpoderes existem.",
            "JavaScript não é o navegador: console.log, fetch e document vêm do ambiente."
          ]
        }
      ]
    }
  ]
};
