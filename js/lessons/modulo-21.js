/* ============================================================
   Léxico — Conteúdo do Módulo 21
   "Proxies, Reflect & coleções (Map/Set/WeakMap)"
   Estreia o bloco 'proxylab': Proxy ao vivo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["proxies-colecoes"] = {
  title: "Proxies, Reflect & coleções",
  lead: "O JavaScript moderno tem estruturas além de objetos e arrays — Map, Set e suas versões 'fracas' — e um poder que parece mágica: interceptar operações em objetos com Proxy. São ferramentas de quem conhece a linguagem a fundo.",

  steps: [
    /* 1 */
    {
      label: "Coleções modernas",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A ferramenta certa para cada dado",
          html: `
            <p>Objetos e arrays resolvem a maioria dos casos, mas às vezes outra estrutura serve melhor. O JavaScript moderno traz coleções especializadas: <strong>Map</strong> (pares chave-valor com chaves de qualquer tipo), <strong>Set</strong> (valores únicos), e versões "fracas" voltadas para memória.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧰",
          title: "Modelo mental: a caixa de ferramentas",
          html: `
            <p>O <strong>array</strong> é a lista ordenada; o <strong>objeto</strong> é a ficha de campos; o <strong>Map</strong> é o dicionário robusto; o <strong>Set</strong> é o saco de itens sem repetição. Escolher a estrutura certa deixa o código mais claro e eficiente.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Map",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Dicionário com chaves de qualquer tipo",
          html: `
            <p>Um <code>Map</code> guarda pares chave→valor, como um objeto, mas com superpoderes: a chave pode ser <strong>qualquer tipo</strong> (não só string), ele mantém a ordem de inserção, tem <code>.size</code> e é fácil de iterar. Rode:</p>`
        },
        {
          type: "runnable",
          file: "map.js",
          autorun: true,
          code: [
            'const mapa = new Map()',
            'mapa.set("nome", "Ana")',
            'mapa.set(42, "número como chave!")',
            '',
            'console.log(mapa.get("nome")) // "Ana"',
            'console.log(mapa.get(42))     // "número como chave!"',
            'console.log(mapa.size)        // 2',
            'console.log(mapa.has("nome")) // true'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Set",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma coleção sem repetições",
          html: `
            <p>Um <code>Set</code> guarda apenas valores <strong>únicos</strong> — duplicatas são ignoradas automaticamente. É a forma mais limpa de remover repetições de uma lista. Rode:</p>`
        },
        {
          type: "runnable",
          file: "set.js",
          autorun: true,
          code: [
            'const nums = [1, 2, 2, 3, 3, 3]',
            '',
            'const unicos = new Set(nums)',
            'console.log(unicos.size)  // 3',
            '',
            '// de volta para array com spread:',
            'console.log([...unicos])  // [1, 2, 3]'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "WeakMap & WeakSet",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Coleções que não seguram a memória",
          html: `
            <p><code>WeakMap</code> e <code>WeakSet</code> guardam referências <strong>fracas</strong>: se o único lugar que aponta para um objeto é o WeakMap, o coletor de lixo pode removê-lo normalmente. Suas chaves <strong>devem ser objetos</strong>, e eles não são iteráveis nem têm <code>.size</code> — justamente porque o conteúdo pode sumir a qualquer momento.</p>
            <p>Servem para associar dados a objetos (como um cache) sem impedir que esses objetos sejam liberados.</p>`
        },
        {
          type: "callout",
          variant: "info",
          icon: "🧹",
          title: "Memória vem a seguir",
          html: `
            <p>O "coletor de lixo" (garbage collector) e as referências que mantêm valores vivos são o tema do próximo módulo. Por ora, guarde: <strong>Weak</strong> = "não impeço este objeto de ser recolhido".</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "Proxy",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Interceptando operações",
          html: `
            <p>Um <code>Proxy</code> "embrulha" um objeto e <strong>intercepta</strong> operações feitas nele, através de armadilhas chamadas <strong>traps</strong> — como <code>get</code> (leitura) e <code>set</code> (escrita). Toda operação passa pelo seu código antes de chegar ao objeto real. Rode e veja a leitura ser interceptada:</p>`
        },
        {
          type: "runnable",
          file: "proxy.js",
          autorun: true,
          code: [
            'const alvo = { nome: "Ana" }',
            '',
            'const espiao = new Proxy(alvo, {',
            '  get(obj, chave) {',
            '    console.log("leram a propriedade:", chave)',
            '    return obj[chave]',
            '  }',
            '})',
            '',
            'espiao.nome // dispara o trap "get"'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Proxy em ação",
      kind: "interactive",
      blocks: [
        {
          type: "proxylab",
          heading: "Toda operação passa pela armadilha",
          intro: "Este Proxy registra cada leitura e escrita antes de repassá-la ao objeto real. Dispare as ações e veja os traps interceptarem — inclusive ao ler uma propriedade que não existe.",
          target: { nome: "Ana", idade: 28 },
          actions: [
            { label: "ler .nome", op: "get", key: "nome" },
            { label: "escrever .idade = 30", op: "set", key: "idade", value: 30 },
            { label: "ler .email (não existe)", op: "get", key: "email" },
            { label: "adicionar .cidade", op: "set", key: "cidade", value: "Recife" }
          ]
        }
      ]
    },

    /* 7 */
    {
      label: "Reflect",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O parceiro do Proxy",
          html: `
            <p><code>Reflect</code> oferece, como funções, as <strong>operações internas padrão</strong> dos objetos: <code>Reflect.get</code>, <code>Reflect.set</code>, <code>Reflect.has</code>… Ele é o parceiro natural do Proxy: dentro de um trap, você usa <code>Reflect</code> para "executar o comportamento normal" depois de interceptar. Rode:</p>`
        },
        {
          type: "runnable",
          file: "reflect.js",
          autorun: true,
          code: [
            'const obj = { x: 1 }',
            '',
            'console.log(Reflect.get(obj, "x"))  // 1',
            'Reflect.set(obj, "y", 2)',
            'console.log(obj)                     // { x: 1, y: 2 }',
            'console.log(Reflect.has(obj, "x"))   // true'
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
          heading: "Quantos sobram?",
          code: 'const s = new Set()\ns.add(1)\ns.add(1)\ns.add(2)\nconsole.log(s.size)',
          question: "Qual o size do Set no final?",
          options: [
            { label: "2", correct: true },
            { label: "3" },
            { label: "1" }
          ],
          okText: "<b>Certo.</b> Um <code>Set</code> ignora duplicatas: o segundo <code>add(1)</code> não faz nada. Sobram os valores <code>1</code> e <code>2</code>, então <code>size</code> é <code>2</code>.",
          noText: "<b>Set só guarda únicos.</b> <code>add(1)</code> duas vezes conta como um só. Com <code>1</code> e <code>2</code> dentro, o <code>size</code> é <code>2</code>."
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
          heading: "Desafio: contar os únicos",
          html: `
            <p>Dado um array de tags com repetições, imprima <strong>quantas tags únicas</strong> existem. A ferramenta ideal você acabou de ver.</p>`
        },
        {
          type: "runnable",
          file: "unicos.js",
          code: [
            'const tags = ["js", "ts", "js", "css", "ts", "js"]',
            '',
            '// Imprima quantas tags ÚNICAS existem.',
            ''
          ].join("\n"),
          solution: [
            'const tags = ["js", "ts", "js", "css", "ts", "js"]',
            '',
            'const unicas = new Set(tags)',
            'console.log(unicas.size) // 3'
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
            "Map guarda pares chave→valor com chaves de qualquer tipo, ordem e .size.",
            "Set guarda apenas valores únicos — ótimo para remover duplicatas.",
            "WeakMap/WeakSet usam referências fracas: não impedem o objeto de ser coletado.",
            "Proxy intercepta operações num objeto via traps como get e set.",
            "Reflect fornece as operações padrão como funções — parceiro do Proxy nos traps.",
            "Escolher a coleção certa (array, objeto, Map, Set) deixa o código mais claro."
          ]
        }
      ]
    }
  ]
};
