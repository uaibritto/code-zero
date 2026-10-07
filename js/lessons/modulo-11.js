/* ============================================================
   Léxico — Conteúdo do Módulo 11
   "Objetos"
   Estreia o bloco 'refviz': visualizador de referências.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["objetos"] = {
  title: "Objetos",
  lead: "Arrays guardam listas ordenadas. Objetos guardam dados nomeados — nome, idade, cidade — como uma ficha. Dominá-los é essencial, mas há uma ideia aqui que, se mal entendida, gera os bugs mais confusos da sua vida: referências.",

  steps: [
    /* 1 */
    {
      label: "O que é um objeto",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Dados com nome",
          html: `
            <p>Enquanto o array usa posições numéricas, o <strong>objeto</strong> guarda valores sob <strong>nomes</strong> — chamados de propriedades. Você o cria com chaves <code>{ }</code>, no formato <code>chave: valor</code>, e acessa cada propriedade pelo nome, com ponto ou colchetes.</p>`
        },
        {
          type: "runnable",
          file: "objeto.js",
          autorun: true,
          code: [
            'const pessoa = {',
            '  nome: "Ana",',
            '  idade: 28',
            '}',
            '',
            'console.log(pessoa.nome)     // "Ana" (ponto)',
            'console.log(pessoa["idade"]) // 28 (colchete)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: a ficha de cadastro",
          html: `
            <p>Um objeto é como uma ficha com campos preenchidos: "Nome: Ana", "Idade: 28". Cada campo tem um rótulo (a chave) e um conteúdo (o valor). O array é uma fila numerada; o objeto é uma ficha com campos nomeados.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Propriedades e métodos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Adicionar, mudar, remover — e métodos",
          html: `
            <p>Objetos são flexíveis: você adiciona propriedades novas a qualquer momento, modifica as existentes e remove com <code>delete</code>. E quando o valor de uma propriedade é uma <strong>função</strong>, ela ganha um nome especial: <strong>método</strong>. Rode:</p>`
        },
        {
          type: "runnable",
          file: "metodos.js",
          autorun: true,
          code: [
            'const carro = { marca: "Fiat" }',
            '',
            'carro.ano = 2020       // adiciona',
            'carro.marca = "Toyota" // modifica',
            'delete carro.ano       // remove',
            '',
            '// método: uma função como propriedade',
            'carro.buzinar = function () {',
            '  return "Bip bip!"',
            '}',
            '',
            'console.log(carro)',
            'console.log(carro.buzinar())'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Referências",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A variável não guarda o objeto",
          html: `
            <p>Aqui está a ideia mais importante — e mais mal compreendida — sobre objetos. Com primitivos (número, texto), a variável guarda o valor <strong>dentro</strong> de si. Com objetos, não: a variável guarda apenas um <strong>endereço</strong> que aponta para o objeto, que vive em outro lugar na memória.</p>
            <p>A consequência é enorme: copiar a variável copia o <strong>endereço</strong>, não o objeto. Duas variáveis podem acabar apontando para o mesmo objeto — e mexer em uma afeta a outra.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: o controle remoto",
          html: `
            <p>A variável é um <strong>controle remoto</strong>; o objeto é a <strong>TV</strong>. O controle não contém a TV — só aponta para ela. Se você duplicar o controle, tem dois controles apontando para a <strong>mesma</strong> TV. Mudar o canal por um controle muda a TV que o outro também comanda.</p>`
        }
      ]
    },

    /* 4 */
    {
      label: "Visualize a referência",
      kind: "interactive",
      blocks: [
        {
          type: "refviz",
          heading: "Dois nomes, um objeto só",
          intro: "Avance passo a passo. Observe as cores: quando duas variáveis apontam para o mesmo objeto, elas compartilham a mesma cor — e uma mudança atinge as duas.",
          steps: [
            {
              code: 'const pessoa = { nome: "João" }',
              vars: [{ name: "pessoa", ref: "A" }],
              objs: { A: { nome: "João" } },
              note: 'Criamos um objeto. A variável <code>pessoa</code> não guarda o objeto em si — guarda um endereço que aponta para ele.'
            },
            {
              code: 'const outra = pessoa',
              vars: [{ name: "pessoa", ref: "A" }, { name: "outra", ref: "A" }],
              objs: { A: { nome: "João" } },
              note: 'Isto <strong>não</strong> cria um novo objeto. Copia apenas o endereço: agora <code>pessoa</code> e <code>outra</code> apontam para o <strong>mesmo</strong> objeto (mesma cor).'
            },
            {
              code: 'outra.nome = "Maria"',
              vars: [{ name: "pessoa", ref: "A" }, { name: "outra", ref: "A" }],
              objs: { A: { nome: "Maria" } },
              note: 'Mudamos a propriedade através de <code>outra</code>. Como só existe um objeto, a mudança acontece nele.'
            },
            {
              code: 'console.log(pessoa.nome)',
              vars: [{ name: "pessoa", ref: "A" }, { name: "outra", ref: "A" }],
              objs: { A: { nome: "Maria" } },
              note: 'Resultado: imprime <strong>"Maria"</strong>. Mexer por <code>outra</code> afetou <code>pessoa</code>, porque os dois são o mesmo objeto.',
              highlight: true
            }
          ]
        }
      ]
    },

    /* 5 */
    {
      label: "Primitivo vs objeto",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Cópia por valor vs. por referência",
          html: `
            <p>Agora o contraste lado a lado. Primitivos são copiados <strong>por valor</strong> — cada variável fica independente. Objetos são copiados <strong>por referência</strong> — as variáveis compartilham o mesmo objeto. Rode e compare os dois comportamentos:</p>`
        },
        {
          type: "runnable",
          file: "copia.js",
          autorun: true,
          code: [
            '// primitivo: cópia independente',
            'let a = 10',
            'let b = a',
            'b = 20',
            'console.log(a, b) // 10 20 — independentes',
            '',
            '// objeto: mesma referência',
            'const p1 = { nome: "João" }',
            'const p2 = p1',
            'p2.nome = "Maria"',
            'console.log(p1.nome) // "Maria" — mudou nos dois!'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Destructuring",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Extraindo propriedades de uma vez",
          html: `
            <p>O <strong>destructuring</strong> (desestruturação) é um atalho para tirar propriedades de um objeto e colocá-las em variáveis, pelo nome. Em vez de várias linhas de <code>const x = obj.x</code>, você faz tudo numa só:</p>`
        },
        {
          type: "runnable",
          file: "destructuring.js",
          autorun: true,
          code: [
            'const usuario = { nome: "Ana", idade: 28, cidade: "Recife" }',
            '',
            '// extrai nome e idade para variáveis próprias',
            'const { nome, idade } = usuario',
            '',
            'console.log(nome)  // "Ana"',
            'console.log(idade) // 28'
          ].join("\n")
        }
      ]
    },

    /* 7 */
    {
      label: "Spread",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Espalhar, copiar e combinar",
          html: `
            <p>O operador <strong>spread</strong> (<code>...</code>) "espalha" as propriedades de um objeto dentro de outro. Ele resolve o problema da referência: <code>{ ...obj }</code> cria um <strong>novo objeto</strong> com as mesmas propriedades — uma cópia de verdade. Também serve para combinar objetos. Rode:</p>`
        },
        {
          type: "runnable",
          file: "spread.js",
          autorun: true,
          code: [
            'const base = { nome: "Ana", idade: 28 }',
            '',
            '// cópia real (novo objeto)',
            'const copia = { ...base }',
            'copia.idade = 30',
            'console.log(base.idade)  // 28 — intacto!',
            'console.log(copia.idade) // 30',
            '',
            '// combinar e sobrescrever',
            'const completo = { ...base, cidade: "Recife" }',
            'console.log(completo)'
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
          type: "predict",
          heading: "A pegadinha da referência",
          code: 'const a = { contador: 0 }\nconst b = a\nb.contador = 5\nconsole.log(a.contador)',
          question: "Depois de mexer em b.contador, o que imprime a.contador?",
          options: [
            { label: "5", correct: true },
            { label: "0" },
            { label: "undefined" }
          ],
          okText: "<b>Exato.</b> <code>const b = a</code> copiou a <strong>referência</strong>, não o objeto. <code>a</code> e <code>b</code> apontam para o mesmo objeto, então <code>b.contador = 5</code> também muda <code>a.contador</code>. Para uma cópia independente, use <code>{ ...a }</code>.",
          noText: "<b>Lembre do controle remoto.</b> <code>b = a</code> não cria um novo objeto — só mais um controle para a mesma TV. Mexer em <code>b.contador</code> mexe no único objeto, então <code>a.contador</code> também vira <code>5</code>."
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
          heading: "Desafio: mude sem estragar o original",
          html: `
            <p>Crie uma <strong>cópia</strong> de <code>usuario</code> com a cidade trocada para <code>"São Paulo"</code>, <strong>sem alterar</strong> o objeto original. Imprima os dois para provar que o original ficou intacto. (Dica: spread.)</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            'const usuario = { nome: "Ana", cidade: "Recife" }',
            '',
            '// Crie uma cópia com cidade "São Paulo",',
            '// sem mexer no usuario original. Imprima os dois.',
            ''
          ].join("\n"),
          solution: [
            'const usuario = { nome: "Ana", cidade: "Recife" }',
            '',
            'const mudado = { ...usuario, cidade: "São Paulo" }',
            '',
            'console.log(usuario) // Recife — intacto',
            'console.log(mudado)  // São Paulo'
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
            "Objetos guardam dados nomeados (chave: valor); acesse com ponto ou colchetes.",
            "Você adiciona, modifica e remove propriedades; uma função como propriedade é um método.",
            "A variável guarda o endereço do objeto, não o objeto em si (como um controle remoto).",
            "Primitivos são copiados por valor; objetos, por referência — mexer em um reflete no outro.",
            "Destructuring extrai propriedades em variáveis de uma vez, pelo nome.",
            "Spread (...) cria uma cópia nova e combina objetos — a saída para o problema da referência."
          ]
        }
      ]
    }
  ]
};
