/* ============================================================
   Léxico — Conteúdo do Módulo 29
   "Narrowing"
   Estreia o bloco 'narrow': visualizador de estreitamento —
   cada guarda (typeof/in/else) elimina membros de uma união.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["narrowing"] = {
  title: "Narrowing",
  lead: "Uma união como string | number é honesta, mas desconfiada: ela só te deixa usar o que vale para todos os membros. O narrowing é como você prova ao TypeScript qual tipo é, em cada ponto do código — e aí ele libera o resto.",

  steps: [
    /* 1 */
    {
      label: "O problema",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A união é cautelosa",
          html: `
            <p>No Módulo 33 você viu: numa união <code>string | number</code>, o TypeScript só libera o que é comum aos dois. Você não pode chamar <code>.toUpperCase()</code>, porque <code>number</code> não tem esse método. Isso é segurança — mas trava você.</p>
            <p>A saída é o <strong>narrowing</strong> (estreitamento): dentro de um <code>if</code> que verifica o tipo, o TypeScript <strong>estreita</strong> a união para o que sobrou, e passa a liberar os métodos daquele tipo. Ele acompanha o fluxo do seu código.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔍",
          title: "Modelo mental: o funil",
          html: `
            <p>A união entra larga no topo do funil. Cada verificação (<code>typeof</code>, <code>in</code>, <code>else</code>) é um filtro que descarta possibilidades. Quanto mais fundo no funil, menos tipos restam — até o TypeScript saber exatamente com o que está lidando.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O funil",
      kind: "interactive",
      blocks: [
        {
          type: "narrow",
          heading: "Veja a união estreitar",
          intro: "Comece pela união completa e avance por cada guarda. Repare quais membros são <strong>eliminados</strong> (riscados) e qual sobra <strong>ativo</strong> (verde) — e o que fica seguro usar em cada ramo.",
          union: ["string", "number", "null"],
          branches: [
            { guard: 'if (typeof x === "string")', keep: ["string"], note: 'Dentro deste ramo, <code>x</code> é <code>string</code> → <code>x.toUpperCase()</code> é seguro.' },
            { guard: 'else if (typeof x === "number")', keep: ["number"], note: 'Aqui <code>x</code> é <code>number</code> → <code>x.toFixed(2)</code> é seguro.' },
            { guard: 'else', keep: ["null"], note: 'Eliminados <code>string</code> e <code>number</code>, só sobra <code>null</code>. O TypeScript deduz isso sozinho — sem você precisar escrever.' }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "typeof",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A guarda mais comum",
          html: `
            <p><code>typeof</code> (o operador do Módulo 04) é o estreitador padrão para primitivos. Dentro de cada ramo, o tipo de <code>x</code> já é o estreitado — e os métodos corretos ficam disponíveis sem reclamação:</p>`
        },
        {
          type: "code",
          file: "typeof.ts",
          code: [
            'function formatar(x: string | number) {',
            '  if (typeof x === "string") {',
            '    return x.toUpperCase()   // x é string aqui',
            '  }',
            '  return x.toFixed(2)        // só sobra number aqui',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "in e instanceof",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Estreitando objetos",
          html: `
            <p><code>typeof</code> resolve primitivos. Para objetos, há duas guardas:</p>
            <ul>
              <li><code>"campo" in obj</code> — estreita pela <strong>presença de uma propriedade</strong>.</li>
              <li><code>obj instanceof Classe</code> — estreita verificando de qual <strong>classe</strong> (Módulo 17) o objeto veio.</li>
            </ul>`
        },
        {
          type: "code",
          file: "guardas.ts",
          code: [
            'type Peixe = { nadar: () => void }',
            'type Passaro = { voar: () => void }',
            '',
            'function mover(animal: Peixe | Passaro) {',
            '  if ("nadar" in animal) {',
            '    animal.nadar()      // é Peixe',
            '  } else {',
            '    animal.voar()       // só sobra Passaro',
            '  }',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Uniões discriminadas",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O padrão mais poderoso",
          html: `
            <p>Dê a cada membro da união um campo literal em comum — um "crachá" (<code>tipo</code>, <code>kind</code>, <code>status</code>). Isso é uma <strong>união discriminada</strong>. Um <code>switch</code> nesse campo estreita o objeto inteiro em cada caso. É assim que se modela estado de verdade:</p>`
        },
        {
          type: "code",
          file: "discriminada.ts",
          code: [
            'type Estado =',
            '  | { tipo: "carregando" }',
            '  | { tipo: "ok"; dados: string }',
            '  | { tipo: "erro"; msg: string }',
            '',
            'function render(e: Estado) {',
            '  switch (e.tipo) {',
            '    case "carregando": return "..."',
            '    case "ok":    return e.dados   // só este caso tem .dados',
            '    case "erro":  return e.msg     // só este tem .msg',
            '  }',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Exaustividade",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "never como rede de segurança",
          html: `
            <p>Lembra do <code>never</code> (Módulo 32)? Aqui ele brilha. Se você cobre <strong>todos</strong> os casos de uma união discriminada, o que sobra no <code>default</code> tem tipo <code>never</code>. Atribuir isso a uma variável <code>never</code> faz o TypeScript <strong>reclamar no dia</strong> em que alguém adicionar um caso novo e esquecer de tratá-lo:</p>`
        },
        {
          type: "code",
          file: "exaustiva.ts",
          code: [
            'function render(e: Estado) {',
            '  switch (e.tipo) {',
            '    case "carregando": return "..."',
            '    case "ok":    return e.dados',
            '    case "erro":  return e.msg',
            '    default:',
            '      // se todos os casos foram cobertos, e é never aqui',
            '      const _exaustivo: never = e',
            '      return _exaustivo',
            '  }',
            '}'
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
          type: "quiz",
          heading: "O que sobra no else?",
          code: 'function f(x: string | number | boolean) {\n  if (typeof x === "string") { /* ... */ }\n  else if (typeof x === "number") { /* ... */ }\n  else {\n    // qual o tipo de x aqui?\n  }\n}',
          question: "Dentro do else final, qual é o tipo de x?",
          options: [
            { label: "boolean", correct: true },
            { label: "string | number | boolean" },
            { label: "never" }
          ],
          okText: "<b>Certo.</b> Os dois primeiros ramos eliminaram <code>string</code> e <code>number</code>. O TypeScript acompanha o fluxo e deduz que, no <code>else</code>, só pode restar <code>boolean</code> — sem você escrever nada.",
          noText: "<b>Siga o funil.</b> O <code>if</code> tirou <code>string</code>; o <code>else if</code> tirou <code>number</code>. Da união <code>string | number | boolean</code>, sobra exatamente um membro no <code>else</code>: <code>boolean</code>."
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
          heading: "Desafio: use antes de estreitar",
          html: `
            <p>O código abaixo tenta usar um método específico <strong>antes</strong> de verificar o tipo. Preveja qual linha o TypeScript recusa — e lembre: a correção é envolver o uso num <code>if (typeof ...)</code>.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'function tamanho(x: string | number) {',
            '  return x.length',
            '}',
            '',
            'console.log(tamanho("café"))',
            'console.log(tamanho(42))'
          ],
          errors: {
            "1": "Property 'length' does not exist on type 'string | number'. (number não tem .length — estreite com typeof primeiro)"
          },
          js: {
            logs: ["4"],
            crash: "Em JavaScript, tamanho(42) devolve undefined (number não tem .length) — um bug silencioso que o narrowing teria evitado."
          }
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
            "Uma união só libera o que é comum a todos os membros; o narrowing prova qual tipo é em cada ponto.",
            "typeof estreita primitivos; dentro de cada ramo, os métodos daquele tipo ficam disponíveis.",
            "'campo' in obj estreita pela presença de uma propriedade; instanceof, pela classe de origem.",
            "Uniões discriminadas usam um campo literal comum (tipo/kind) para estreitar o objeto inteiro num switch.",
            "O TypeScript segue o fluxo do código: o que sobra num else é deduzido sozinho.",
            "Atribuir o caso default a uma variável never força uma checagem exaustiva — avisa quando um caso novo surge."
          ]
        }
      ]
    }
  ]
};
