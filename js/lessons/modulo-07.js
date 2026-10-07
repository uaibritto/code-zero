/* ============================================================
   Léxico — Conteúdo do Módulo 07
   "Condicionais"
   Estreia o bloco 'branch': visualizador de fluxo de decisão.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["condicionais"] = {
  title: "Condicionais",
  lead: "Até aqui seu código corria em linha reta, de cima para baixo. Condicionais dão a ele o poder de escolher caminhos — fazer uma coisa quando algo é verdadeiro, outra quando é falso. É onde os booleanos do módulo anterior ganham vida.",

  steps: [
    /* 1 */
    {
      label: "Tomar decisões",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Código que escolhe caminhos",
          html: `
            <p>Programas interessantes não fazem sempre a mesma coisa: eles reagem. Se o usuário é maior de idade, liberam o acesso; se o carrinho está vazio, mostram um aviso; se a senha confere, entram. Essa capacidade de <strong>decidir</strong> vem das condicionais.</p>
            <p>Toda condicional se apoia num valor <strong>booleano</strong> — aquele <code>true</code>/<code>false</code> que você viu nascer de comparações. A condicional pergunta "isto é verdadeiro?" e, conforme a resposta, segue por um caminho ou por outro.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: a bifurcação na estrada",
          html: `
            <p>Imagine uma estrada que se divide em duas. Numa placa, uma pergunta de sim ou não. Se "sim", você pega a estrada da esquerda; se "não", a da direita. A condicional é essa placa: ela avalia a pergunta e manda o programa pelo caminho certo.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "if / else",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A estrutura básica: if e else",
          html: `
            <p>O <code>if</code> executa um bloco de código <strong>somente se</strong> a condição entre parênteses for verdadeira. O <code>else</code> (opcional) oferece um caminho alternativo para quando ela for falsa. Rode e depois troque a idade para ver o outro caminho:</p>`
        },
        {
          type: "runnable",
          file: "if-else.js",
          autorun: true,
          code: [
            'const idade = 20',
            '',
            'if (idade >= 18) {',
            '  console.log("Pode dirigir")',
            '} else {',
            '  console.log("Ainda não pode dirigir")',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Fluxo de decisão",
      kind: "interactive",
      blocks: [
        {
          type: "branch",
          heading: "Veja qual caminho acende",
          intro: "Esta é uma cadeia de condições que classifica uma nota. Mude o valor (ou clique nos exemplos) e observe <strong>qual ramo é executado</strong> — e, principalmente, que o JavaScript para no primeiro que der verdadeiro.",
          varName: "nota",
          initial: "7",
          branches: [
            { cond: "nota >= 9", result: "Excelente" },
            { cond: "nota >= 7", result: "Aprovado" },
            { cond: "nota >= 5", result: "Recuperação" },
            { else: true, result: "Reprovado" }
          ],
          presets: ["9.5", "7", "5.5", "3"]
        }
      ]
    },

    /* 4 */
    {
      label: "else if",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Várias faixas com else if",
          html: `
            <p>Quando há mais de dois caminhos, encadeamos com <code>else if</code>. O JavaScript testa as condições <strong>de cima para baixo</strong> e executa o bloco da <strong>primeira que for verdadeira</strong> — ignorando todas as outras, mesmo que também fossem verdadeiras.</p>
            <p>Por isso a <strong>ordem importa</strong>: coloque sempre as condições mais específicas antes das mais gerais. Rode:</p>`
        },
        {
          type: "runnable",
          file: "else-if.js",
          autorun: true,
          code: [
            'const hora = 14',
            '',
            'if (hora < 12) {',
            '  console.log("Bom dia")',
            '} else if (hora < 18) {',
            '  console.log("Boa tarde")',
            '} else {',
            '  console.log("Boa noite")',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Preveja",
      kind: "interactive",
      blocks: [
        {
          type: "predict",
          heading: "Qual bloco roda?",
          code: 'const n = 5\nif (n > 10) {\n  console.log("grande")\n} else if (n > 3) {\n  console.log("médio")\n} else {\n  console.log("pequeno")\n}',
          question: "Com n valendo 5, o que é impresso?",
          options: [
            { label: '"médio"', correct: true },
            { label: '"grande"' },
            { label: '"pequeno"' }
          ],
          okText: "<b>Certo.</b> <code>n > 10</code> é falso, então pula. <code>n > 3</code> é verdadeiro, então executa <code>\"médio\"</code> e <strong>para ali</strong> — o <code>else</code> nem é consultado. A cadeia roda só o primeiro ramo verdadeiro.",
          noText: "<b>Siga de cima para baixo.</b> <code>5 > 10</code>? Não. <code>5 > 3</code>? Sim — então executa <code>\"médio\"</code> e encerra a cadeia. As condições seguintes são ignoradas assim que uma dá verdadeira."
        }
      ]
    },

    /* 6 */
    {
      label: "switch",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "switch: comparando um valor com várias opções",
          html: `
            <p>Quando você precisa comparar <strong>um mesmo valor</strong> com vários casos exatos, uma pilha de <code>else if</code> fica repetitiva. O <code>switch</code> é mais limpo para isso: ele compara o valor com cada <code>case</code> e executa o que combinar.</p>`
        },
        {
          type: "runnable",
          file: "switch.js",
          autorun: true,
          code: [
            'const dia = "terca"',
            '',
            'switch (dia) {',
            '  case "segunda":',
            '    console.log("Início da semana")',
            '    break',
            '  case "terca":',
            '    console.log("Terça-feira!")',
            '    break',
            '  default:',
            '    console.log("Outro dia")',
            '}'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "⚠️",
          title: "Não esqueça o break",
          html: `
            <p>Cada <code>case</code> precisa de um <code>break</code> no final. Sem ele, a execução "vaza" para o próximo case e continua rodando — um comportamento chamado <strong>fall-through</strong>, que você vai ver no exercício a seguir. O <code>default</code> é o caminho para quando nenhum case combina.</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "Operador ternário",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "if/else compacto que devolve um valor",
          html: `
            <p>Às vezes você só quer escolher entre dois valores com base numa condição. Para isso existe o <strong>operador ternário</strong>: <code>condição ? valorSeVerdadeiro : valorSeFalso</code>. É um <code>if/else</code> enxuto que <strong>resulta num valor</strong>, perfeito para atribuições simples.</p>`
        },
        {
          type: "runnable",
          file: "ternario.js",
          autorun: true,
          code: [
            'const idade = 20',
            '',
            'const status = idade >= 18 ? "adulto" : "menor"',
            'console.log(status)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "💡",
          title: "Use com moderação",
          html: `
            <p>O ternário brilha em escolhas curtas. Mas aninhar vários ternários vira um nó ilegível — nesses casos, um <code>if/else</code> tradicional comunica melhor. Clareza sempre vence concisão.</p>`
        }
      ]
    },

    /* 8 */
    {
      label: "A pegadinha do switch",
      kind: "exercise",
      blocks: [
        {
          type: "quiz",
          heading: "O que acontece sem break?",
          code: 'switch (2) {\n  case 1:\n    console.log("um")\n  case 2:\n    console.log("dois")\n  case 3:\n    console.log("três")\n}',
          question: "Repare: nenhum case tem break. Com o valor 2, o que é impresso?",
          options: [
            { label: '"dois" e "três"', correct: true },
            { label: 'Apenas "dois"' },
            { label: 'Nada, por causa do erro' }
          ],
          okText: "<b>Isso é fall-through.</b> Sem <code>break</code>, a execução entra no <code>case 2</code> e <strong>continua descendo</strong> pelos casos seguintes, imprimindo <code>\"dois\"</code> e <code>\"três\"</code>. É por isso que o <code>break</code> quase nunca pode faltar.",
          noText: "<b>Cuidado com o fall-through.</b> Sem <code>break</code>, o <code>switch</code> não para no case que combinou: ele <strong>escorrega</strong> para os próximos. Com o valor 2, imprime <code>\"dois\"</code> e também <code>\"três\"</code>."
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
          heading: "Desafio: classifique a nota",
          html: `
            <p>Escreva uma cadeia <code>if / else if / else</code> que, a partir de <code>nota</code>, imprima <code>"Aprovado"</code> (nota ≥ 7), <code>"Recuperação"</code> (nota ≥ 5) ou <code>"Reprovado"</code>. Lembre-se: a ordem das condições importa.</p>`
        },
        {
          type: "runnable",
          file: "classifique.js",
          code: [
            'const nota = 6',
            '',
            '// Imprima "Aprovado" (nota >= 7),',
            '// "Recuperação" (nota >= 5) ou "Reprovado".',
            ''
          ].join("\n"),
          solution: [
            'const nota = 6',
            '',
            'if (nota >= 7) {',
            '  console.log("Aprovado")',
            '} else if (nota >= 5) {',
            '  console.log("Recuperação")',
            '} else {',
            '  console.log("Reprovado")',
            '}'
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
            "Condicionais fazem o programa escolher caminhos com base em um booleano.",
            "if executa um bloco quando a condição é verdadeira; else dá o caminho alternativo.",
            "else if encadeia faixas: roda só a primeira condição verdadeira — a ordem importa.",
            "switch compara um valor com vários casos exatos; cada case precisa de break.",
            "Sem break, o switch sofre fall-through e escorrega para os casos seguintes.",
            "O ternário (cond ? a : b) é um if/else compacto que resulta em um valor."
          ]
        }
      ]
    }
  ]
};
