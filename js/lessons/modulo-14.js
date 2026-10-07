/* ============================================================
   Léxico — Conteúdo do Módulo 14
   "Protótipos e classes"
   Estreia o bloco 'chainviz': cadeia de protótipos visual.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["prototipos-e-classes"] = {
  title: "Protótipos e classes",
  lead: "Como milhares de objetos podem compartilhar os mesmos métodos sem desperdiçar memória? A resposta é o protótipo — o mecanismo de herança do JavaScript. As classes são uma roupa elegante sobre ele.",

  steps: [
    /* 1 */
    {
      label: "Compartilhar comportamento",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O problema que os protótipos resolvem",
          html: `
            <p>Imagine mil objetos "cachorro", todos capazes de latir. Copiar o método <code>latir</code> dentro de cada um seria um desperdício de memória e um pesadelo de manutenção — mudar o latido exigiria editar mil cópias.</p>
            <p>A solução do JavaScript: colocar o método num <strong>lugar comum</strong> que todos os cachorros consultam. Esse lugar compartilhado é o <strong>protótipo</strong>.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: o manual na estante",
          html: `
            <p>Cada objeto é um funcionário. Em vez de dar a cada um uma cópia do manual de regras, todos consultam o <strong>mesmo manual</strong> na estante — o protótipo. Precisou de uma regra que seu manual pessoal não tem? Você vai à estante consultar. Atualizou o manual compartilhado? Todos passam a seguir a nova regra na hora.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O protótipo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O link escondido entre objetos",
          html: `
            <p>Todo objeto tem um link interno para outro objeto: o seu <strong>protótipo</strong>. Quando você acessa uma propriedade que o objeto não possui, o JavaScript a procura no protótipo, depois no protótipo do protótipo, e assim por diante — a <strong>cadeia de protótipos</strong> — até achar ou chegar a <code>null</code>.</p>
            <p>É daí que vêm os métodos que você já usa sem pensar. Rode:</p>`
        },
        {
          type: "runnable",
          file: "prototipo.js",
          autorun: true,
          code: [
            'const numeros = [1, 2, 3]',
            '',
            '// .map não está no array em si...',
            'console.log(numeros.map(n => n * 2))',
            '',
            '// ...vem do protótipo compartilhado dos arrays:',
            'console.log(Object.getPrototypeOf(numeros) === Array.prototype) // true'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Cadeia de protótipos",
      kind: "interactive",
      blocks: [
        {
          type: "chainviz",
          heading: "A busca que sobe a cadeia",
          intro: "Quando você acessa <code>rex.comer()</code>, o JavaScript procura <code>comer</code> começando no próprio objeto e subindo pelo <code>__proto__</code>. Avance a busca e veja onde ela encontra.",
          chain: [
            { label: "rex (o objeto)", props: ['nome: "Rex"'], has: ["nome"] },
            { label: "Cachorro.prototype", props: ["latir()"], has: ["latir"] },
            { label: "Animal.prototype", props: ["comer()"], has: ["comer"] },
            { label: "Object.prototype", props: ["toString()", "hasOwnProperty()"], has: ["toString", "hasOwnProperty"] },
            { label: "null", props: [], has: [] }
          ],
          lookup: "comer",
          note: "<code>rex</code> não tem <code>comer</code>, nem <code>Cachorro.prototype</code>. A busca sobe e encontra <code>comer</code> em <code>Animal.prototype</code>. Se chegasse a <code>null</code> sem achar, o resultado seria <code>undefined</code>. É exatamente esse mecanismo que a herança usa."
        }
      ]
    },

    /* 4 */
    {
      label: "Classes",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A sintaxe moderna sobre os protótipos",
          html: `
            <p>Montar protótipos à mão é verboso. A palavra <code>class</code> é uma forma mais limpa e familiar de fazer isso. O <code>constructor</code> roda quando você cria um objeto com <code>new</code> e define as propriedades da <strong>instância</strong>; os métodos declarados ficam no <strong>protótipo compartilhado</strong>. Rode:</p>`
        },
        {
          type: "runnable",
          file: "classe.js",
          autorun: true,
          code: [
            'class Cachorro {',
            '  constructor(nome) {',
            '    this.nome = nome',
            '  }',
            '  latir() {',
            '    return this.nome + " faz Au au!"',
            '  }',
            '}',
            '',
            'const rex = new Cachorro("Rex")',
            'console.log(rex.nome)',
            'console.log(rex.latir())'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "this",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quem é this dentro de um método",
          html: `
            <p>Dentro de um método, <code>this</code> se refere ao <strong>objeto que chamou o método</strong>. Em <code>ana.apresentar()</code>, o <code>this</code> é <code>ana</code>. É assim que um mesmo método, guardado no protótipo, trabalha com os dados de cada instância diferente. Rode:</p>`
        },
        {
          type: "runnable",
          file: "this.js",
          autorun: true,
          code: [
            'class Pessoa {',
            '  constructor(nome) { this.nome = nome }',
            '  apresentar() { return "Oi, sou " + this.nome }',
            '}',
            '',
            'const ana = new Pessoa("Ana")',
            'const bia = new Pessoa("Bia")',
            'console.log(ana.apresentar()) // this = ana',
            'console.log(bia.apresentar()) // this = bia'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "extends e super",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Herança entre classes",
          html: `
            <p><code>extends</code> cria uma subclasse que <strong>herda</strong> de outra — os métodos do pai ficam disponíveis via cadeia de protótipos. Dentro do <code>constructor</code> da subclasse, <code>super(...)</code> chama o <code>constructor</code> do pai (e precisa vir antes de usar <code>this</code>). Rode:</p>`
        },
        {
          type: "runnable",
          file: "heranca.js",
          autorun: true,
          code: [
            'class Animal {',
            '  constructor(nome) { this.nome = nome }',
            '  comer() { return this.nome + " está comendo" }',
            '}',
            '',
            'class Cachorro extends Animal {',
            '  constructor(nome, raca) {',
            '    super(nome)      // chama o constructor de Animal',
            '    this.raca = raca',
            '  }',
            '  latir() { return this.nome + " faz Au au!" }',
            '}',
            '',
            'const rex = new Cachorro("Rex", "Vira-lata")',
            'console.log(rex.comer()) // herdado de Animal',
            'console.log(rex.latir()) // próprio de Cachorro',
            'console.log(rex.raca)'
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
          heading: "Quem vence na cadeia?",
          code: 'class A {\n  saudar() { return "A" }\n}\nclass B extends A {\n  saudar() { return "B" }\n}\nconsole.log(new B().saudar())',
          question: "B herda de A, mas ambas têm saudar(). O que é impresso?",
          options: [
            { label: '"B"', correct: true },
            { label: '"A"' },
            { label: '"AB"' }
          ],
          okText: "<b>Certo.</b> A busca por <code>saudar</code> começa no mais próximo: o próprio <code>B.prototype</code>, que tem o método. Ele é encontrado ali, <strong>antes</strong> de chegar a <code>A</code>. Isso é um override — a subclasse sobrescreve o método do pai.",
          noText: "<b>Pense na cadeia.</b> A instância é de <code>B</code>, e <code>B</code> tem seu próprio <code>saudar</code>. Como a busca para no primeiro encontrado (o mais próximo), o método de <code>B</code> vence o de <code>A</code>. Imprime <code>\"B\"</code>."
        }
      ]
    },

    /* 8 */
    {
      label: "Recursos de classe",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Privados, static e getters",
          html: `
            <p>Classes trazem recursos extras: campos <strong>privados</strong> (prefixo <code>#</code>, acessíveis só dentro da classe), membros <code>static</code> (pertencem à classe, não às instâncias) e <strong>getters</strong> (métodos que você acessa como se fossem propriedades). Rode:</p>`
        },
        {
          type: "runnable",
          file: "recursos.js",
          autorun: true,
          code: [
            'class Conta {',
            '  #saldo = 0              // privado',
            '  static banco = "Léxico" // da classe, não da instância',
            '',
            '  depositar(v) { this.#saldo += v }',
            '  get saldo() { return this.#saldo } // getter',
            '}',
            '',
            'const c = new Conta()',
            'c.depositar(100)',
            'console.log(c.saldo)     // 100 (getter, sem parênteses)',
            'console.log(Conta.banco) // "Léxico" (static)'
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
          heading: "Desafio: a classe Retângulo",
          html: `
            <p>Crie uma classe <code>Retangulo</code> com <code>constructor(largura, altura)</code> e um método <code>area()</code> que devolve <code>largura * altura</code>. Depois crie um retângulo 4 × 5 e imprima a área (deve dar 20).</p>`
        },
        {
          type: "runnable",
          file: "retangulo.js",
          code: [
            '// Crie a classe Retangulo com constructor(largura, altura)',
            '// e um método area() que retorna largura * altura.',
            '// Depois: const r = new Retangulo(4, 5); console.log(r.area())',
            ''
          ].join("\n"),
          solution: [
            'class Retangulo {',
            '  constructor(largura, altura) {',
            '    this.largura = largura',
            '    this.altura = altura',
            '  }',
            '  area() {',
            '    return this.largura * this.altura',
            '  }',
            '}',
            '',
            'const r = new Retangulo(4, 5)',
            'console.log(r.area()) // 20'
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
            "Protótipos permitem que muitos objetos compartilhem os mesmos métodos (um só na memória).",
            "Todo objeto tem um link para seu protótipo; propriedades não encontradas são buscadas cadeia acima.",
            "A busca sobe a cadeia até achar ou chegar a null (quando o resultado é undefined).",
            "class é uma sintaxe limpa sobre protótipos: constructor define a instância, métodos vão ao protótipo.",
            "this, dentro de um método, é o objeto que o chamou.",
            "extends cria subclasses; super chama o pai; métodos mais próximos sobrescrevem (override) os de cima."
          ]
        }
      ]
    }
  ]
};
