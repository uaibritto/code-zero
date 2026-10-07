/* ============================================================
   Léxico — Conteúdo do Módulo (slug: construtoras-e-fabricas)
   "Construtoras e fábricas" — exibido como nº 16 na trilha JS.
   Estreia o bloco 'newsteps': dissecador do new, passo a passo
   pelas 4 coisas que ele faz nos bastidores.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["construtoras-e-fabricas"] = {
  title: "Construtoras e fábricas",
  lead: "Criar um objeto com { } é fácil. Criar cem objetos com o mesmo formato, sem repetir código, exige um molde. O JavaScript oferece dois moldes — a função construtora (com new) e a função de fábrica (sem new) — e entender a diferença esclarece o new de uma vez por todas.",

  steps: [
    /* 1 */
    {
      label: "O problema",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Muitos objetos, o mesmo formato",
          html: `
            <p>Um objeto literal serve para um caso único. Mas quando você precisa de dezenas de usuários, produtos ou tarefas com a <strong>mesma forma</strong>, copiar <code>{ }</code> à mão é repetitivo e frágil — basta esquecer um campo num deles. Você precisa de um <strong>molde</strong>: uma função que fabrica objetos prontos.</p>
            <p>Há dois moldes clássicos. Os dois produzem objetos; a diferença está em <em>como</em> fazem isso — e é aí que o <code>new</code> entra em cena.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🏭",
          title: "Modelo mental: a fôrma de bolo",
          html: `
            <p>A função é a fôrma; cada chamada assa um bolo novo com o mesmo formato, recheios diferentes. A construtora usa o <code>new</code> para desenformar automaticamente; a fábrica monta o bolo na mão e te entrega. Mesmo resultado, caminhos diferentes.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O que o new faz",
      kind: "interactive",
      blocks: [
        {
          type: "newsteps",
          heading: "Dentro do new, passo a passo",
          intro: "O <code>new</code> parece mágica, mas faz exatamente quatro coisas — nesta ordem. Avance e veja o objeto nascer vazio e se preencher até ser devolvido.",
          signature: [
            'function Usuario(nome) {',
            '  this.nome = nome',
            '  this.ativo = true',
            '}'
          ].join("\n"),
          call: 'new Usuario("Ana")',
          steps: [
            { phase: "create", title: "1. Cria um objeto vazio", obj: "{ }", note: "O <code>new</code> fabrica um objeto novo em folha, do nada." },
            { phase: "link", title: "2. Liga o protótipo", obj: "{ }  ⟶  Usuario.prototype", note: "O <code>[[Prototype]]</code> do objeto passa a apontar para <code>Usuario.prototype</code> — por isso ele herda os métodos definidos lá (próximo passo do curso)." },
            { phase: "bind", title: "3. Roda o corpo com this = objeto", obj: '{ nome: "Ana", ativo: true }', note: "Dentro da função, <code>this</code> é esse objeto novo. Então <code>this.nome = nome</code> e <code>this.ativo = true</code> o preenchem." },
            { phase: "return", title: "4. Retorna o objeto", obj: '{ nome: "Ana", ativo: true }', note: "Sem um <code>return</code> de objeto explícito, o <code>new</code> devolve o <code>this</code> automaticamente. É por isso que construtoras não precisam de <code>return</code>." }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Função construtora",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma função feita para o new",
          html: `
            <p>Uma <strong>função construtora</strong> é uma função comum, chamada com <code>new</code>. A convenção é começar o nome com <strong>maiúscula</strong> (<code>Usuario</code>, <code>Carro</code>) para avisar quem lê: "me chame com <code>new</code>". Rode e veja um objeto saindo da fôrma:</p>`
        },
        {
          type: "runnable",
          file: "construtora.js",
          autorun: true,
          code: [
            'function Usuario(nome) {',
            '  this.nome = nome',
            '  this.ativo = true',
            '}',
            '',
            'const ana = new Usuario("Ana")',
            'const rui = new Usuario("Rui")',
            '',
            'console.log(ana.nome, "/", rui.nome)',
            'console.log("ana é Usuario?", ana instanceof Usuario)'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Métodos no prototype",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Compartilhar, não copiar",
          html: `
            <p>Se você definir um método <strong>dentro</strong> da construtora com <code>this.saudar = ...</code>, cada objeto ganha a sua própria cópia da função — desperdício. O lugar certo é o <code>Construtora.prototype</code>: um único método compartilhado por <strong>todos</strong> os objetos (via a ligação de protótipo do passo 2). Rode e confirme que é o mesmo:</p>`
        },
        {
          type: "runnable",
          file: "prototype.js",
          autorun: true,
          code: [
            'function Usuario(nome) {',
            '  this.nome = nome',
            '}',
            '',
            '// um método, compartilhado por todos:',
            'Usuario.prototype.saudar = function () {',
            '  return "Oi, " + this.nome',
            '}',
            '',
            'const a = new Usuario("Ana")',
            'const b = new Usuario("Rui")',
            'console.log(a.saudar(), "/", b.saudar())',
            'console.log("mesmo método?", a.saudar === b.saudar)  // true'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Função de fábrica",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Sem new, sem this",
          html: `
            <p>Uma <strong>função de fábrica</strong> é só uma função comum que <strong>monta e devolve um objeto</strong> — sem <code>new</code>, sem <code>this</code>. Como bônus, ela usa closures (Módulo 14) para ter estado <strong>realmente privado</strong>: variáveis que ninguém de fora alcança. Rode:</p>`
        },
        {
          type: "runnable",
          file: "fabrica.js",
          autorun: true,
          code: [
            'function criarContador() {',
            '  let n = 0   // privado: vive na closure, ninguém acessa de fora',
            '  return {',
            '    incrementar() { n++; return n },',
            '    valor() { return n }',
            '  }',
            '}',
            '',
            'const c = criarContador()',
            'console.log(c.incrementar())  // 1',
            'console.log(c.incrementar())  // 2',
            'console.log(c.valor())        // 2',
            'console.log(c.n)              // undefined — n é privado!'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Qual escolher",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Construtora, fábrica ou class?",
          html: `
            <p>Os três resolvem o mesmo problema — moldes de objetos — com trade-offs:</p>
            <ul>
              <li><strong>Fábrica:</strong> simples, sem <code>new</code>, sem armadilhas de <code>this</code>, privacidade fácil via closure. Ótima na maioria dos casos.</li>
              <li><strong>Construtora:</strong> usa <code>new</code> e <code>prototype</code>; funciona com <code>instanceof</code>; é a forma "clássica" por trás das classes.</li>
              <li><strong>class:</strong> açúcar sintático sobre a construtora + prototype — o mesmo mecanismo, com uma sintaxe mais limpa. É o tema do próximo módulo.</li>
            </ul>
            <p>Entender a construtora é o que torna a <code>class</code> transparente: você já sabe o que acontece por baixo.</p>`
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
          heading: "Esqueceu o new?",
          code: 'function Usuario(nome) {\n  this.nome = nome\n}\n\nconst u = Usuario("Ana")   // ← sem new!\nconsole.log(u)',
          question: "Chamando a construtora SEM new, o que u recebe?",
          options: [
            { label: "undefined — a função não retorna nada explícito", correct: true },
            { label: "um objeto { nome: \"Ana\" } normalmente" },
            { label: "um erro de sintaxe" }
          ],
          okText: "<b>Certo.</b> Sem <code>new</code>, nenhum objeto novo é criado nem retornado: a função roda como chamada comum, <code>this</code> não é o objeto esperado, e como não há <code>return</code>, <code>u</code> fica <code>undefined</code>. É o perigo da construtora — a convenção da maiúscula existe para evitar esse esquecimento.",
          noText: "<b>Lembre do passo 4.</b> Quem cria e devolve o objeto é o <code>new</code>. Sem ele, a função roda como chamada comum e, sem <code>return</code> explícito, devolve <code>undefined</code> — por isso <code>u</code> é <code>undefined</code>."
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
          heading: "Desafio: a fábrica de carros",
          html: `
            <p>Escreva uma fábrica <code>criarCarro(marca)</code> que devolve um objeto com a <code>marca</code> e um método <code>descrever()</code> que retorna <code>"Carro: " + marca</code>. Crie um e imprima a descrição.</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            '// escreva criarCarro(marca) que devolve um objeto',
            '// com { marca, descrever() }',
            '',
            '',
            '// const fusca = criarCarro("VW")',
            '// console.log(fusca.descrever())   // "Carro: VW"'
          ].join("\n"),
          solution: [
            'function criarCarro(marca) {',
            '  return {',
            '    marca,',
            '    descrever() { return "Carro: " + marca }',
            '  }',
            '}',
            '',
            'const fusca = criarCarro("VW")',
            'console.log(fusca.descrever())   // "Carro: VW"'
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
            "Quando precisa de muitos objetos com a mesma forma, use um molde — não copie { } à mão.",
            "new faz quatro coisas: cria um objeto, liga o prototype, roda o corpo com this = objeto e o retorna.",
            "Função construtora: nome com maiúscula, chamada com new; esquecer o new devolve undefined.",
            "Métodos vão no Construtora.prototype para serem compartilhados, não copiados em cada objeto.",
            "Função de fábrica: devolve um objeto sem new nem this, com estado privado via closure.",
            "class é açúcar sobre construtora + prototype — o mesmo mecanismo, sintaxe mais limpa (próximo módulo)."
          ]
        }
      ]
    }
  ]
};
