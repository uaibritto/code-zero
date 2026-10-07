/* ============================================================
   Léxico — Conteúdo do Módulo (slug: classes-oop)
   "Classes e OOP" — exibido como nº 33 na trilha TypeScript.
   Estreia o bloco 'classviz': visualizador de encapsulamento —
   o que é acessível de fora, de uma subclasse e de dentro.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["classes-oop"] = {
  title: "Classes e OOP",
  lead: "Você já viu construtoras e protótipos em JavaScript (módulos 16 e 17). O TypeScript pega a sintaxe de classe e adiciona o que faltava para orientação a objetos de verdade: controle de acesso, contratos e hierarquias — tudo verificado antes de rodar.",

  steps: [
    /* 1 */
    {
      label: "Classe tipada",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O mesmo mecanismo, com tipos",
          html: `
            <p>Uma <code>class</code> continua sendo açúcar sobre construtora + protótipo (Módulo 16). O que o TypeScript acrescenta é tudo que torna OOP seguro: <strong>tipos</strong> nos campos, <strong>modificadores de acesso</strong> que escondem o que é interno, e <strong>contratos</strong> via <code>implements</code>.</p>
            <p>Um atalho útil logo de cara: declarar parâmetros do construtor já com modificador (<em>parameter properties</em>) cria e atribui o campo automaticamente.</p>`
        },
        {
          type: "code",
          file: "classe.ts",
          code: [
            'class Conta {',
            '  // "parameter property": declara e atribui de uma vez',
            '  constructor(',
            '    public titular: string,',
            '    private saldo: number',
            '  ) {}',
            '',
            '  depositar(valor: number) {',
            '    this.saldo += valor',
            '  }',
            '}'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔐",
          title: "Modelo mental: a sala de controle",
          html: `
            <p>Uma classe tem uma vitrine (o que é <code>public</code>) e uma sala de controle nos fundos (o que é <code>private</code>). Clientes só mexem na vitrine; a lógica sensível fica trancada. OOP é, em grande parte, decidir o que fica em cada lado.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Quem vê o quê",
      kind: "interactive",
      blocks: [
        {
          type: "classviz",
          heading: "Modificadores de acesso, de cada ângulo",
          intro: "A classe tem três campos com modificadores diferentes. Troque o <strong>ponto de vista</strong> e veja o que é acessível de cada lugar — de fora quase nada, de dentro tudo.",
          className: "Conta",
          members: [
            { name: "titular", mod: "public" },
            { name: "limite", mod: "protected" },
            { name: "saldo", mod: "private" }
          ],
          viewpoints: [
            { id: "outside", label: "De fora (conta.x)" },
            { id: "subclass", label: "De uma subclasse" },
            { id: "inside", label: "De dentro da classe" }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Modificadores",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "public, private, protected, readonly",
          html: `
            <p>Quatro palavras controlam o acesso:</p>
            <ul>
              <li><code>public</code> (padrão) — acessível de qualquer lugar.</li>
              <li><code>private</code> — só dentro da própria classe.</li>
              <li><code>protected</code> — dentro da classe e das suas subclasses.</li>
              <li><code>readonly</code> — pode ser lido de fora, mas só atribuído no construtor.</li>
            </ul>
            <p>Importante: <code>private</code> e <code>protected</code> do TypeScript são verificados <strong>na compilação</strong>. Para privacidade real em runtime, o JavaScript tem os campos com <code>#</code> (<code>#saldo</code>).</p>`
        },
        {
          type: "code",
          file: "modificadores.ts",
          code: [
            'class Produto {',
            '  readonly id: number',
            '  constructor(id: number, private custo: number) {',
            '    this.id = id',
            '  }',
            '}',
            '',
            'const p = new Produto(1, 50)',
            'p.id          // ✓ leitura liberada',
            '// p.id = 2   // ✗ readonly: não pode reatribuir',
            '// p.custo    // ✗ private: invisível de fora'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Herança",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "extends e super",
          html: `
            <p>Uma classe pode <strong>estender</strong> outra, herdando seus campos e métodos. <code>super(...)</code> chama o construtor da classe-mãe; <code>super.metodo()</code> chama a versão dela. Membros <code>protected</code> ficam visíveis para a subclasse — foi o que o visualizador mostrou:</p>`
        },
        {
          type: "code",
          file: "heranca.ts",
          code: [
            'class Animal {',
            '  constructor(protected nome: string) {}',
            '  descrever() { return "Sou " + this.nome }',
            '}',
            '',
            'class Cachorro extends Animal {',
            '  constructor(nome: string) {',
            '    super(nome)          // chama o construtor de Animal',
            '  }',
            '  latir() { return this.nome + " faz au au" }  // nome é protected: ok',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Abstract & polimorfismo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Contratos de implementação e sobrescrita",
          html: `
            <p>Uma classe <code>abstract</code> não pode ser instanciada — serve de molde. Um método <code>abstract</code> não tem corpo: obriga cada subclasse a <strong>implementá-lo</strong>. Isso habilita o <strong>polimorfismo</strong>: tratar objetos diferentes pela mesma interface, cada um respondendo à sua maneira (method overriding, com <code>override</code>).</p>`
        },
        {
          type: "code",
          file: "abstract.ts",
          code: [
            'abstract class Forma {',
            '  abstract area(): number        // sem corpo: subclasse deve prover',
            '  descrever() { return "Área: " + this.area() }',
            '}',
            '',
            'class Quadrado extends Forma {',
            '  constructor(private lado: number) { super() }',
            '  override area() { return this.lado ** 2 }',
            '}',
            '',
            '// const f = new Forma()   // ✗ não dá para instanciar abstract',
            'const q = new Quadrado(3)',
            'q.descrever()                 // "Área: 9"'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "implements",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Cumprir um contrato (interface)",
          html: `
            <p>Lembra das interfaces (Módulo 33)? Uma classe pode <code>implements</code> uma interface: o TypeScript verifica que ela tem <strong>exatamente</strong> a forma prometida. É a diferença entre <code>extends</code> (herda implementação) e <code>implements</code> (promete uma forma, sem herdar nada):</p>`
        },
        {
          type: "code",
          file: "implements.ts",
          code: [
            'interface Salvavel {',
            '  salvar(): void',
            '}',
            '',
            'class Documento implements Salvavel {',
            '  salvar() {                 // obrigatório pela interface',
            '    console.log("salvando...")',
            '  }',
            '}',
            '',
            '// se faltasse salvar(), o TS recusaria a classe'
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
          heading: "Acesso de fora",
          code: 'class Conta {\n  constructor(private saldo: number) {}\n}\n\nconst c = new Conta(100)\nconsole.log(c.saldo)',
          question: "O que o TypeScript diz sobre c.saldo?",
          options: [
            { label: "Erro: saldo é private, inacessível de fora", correct: true },
            { label: "Imprime 100 normalmente" },
            { label: "Imprime undefined" }
          ],
          okText: "<b>Certo.</b> <code>saldo</code> é <code>private</code>: só o código <strong>dentro</strong> de <code>Conta</code> pode acessá-lo. De fora (<code>c.saldo</code>), o TypeScript bloqueia na compilação — exatamente o que o visualizador mostrou no ponto de vista 'de fora'.",
          noText: "<b>Lembre do encapsulamento.</b> <code>private</code> significa 'só dentro da classe'. Acessar <code>c.saldo</code> de fora é um erro de tipo — a proteção que faz o OOP valer a pena."
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
          heading: "Desafio: respeite o privado",
          html: `
            <p>A classe esconde <code>senha</code> como <code>private</code> e expõe <code>verificar()</code>. Antes de clicar, descubra qual linha o TypeScript recusa — e por quê.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'class Usuario {',
            '  constructor(private senha: string) {}',
            '  verificar(tentativa: string) {',
            '    return this.senha === tentativa',
            '  }',
            '}',
            '',
            'const u = new Usuario("1234")',
            'u.verificar("1234")',
            'u.senha'
          ],
          errors: {
            "9": "Property 'senha' is private and only accessible within class 'Usuario'."
          },
          js: {
            logs: [],
            crash: "Em JavaScript, private do TS some na compilação: u.senha devolveria \"1234\". A proteção é em tempo de verificação (ou use #senha para privacidade real em runtime)."
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
            "class em TS é construtora + protótipo com tipos, modificadores e contratos verificados.",
            "public (padrão), private (só dentro), protected (dentro + subclasses) e readonly (lê de fora, atribui no construtor).",
            "Parameter properties: declarar o parâmetro do construtor com modificador já cria e atribui o campo.",
            "extends herda implementação e usa super(); protected fica visível para subclasses.",
            "Classes e métodos abstract são moldes obrigatórios; habilitam polimorfismo via override.",
            "implements faz a classe cumprir a forma de uma interface, sem herdar implementação."
          ]
        }
      ]
    }
  ]
};
