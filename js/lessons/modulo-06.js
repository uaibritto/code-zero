/* ============================================================
   Léxico — Conteúdo do Módulo 06
   "Operadores e coerção"
   Estreia o bloco 'equality': comparador == vs === ao vivo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["operadores-e-coercao"] = {
  title: "Operadores e coerção",
  lead: "Operadores são os verbos do JavaScript: somam, comparam, combinam. E é aqui que mora uma das partes mais mal-entendidas da linguagem — a coerção, a conversão automática de tipos que gera as pegadinhas mais famosas.",

  steps: [
    /* 1 */
    {
      label: "Operadores",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Os verbos da linguagem",
          html: `
            <p>Se valores são os substantivos do seu programa, <strong>operadores</strong> são os verbos: eles agem sobre os valores. Somar dois números, comparar duas idades, combinar duas condições — tudo isso é feito com operadores.</p>
            <p>Eles se dividem em alguns grupos: <strong>aritméticos</strong> (fazem contas), <strong>de comparação</strong> (perguntam se algo é maior, menor ou igual) e <strong>lógicos</strong> (combinam respostas de sim/não). Vamos passar por cada um — e pelo comportamento que confunde todo iniciante.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Aritméticos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Fazendo contas",
          html: `
            <p>Os operadores aritméticos são quase os mesmos da calculadora, com dois que surpreendem: <code>%</code> devolve o <strong>resto</strong> de uma divisão (ótimo para saber se um número é par), e <code>**</code> faz <strong>potência</strong>. Rode e observe:</p>`
        },
        {
          type: "runnable",
          file: "aritmetica.js",
          autorun: true,
          code: [
            'console.log(7 + 3)   // 10',
            'console.log(7 - 3)   // 4',
            'console.log(7 * 3)   // 21',
            'console.log(7 / 2)   // 3.5',
            'console.log(7 % 2)   // 1  (resto da divisão)',
            'console.log(2 ** 10) // 1024  (potência)'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Igualdade: == vs ===",
      kind: "interactive",
      blocks: [
        {
          type: "equality",
          heading: "Dois tipos de “igual”",
          intro: "O JavaScript tem dois operadores de igualdade, e a diferença é enorme. O <code>===</code> (estrito) compara valor E tipo, sem converter nada. O <code>==</code> (frouxo) tenta <strong>converter os tipos</strong> antes de comparar — e é aí que começam as surpresas. Teste os pares abaixo e repare quando os dois discordam:",
          initial: ['"5"', '5'],
          pairs: [
            ['"5"', '5'],
            ['0', 'false'],
            ['null', 'undefined'],
            ['"1"', 'true'],
            ['1', '1'],
            ['"abc"', '"abc"']
          ]
        },
        {
          type: "callout",
          variant: "warn",
          icon: "✅",
          title: "A regra de ouro",
          html: `
            <p>Use <strong>sempre <code>===</code></strong> (e <code>!==</code>). O <code>==</code> esconde conversões que você não pediu e produz resultados difíceis de prever, como <code>0 == false</code> sendo <code>true</code>. Comparar com tipo garante que você compara o que realmente quis.</p>`
        }
      ]
    },

    /* 4 */
    {
      label: "Coerção",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A conversão automática de tipos",
          html: `
            <p>Você acabou de ver o <code>==</code> convertendo tipos. Esse mecanismo tem um nome: <strong>coerção</strong> — quando o JavaScript converte um valor de um tipo para outro por conta própria, para conseguir completar uma operação.</p>
            <p>O exemplo mais clássico é o operador <code>+</code>. Com números, ele soma. Mas se um dos lados for texto, ele faz outra coisa: <strong>junta os dois como texto</strong> (concatenação). Já o <code>-</code> não tem versão para texto, então o JavaScript converte tudo em número. Rode e observe a inconsistência:</p>`
        },
        {
          type: "runnable",
          file: "coercao.js",
          autorun: true,
          code: [
            'console.log("5" + 1)   // "51"  (+ com texto: junta)',
            'console.log("5" - 1)   // 4     (- converte para número)',
            'console.log("5" * 2)   // 10',
            'console.log(true + 1)  // 2     (true vira 1)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: o tradutor apressado",
          html: `
            <p>Imagine um tradutor que, em vez de dizer "não entendi", <strong>chuta</strong> uma conversão para a operação não falhar. É isso que a coerção faz. Isso evita alguns erros, mas cria resultados surpreendentes — por isso vale conhecê-la para não ser pego de surpresa.</p>`
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
          heading: "Mesmo valor, operadores diferentes",
          code: 'console.log("5" + 1)\nconsole.log("5" - 1)',
          question: "Quais dois valores aparecem no console?",
          options: [
            { label: '"51" e 4', correct: true },
            { label: '6 e 4' },
            { label: '"51" e "51"' }
          ],
          okText: "<b>Perfeito.</b> O <code>+</code> vê um texto e concatena: <code>\"5\" + 1</code> vira <code>\"51\"</code>. O <code>-</code> não existe para texto, então o JavaScript converte <code>\"5\"</code> em número e calcula <code>5 - 1 = 4</code>. O mesmo valor, tratado de dois jeitos — a assinatura da coerção.",
          noText: "<b>Olhe o operador.</b> Com <code>+</code> e um texto no meio, o JavaScript concatena: vira <code>\"51\"</code>. Com <code>-</code>, ele não tem como juntar texto, então converte <code>\"5\"</code> para número e faz <code>5 - 1 = 4</code>."
        }
      ]
    },

    /* 6 */
    {
      label: "truthy e falsy",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Todo valor é verdadeiro ou falso",
          html: `
            <p>Quando um valor é usado onde se espera um sim/não — como numa condição —, o JavaScript o converte para <code>boolean</code>. Qualquer valor, então, é <strong>truthy</strong> (vale como <code>true</code>) ou <strong>falsy</strong> (vale como <code>false</code>).</p>
            <p>Rode para ver alguns valores sendo convertidos com <code>Boolean()</code>:</p>`
        },
        {
          type: "runnable",
          file: "truthy.js",
          autorun: true,
          code: [
            'console.log(Boolean(0))       // false',
            'console.log(Boolean(""))      // false',
            'console.log(Boolean("texto")) // true',
            'console.log(Boolean(42))      // true',
            'console.log(Boolean(null))    // false'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "📋",
          title: "A lista completa dos falsy",
          html: `
            <p>São apenas <strong>seis</strong> valores falsy — vale decorar: <code>false</code>, <code>0</code>, <code>""</code> (string vazia), <code>null</code>, <code>undefined</code> e <code>NaN</code>.</p>
            <p><strong>Todo o resto é truthy</strong> — inclusive pegadinhas como <code>"0"</code>, <code>"false"</code>, <code>[]</code> (array vazio) e <code>{}</code> (objeto vazio).</p>`
        }
      ]
    },

    /* 7 */
    {
      label: "Classifique",
      kind: "exercise",
      blocks: [
        {
          type: "classify",
          heading: "Truthy ou falsy?",
          question: "Cada valor abaixo, quando convertido para boolean, vira true (truthy) ou false (falsy)?",
          buckets: [
            { id: "truthy", label: "Truthy (vale true)", short: "Truthy" },
            { id: "falsy", label: "Falsy (vale false)", short: "Falsy" }
          ],
          items: [
            { text: "0", bucket: "falsy" },
            { text: '"" (string vazia)', bucket: "falsy" },
            { text: "null", bucket: "falsy" },
            { text: '"0" (texto com zero)', bucket: "truthy" },
            { text: "42", bucket: "truthy" },
            { text: "[] (array vazio)", bucket: "truthy" }
          ],
          okText: "As pegadinhas estão aqui: <code>\"0\"</code> e <code>[]</code> são <strong>truthy</strong> — só a string totalmente vazia <code>\"\"</code> é falsy; qualquer texto com algo dentro vale true. Lembre-se: os falsy são só aqueles seis.",
          noText: "Dica: comece pela lista dos seis falsy (<code>false, 0, \"\", null, undefined, NaN</code>). Se o valor não está nela, é truthy — por isso <code>\"0\"</code> (um texto) e <code>[]</code> (um array) são truthy."
        }
      ]
    },

    /* 8 */
    {
      label: "Lógicos & short-circuit",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Combinando respostas",
          html: `
            <p>Os operadores lógicos combinam valores de verdade: <code>&&</code> (E — só é true se ambos forem), <code>||</code> (OU — true se algum for) e <code>!</code> (NÃO — inverte).</p>
            <p>Eles têm um truque útil chamado <strong>short-circuit</strong>: avaliam da esquerda para a direita e <strong>param assim que o resultado já está decidido</strong>. Isso permite um padrão comum: <code>valor || padrão</code> entrega o primeiro valor "cheio". Rode:</p>`
        },
        {
          type: "runnable",
          file: "logicos.js",
          autorun: true,
          code: [
            'console.log(true && false) // false',
            'console.log(true || false) // true',
            'console.log(!true)         // false',
            '',
            '// short-circuit: usa o primeiro valor truthy',
            'const nome = "" || "Visitante"',
            'console.log(nome)          // "Visitante"'
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
          heading: "Desafio: a comparação enganosa",
          html: `
            <p>Queremos checar se o valor digitado é <strong>exatamente</strong> o número <code>0</code>. Mas o código abaixo usa <code>==</code> e, por coerção, considera a string vazia <code>""</code> como igual a <code>0</code> — um bug clássico. Conserte para que o resultado seja <code>false</code>.</p>`
        },
        {
          type: "runnable",
          file: "conserte.js",
          autorun: true,
          code: [
            'const digitado = "" // string vazia, NÃO é o número 0',
            '',
            'console.log(digitado == 0) // true?! coerção enganosa'
          ].join("\n"),
          solution: [
            'const digitado = ""',
            '',
            '// === compara valor E tipo, sem converter',
            'console.log(digitado === 0) // false — correto!'
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
            "Operadores agem sobre valores: aritméticos, de comparação e lógicos.",
            "% devolve o resto da divisão; ** faz potência.",
            "=== compara valor e tipo sem converter; == converte antes (coerção). Prefira sempre ===.",
            "Coerção é a conversão automática de tipos: \"5\" + 1 = \"51\", mas \"5\" - 1 = 4.",
            "Todo valor é truthy ou falsy; os falsy são só seis: false, 0, \"\", null, undefined, NaN.",
            "&&, || e ! combinam condições, com short-circuit que para assim que a resposta é definida."
          ]
        }
      ]
    }
  ]
};
