/* ============================================================
   Léxico — Conteúdo do Módulo 24
   "Web APIs"
   Estreia o bloco 'netflow': ciclo de vida de uma requisição fetch.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["web-apis"] = {
  title: "Web APIs",
  lead: "A linguagem JavaScript não sabe falar com a rede, agendar tarefas ou guardar dados. Quem dá esses superpoderes é o browser, através das Web APIs — ferramentas que o ambiente empresta ao seu código.",

  steps: [
    /* 1 */
    {
      label: "O que são",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A linguagem e o ambiente",
          html: `
            <p>Uma distinção que separa iniciantes de quem entende de verdade: <code>fetch</code>, <code>setTimeout</code>, <code>localStorage</code> e <code>document</code> <strong>não fazem parte da linguagem JavaScript</strong>. A especificação da linguagem (ECMAScript) define coisas como <code>Array</code>, <code>Promise</code> e <code>Math</code>. O resto vem do <strong>ambiente</strong> que roda seu código.</p>
            <p>No browser, esse ambiente oferece as <strong>Web APIs</strong>: um grande conjunto de ferramentas para a rede, o tempo, o armazenamento e a página. Por isso o mesmo <code>setTimeout</code> existe no browser e no Node — mas o <code>document</code> só existe no browser.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔌",
          title: "Modelo mental: as tomadas da casa",
          html: `
            <p>O JavaScript é um aparelho; as Web APIs são as tomadas da parede. O aparelho sabe funcionar, mas só liga quando plugado na infraestrutura do ambiente. Troque de casa (browser → servidor) e algumas tomadas somem, outras aparecem.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Timers",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Agendando o futuro",
          html: `
            <p><code>setTimeout(callback, ms)</code> pede ao browser para rodar o callback <strong>depois</strong> de um tempo mínimo. Ele não trava o código: agenda e segue em frente. Rode e repare na ordem — o <code>"fim"</code> aparece <strong>antes</strong> do que foi agendado, mesmo com <code>0ms</code>:</p>`
        },
        {
          type: "runnable",
          file: "timer.js",
          autorun: true,
          code: [
            'console.log("início")',
            '',
            'setTimeout(() => {',
            '  console.log("...passou o tempo!")',
            '}, 100)',
            '',
            'console.log("fim")'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "⏱️",
          title: "Lembra do event loop?",
          html: `
            <p>O callback do timer não fura a fila: ele só roda quando a pilha estiver vazia. Por isso o código síncrono (<code>"início"</code>, <code>"fim"</code>) sempre termina primeiro. Mesmo tema do Módulo 21, agora visto pela porta da Web API.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "JSON",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A língua franca da web",
          html: `
            <p>Dados viajam pela rede como <strong>texto</strong>, não como objetos JavaScript. O formato padrão é o <strong>JSON</strong>. Duas funções fazem a tradução: <code>JSON.stringify(obj)</code> transforma um objeto em texto; <code>JSON.parse(texto)</code> faz o caminho de volta. Rode:</p>`
        },
        {
          type: "runnable",
          file: "json.js",
          autorun: true,
          code: [
            'const usuario = { nome: "Ana", nivel: 7, ativo: true }',
            '',
            '// objeto → texto (para enviar/guardar)',
            'const texto = JSON.stringify(usuario)',
            'console.log(texto)',
            'console.log(typeof texto)',
            '',
            '// texto → objeto (ao receber)',
            'const devolta = JSON.parse(texto)',
            'console.log(devolta.nome, "tem nível", devolta.nivel)'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "fetch",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Pedindo dados pela rede",
          html: `
            <p><code>fetch(url)</code> faz uma requisição HTTP e retorna uma <strong>Promise</strong> (Módulo 22). Repare em duas etapas assíncronas: primeiro a resposta chega (<code>res</code>), depois você lê o corpo com <code>res.json()</code> — que também devolve uma Promise.</p>`
        },
        {
          type: "code",
          file: "fetch.js",
          code: [
            'fetch("https://api.exemplo.com/usuario/1")',
            '  .then((res) => res.json())   // lê o corpo → outra Promise',
            '  .then((dados) => {',
            '    console.log(dados.nome)',
            '  })',
            '  .catch((erro) => {',
            '    console.log("deu ruim:", erro.message)',
            '  })'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "⚠️",
          title: "Por que não roda aqui?",
          html: `
            <p>Este editor roda isolado, sem acesso à rede — então uma chamada real de <code>fetch</code> não funcionaria. Por isso o código acima é só para leitura. No próximo passo, um visualizador mostra exatamente o que aconteceria em cada etapa.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "Ciclo do fetch",
      kind: "interactive",
      blocks: [
        {
          type: "netflow",
          heading: "A viagem de uma requisição",
          intro: "Acompanhe uma chamada fetch do início ao fim. Repare no estado da Promise à medida que o pacote viaja entre o browser e o servidor.",
          stages: [
            { phase: "idle", title: 'fetch("/api/usuario") é chamado', detail: "A função retorna <strong>na hora</strong> uma Promise pendente. Seu código não trava.", packet: "📦" },
            { phase: "request", title: "A requisição viaja até o servidor", detail: "O browser envia o pedido HTTP pela rede.", packet: "📦" },
            { phase: "wait", title: "O servidor processa o pedido", detail: "Enquanto isso, seu JavaScript segue rodando outras coisas.", packet: "⚙️" },
            { phase: "response", title: "A resposta volta (200 OK)", detail: "Chega um objeto <code>Response</code> — mas o corpo ainda não foi lido.", packet: "📨" },
            { phase: "parse", title: "res.json() lê o corpo", detail: "Ler o corpo é <strong>outra</strong> etapa assíncrona: mais uma Promise.", packet: "{…}" },
            { phase: "done", title: "Promise resolvida com os dados", detail: "Agora você tem o objeto JavaScript pronto para usar.", packet: "✓" }
          ]
        }
      ]
    },

    /* 6 */
    {
      label: "async/await",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O mesmo fetch, mais legível",
          html: `
            <p>Com <code>async/await</code> (Módulo 22), as duas etapas assíncronas viram duas linhas que se leem de cima para baixo. <code>try/catch</code> cuida dos erros. É a forma mais comum hoje:</p>`
        },
        {
          type: "code",
          file: "fetch-async.js",
          code: [
            'async function carregarUsuario(id) {',
            '  try {',
            '    const res = await fetch(`/api/usuario/${id}`)',
            '    const dados = await res.json()',
            '    console.log(dados.nome)',
            '  } catch (erro) {',
            '    console.log("deu ruim:", erro.message)',
            '  }',
            '}',
            '',
            'carregarUsuario(1)'
          ].join("\n")
        }
      ]
    },

    /* 7 */
    {
      label: "localStorage",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Guardando dados no browser",
          html: `
            <p><code>localStorage</code> guarda pares chave→valor que sobrevivem ao recarregar a página. Duas pegadinhas: ele <strong>só guarda texto</strong> (números viram strings), e por isso costuma andar de mãos dadas com o JSON. Abaixo, um objeto <code>storage</code> imita a API real, em memória, para você rodar com segurança:</p>`
        },
        {
          type: "runnable",
          file: "storage.js",
          autorun: true,
          code: [
            '// "storage" imita o localStorage do browser (em memória)',
            'const storage = {',
            '  _dados: {},',
            '  setItem(chave, valor) { this._dados[chave] = String(valor) },',
            '  getItem(chave) { return this._dados[chave] ?? null }',
            '}',
            '',
            'storage.setItem("tema", "escuro")',
            'storage.setItem("visitas", 1 + 1)',
            '',
            'console.log(storage.getItem("tema"))     // "escuro"',
            'console.log(storage.getItem("visitas"))  // repare: string!',
            'console.log(storage.getItem("idioma"))   // null — não existe',
            '',
            '// guardando um objeto: use JSON',
            'storage.setItem("user", JSON.stringify({ nome: "Ana" }))',
            'const user = JSON.parse(storage.getItem("user"))',
            'console.log(user.nome)'
          ].join("\n")
        }
      ]
    },

    /* 8 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "quiz",
          heading: "O que fetch devolve?",
          code: 'const resultado = fetch("/api/dados")\nconsole.log(resultado)',
          question: "O que é impresso imediatamente por console.log(resultado)?",
          options: [
            { label: "Promise { <pending> }", correct: true },
            { label: "os dados da API" },
            { label: "undefined, até a resposta chegar" }
          ],
          okText: "<b>Certo.</b> <code>fetch</code> retorna <strong>na hora</strong> uma Promise pendente — os dados ainda não chegaram. Para obtê-los, você precisa de <code>.then()</code> ou <code>await</code>.",
          noText: "<b>Pense no retorno imediato.</b> <code>fetch</code> não espera a rede: devolve uma <code>Promise</code> pendente nesse exato instante. Os dados só existem depois, dentro de <code>.then()</code> ou após <code>await</code>."
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
          heading: "Desafio: salvar e restaurar",
          html: `
            <p>Use o <code>storage</code> abaixo para guardar o objeto <code>config</code> como JSON na chave <code>"config"</code>, depois leia de volta e imprima <code>config.tema</code> a partir do valor restaurado.</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            'const storage = {',
            '  _dados: {},',
            '  setItem(c, v) { this._dados[c] = String(v) },',
            '  getItem(c) { return this._dados[c] ?? null }',
            '}',
            'const config = { tema: "claro", fonte: 16 }',
            '',
            '// 1. guarde config como JSON na chave "config"',
            '// 2. leia de volta e faça o parse',
            '// 3. imprima o tema do objeto restaurado',
            ''
          ].join("\n"),
          solution: [
            'const storage = {',
            '  _dados: {},',
            '  setItem(c, v) { this._dados[c] = String(v) },',
            '  getItem(c) { return this._dados[c] ?? null }',
            '}',
            'const config = { tema: "claro", fonte: 16 }',
            '',
            'storage.setItem("config", JSON.stringify(config))',
            '',
            'const restaurado = JSON.parse(storage.getItem("config"))',
            'console.log(restaurado.tema)'
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
            "Web APIs são ferramentas do ambiente (o browser), não da linguagem JavaScript em si.",
            "setTimeout agenda um callback sem travar o código — ele respeita o event loop.",
            "JSON.stringify converte objeto → texto; JSON.parse faz texto → objeto.",
            "fetch(url) retorna uma Promise; ler o corpo com res.json() é uma segunda etapa assíncrona.",
            "async/await deixa o fluxo do fetch legível de cima para baixo, com try/catch para erros.",
            "localStorage guarda pares chave→valor como texto; combine com JSON para salvar objetos."
          ]
        }
      ]
    }
  ]
};
