/* ============================================================
   Léxico — Conteúdo do Módulo (slug: o-this-e-binding)
   "O this e binding" — exibido como nº 15 na trilha JS.
   Estreia o bloco 'thislab': um resolvedor de this que mostra,
   para cada forma de chamada, para quem o this aponta.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["o-this-e-binding"] = {
  title: "O this e binding",
  lead: "this é a palavra que mais confunde em JavaScript — porque as pessoas tentam adivinhar seu valor olhando onde a função foi escrita. O segredo é outro: this quase nunca depende de onde a função está, e sim de como ela é chamada.",

  steps: [
    /* 1 */
    {
      label: "O que é this",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Decidido na chamada, não na escrita",
          html: `
            <p>A pergunta certa não é "o que é <code>this</code> nesta função?", e sim "<strong>como esta função foi chamada?</strong>". O mesmo trecho de código pode ter <code>this</code> diferente a cada chamada. É um parâmetro invisível, preenchido no momento em que você invoca a função.</p>
            <p>Existem poucas regras, e elas têm prioridade clara. Depois de entendê-las, <code>this</code> deixa de ser mistério e vira mecânica.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "👉",
          title: "Modelo mental: quem está antes do ponto",
          html: `
            <p>Na maioria dos casos, olhe o que está <strong>imediatamente antes do ponto</strong> na chamada. <code>obj.fazer()</code> → <code>this</code> é <code>obj</code>. Sem nada antes do ponto, não há dono — e aí entram as outras regras.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O resolvedor",
      kind: "interactive",
      blocks: [
        {
          type: "thislab",
          heading: "Para quem o this aponta?",
          intro: "Escolha uma forma de chamada e veja o código correspondente, para quem o <code>this</code> aponta e a regra por trás. Compare o método com a função solta — é a mesma função, resultado diferente.",
          cases: [
            {
              id: "method",
              label: "Método: obj.saudar()",
              code: [
                'const obj = {',
                '  nome: "Léxico",',
                '  saudar() {',
                '    return "Oi, " + this.nome',
                '  }',
                '}',
                '',
                'obj.saudar()   // ← chamada como método'
              ],
              resolve: "obj",
              explain: "Chamada <strong>como método</strong> (<code>obj.saudar()</code>): o <code>this</code> é o objeto <strong>antes do ponto</strong> — <code>obj</code>. A regra do 'quem chamou'."
            },
            {
              id: "loose",
              label: "Função solta: f()",
              code: [
                'const saudar = obj.saudar',
                '',
                'saudar()   // ← sem objeto antes do ponto'
              ],
              resolve: "undefined",
              explain: "Chamada <strong>solta</strong>, sem dono antes do ponto. Em modo estrito (o padrão moderno), <code>this</code> é <code>undefined</code> — e <code>this.nome</code> quebra. É o clássico 'perdi o this'."
            },
            {
              id: "arrow",
              label: "Arrow dentro de método",
              code: [
                'const obj = {',
                '  nome: "Léxico",',
                '  itens: ["a", "b"],',
                '  listar() {',
                '    return this.itens.map(x => this.nome + ": " + x)',
                '  }',
                '}'
              ],
              resolve: "obj (herdado)",
              explain: "A arrow <strong>não tem <code>this</code> próprio</strong>: usa o do escopo onde foi criada — aqui, o do método <code>listar</code>, que é <code>obj</code>. Por isso arrows são perfeitas como callback dentro de métodos."
            },
            {
              id: "call",
              label: "f.call(ana)",
              code: [
                'function apresentar() {',
                '  return "Eu sou " + this.nome',
                '}',
                'const ana = { nome: "Ana" }',
                '',
                'apresentar.call(ana)   // ← this forçado'
              ],
              resolve: "ana",
              explain: "<code>call</code> <strong>força</strong> o <code>this</code> para o primeiro argumento. <code>apply</code> faz igual, mas recebe os argumentos como array. É o 'binding explícito'."
            },
            {
              id: "bind",
              label: "f.bind(ana)()",
              code: [
                'function apresentar() {',
                '  return "Eu sou " + this.nome',
                '}',
                'const ana = { nome: "Ana" }',
                '',
                'const fixo = apresentar.bind(ana)',
                'fixo()   // ← this já colado, para sempre'
              ],
              resolve: "ana (permanente)",
              explain: "<code>bind</code> devolve uma <strong>nova função</strong> com o <code>this</code> colado para sempre. Mesmo chamada solta depois, continua <code>ana</code>. Ótimo para callbacks que você passa adiante."
            },
            {
              id: "new",
              label: "new Usuario()",
              code: [
                'function Usuario(nome) {',
                '  this.nome = nome',
                '}',
                '',
                'const u = new Usuario("Rui")   // ← com new'
              ],
              resolve: "o novo objeto (u)",
              explain: "Com <code>new</code>, o <code>this</code> é um <strong>objeto novo em folha</strong>, criado e devolvido automaticamente. É a base das funções construtoras — o próximo módulo."
            },
            {
              id: "event",
              label: "addEventListener(fn)",
              code: [
                'botao.addEventListener("click", function () {',
                '  this.disabled = true   // this aqui?',
                '})'
              ],
              resolve: "o elemento (botao)",
              explain: "Num listener com <code>function</code>, o <code>this</code> é o <strong>elemento</strong> que disparou o evento. Com uma <strong>arrow</strong>, seria o <code>this</code> externo — por isso a escolha entre as duas importa aqui."
            }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "A regra do ponto",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Método vs função solta",
          html: `
            <p>O contraste mais importante: <strong>a mesma função</strong> dá <code>this</code> diferente dependendo de ter ou não um objeto antes do ponto. Guardar o método numa variável e chamá-lo depois o "desconecta" do objeto — o bug que mais pega iniciante quando passa um método como callback.</p>`
        },
        {
          type: "code",
          file: "ponto.ts",
          code: [
            'const obj = {',
            '  nome: "Léxico",',
            '  saudar() { return "Oi, " + this.nome }',
            '}',
            '',
            'obj.saudar()          // "Oi, Léxico"  → this = obj',
            '',
            'const solta = obj.saudar',
            'solta()               // 💥 this é undefined (modo estrito)'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "call, apply, bind",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Controlando o this de propósito",
          html: `
            <p>Três métodos deixam você <strong>escolher</strong> o <code>this</code>. <code>call</code> e <code>apply</code> invocam a função na hora (diferem só em como passam argumentos); <code>bind</code> devolve uma função nova com o <code>this</code> fixado. Rode e veja os três funcionando — e, de quebra, o "function borrowing": emprestar um método de um objeto para outro:</p>`
        },
        {
          type: "runnable",
          file: "binding.js",
          autorun: true,
          code: [
            'function apresentar(saudacao) {',
            '  return saudacao + ", eu sou " + this.nome',
            '}',
            '',
            'const ana = { nome: "Ana" }',
            'const rui = { nome: "Rui" }',
            '',
            'console.log(apresentar.call(ana, "Oi"))      // this = ana',
            'console.log(apresentar.apply(rui, ["Olá"]))  // this = rui (args em array)',
            '',
            'const souAna = apresentar.bind(ana)',
            'console.log(souAna("E aí"))                  // this colado em ana'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Arrow e this",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A exceção que simplifica tudo",
          html: `
            <p>Arrow functions quebram todas as regras acima — de um jeito útil. Elas <strong>não têm <code>this</code> próprio</strong>: capturam o <code>this</code> do escopo onde foram escritas, de forma permanente. <code>call</code>, <code>apply</code> e <code>bind</code> não têm efeito sobre uma arrow.</p>
            <p>Na prática: use <strong>arrow</strong> para callbacks que devem manter o <code>this</code> de fora (um <code>setTimeout</code> ou <code>map</code> dentro de um método). Use <strong>função normal</strong> quando quer que o <code>this</code> seja decidido pela chamada (métodos de objeto, listeners que precisam do elemento).</p>`
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
          heading: "Perdeu o this?",
          code: 'const user = {\n  nome: "Ana",\n  oi() { return "Oi, " + this.nome }\n}\n\nconst fn = user.oi\nfn()',
          question: "Em modo estrito, o que acontece em fn()?",
          options: [
            { label: "Erro: this é undefined, não dá para ler .nome", correct: true },
            { label: '"Oi, Ana" — o this continua sendo user' },
            { label: '"Oi, undefined" sem erro nenhum' }
          ],
          okText: "<b>Certo.</b> Ao guardar <code>user.oi</code> em <code>fn</code> e chamar <code>fn()</code> solto, não há objeto antes do ponto. Em modo estrito, <code>this</code> é <code>undefined</code>, então <code>this.nome</code> lança erro. A correção: <code>user.oi.bind(user)</code>.",
          noText: "<b>Olhe a chamada, não a escrita.</b> <code>fn()</code> é uma chamada solta — o <code>this</code> não é mais <code>user</code>. Em modo estrito ele é <code>undefined</code>, e ler <code>.nome</code> dele quebra."
        }
      ]
    },

    /* 7 */
    {
      label: "Sua vez",
      kind: "challenge",
      blocks: [
        {
          type: "prose",
          heading: "Desafio: cole o this",
          html: `
            <p>A função <code>oi</code> depende de <code>this.nome</code>, mas vai ser chamada solta. Use <code>bind</code> para criar uma versão que sempre tenha <code>this = user</code>, e chame-a.</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            'const user = {',
            '  nome: "Ana",',
            '  oi() { return "Oi, " + this.nome }',
            '}',
            '',
            '// crie "fixo" com bind para que this seja sempre user',
            '// depois chame fixo() e imprima o resultado',
            ''
          ].join("\n"),
          solution: [
            'const user = {',
            '  nome: "Ana",',
            '  oi() { return "Oi, " + this.nome }',
            '}',
            '',
            'const fixo = user.oi.bind(user)',
            'console.log(fixo())   // "Oi, Ana" — this colado em user'
          ].join("\n")
        }
      ]
    },

    /* 8 */
    {
      label: "Resumo",
      kind: "summary",
      blocks: [
        {
          type: "summary",
          heading: "O que você aprendeu",
          items: [
            "this é decidido na CHAMADA, não onde a função foi escrita.",
            "Chamada como método (obj.f()): this é o objeto antes do ponto; chamada solta (f()): this é undefined no modo estrito.",
            "call e apply forçam o this na hora (apply recebe args em array); bind devolve uma função com o this colado.",
            "Function borrowing: emprestar um método de um objeto para outro com call/apply.",
            "Arrow functions não têm this próprio — herdam o do escopo e ignoram call/apply/bind.",
            "new cria um this novo em folha — a ponte para o próximo módulo, construtoras e fábricas."
          ]
        }
      ]
    }
  ]
};
