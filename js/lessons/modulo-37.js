/* ============================================================
   Léxico — Conteúdo do Módulo (slug: igualdade-e-strict)
   "Igualdade e modo estrito" — exibido como nº 07 na trilha JS.
   Estreia o bloco 'eqalgos': os 4 algoritmos de igualdade do JS
   (==, ===, SameValueZero, Object.is) comparados lado a lado.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["igualdade-e-strict"] = {
  title: "Igualdade e modo estrito",
  lead: "Você já viu == e === no módulo de coerção. Mas o JavaScript tem, na verdade, quatro formas de perguntar 'esses dois valores são iguais?' — e elas discordam exatamente nos casos que mais geram bugs: NaN, o zero negativo e a dupla null/undefined.",

  steps: [
    /* 1 */
    {
      label: "Quatro igualdades",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Não existe 'igual', existem quatro",
          html: `
            <p>Perguntar se dois valores são iguais parece trivial, mas o JavaScript define <strong>quatro algoritmos</strong> diferentes, cada um usado em lugares distintos:</p>
            <ul>
              <li><code>==</code> (loose) — compara <strong>com coerção</strong>: converte tipos antes de comparar.</li>
              <li><code>===</code> (strict) — compara <strong>sem coerção</strong>: tipos diferentes nunca são iguais.</li>
              <li><strong>SameValueZero</strong> — como <code>===</code>, mas trata <code>NaN</code> como igual a <code>NaN</code>. É o que <code>Array.includes</code> e <code>Set</code> usam.</li>
              <li><strong>SameValue</strong> (<code>Object.is</code>) — como SameValueZero, mas distingue <code>+0</code> de <code>-0</code>.</li>
            </ul>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "⚖️",
          title: "Modelo mental: réguas diferentes",
          html: `
            <p>São quatro réguas para medir a mesma coisa. Na maior parte do tempo elas concordam — por isso você usa <code>===</code> e segue a vida. Mas em três ou quatro valores especiais elas divergem, e é aí que mora o bug difícil de achar.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Onde discordam",
      kind: "interactive",
      blocks: [
        {
          type: "eqalgos",
          heading: "Compare os quatro algoritmos",
          intro: "Escolha um par de valores e veja como cada algoritmo o julga. Procure os casos em que as células <strong>discordam</strong> — são eles que você precisa conhecer.",
          pairs: [
            { a: "1", b: "1", la: "1", lb: "1", note: "Caso trivial: todos concordam que são iguais. É assim 99% do tempo." },
            { a: '"1"', b: "1", la: '"1"', lb: "1", note: "A string <code>\"1\"</code> e o número <code>1</code>: só o <code>==</code> os considera iguais, porque faz coerção. Os outros três olham o tipo e dizem não." },
            { a: "NaN", b: "NaN", la: "NaN", lb: "NaN", note: "O famoso: <code>NaN</code> não é igual a si mesmo para <code>==</code> e <code>===</code>! Só SameValueZero e <code>Object.is</code> reconhecem a igualdade — por isso <code>[NaN].includes(NaN)</code> é true, mas <code>NaN === NaN</code> é false." },
            { a: "+0", b: "-0", la: "+0", lb: "-0", note: "O zero com sinal: <code>==</code>, <code>===</code> e SameValueZero dizem iguais. Só <code>Object.is</code> distingue <code>+0</code> de <code>-0</code> — o caso onde ele é mais rigoroso que o <code>===</code>." },
            { a: "null", b: "undefined", la: "null", lb: "undefined", note: "Os dois vazios: <code>==</code> os considera iguais (coerção), mas <code>===</code> e os demais não. Por isso <code>x == null</code> é um atalho comum para checar 'null ou undefined'." },
            { a: "0", b: "false", la: "0", lb: "false", note: "Coerção clássica: <code>0 == false</code> é true, porque <code>==</code> converte o boolean em número. <code>===</code> olha os tipos e recusa." }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "A regra prática",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Use === quase sempre",
          html: `
            <p>A recomendação de sempre continua: <strong>use <code>===</code> por padrão</strong>. Ele é previsível — sem coerção, sem surpresa. Reserve o <code>==</code> para um único caso útil e idiomático: <code>x == null</code>, que pega <code>null</code> e <code>undefined</code> de uma vez.</p>`
        },
        {
          type: "code",
          file: "igualdade.ts",
          code: [
            'valor === 10          // o padrão: estrito e previsível',
            '',
            'if (x == null) { }    // atalho idiomático: null OU undefined',
            '',
            '[1, NaN].includes(NaN)   // true  (SameValueZero)',
            'NaN === NaN              // false (strict não reconhece NaN)',
            'Object.is(-0, +0)        // false (o único que distingue)'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "O caso NaN",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Por que NaN não é igual a si mesmo",
          html: `
            <p><code>NaN</code> ("Not a Number") representa um resultado inválido — <code>0/0</code>, <code>Math.sqrt(-1)</code>. A ideia por trás da regra é filosófica: dois cálculos inválidos <strong>diferentes</strong> não deveriam ser considerados "o mesmo valor". Por isso <code>NaN === NaN</code> é <code>false</code>.</p>
            <p>Para testar se algo é <code>NaN</code>, não compare — use <code>Number.isNaN()</code>:</p>`
        },
        {
          type: "runnable",
          file: "nan.js",
          autorun: true,
          code: [
            'const r = 0 / 0',
            'console.log("r é:", r)',
            'console.log("r === NaN?", r === NaN)        // false! (nunca funciona)',
            'console.log("Number.isNaN(r)?", Number.isNaN(r))  // true (a forma certa)'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "use strict",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O modo que fecha as armadilhas",
          html: `
            <p>O <strong>modo estrito</strong> (<code>"use strict"</code>) muda o JavaScript para uma versão mais segura e previsível da linguagem. Ele transforma erros silenciosos em erros reais e proíbe pegadinhas antigas:</p>
            <ul>
              <li>Atribuir a uma variável não declarada vira <strong>erro</strong> (sem strict, criava uma global por acidente).</li>
              <li><code>this</code> em uma função comum é <code>undefined</code> em vez de virar o objeto global.</li>
              <li>Nomes duplicados de parâmetros e outras ambiguidades são proibidos.</li>
            </ul>
            <p>Boa notícia: <strong>módulos ES (Módulo 19) e classes já são sempre strict</strong>. Então, se você escreve código moderno, está no modo estrito o tempo todo — sem precisar declarar nada.</p>`
        },
        {
          type: "code",
          file: "strict.js",
          code: [
            '"use strict"   // no topo do arquivo ou da função',
            '',
            'contador = 10  // ✗ ReferenceError: contador não declarado',
            '               //   (sem strict, isso criava uma global silenciosa)',
            '',
            '// em módulos ES e dentro de class, strict é automático'
          ].join("\n")
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
          heading: "NaN na prática",
          code: 'const resultado = Number("abc")\nconsole.log(resultado === resultado)',
          question: "O que é impresso?",
          options: [
            { label: "false", correct: true },
            { label: "true" },
            { label: "NaN" }
          ],
          okText: "<b>Certo.</b> <code>Number(\"abc\")</code> é <code>NaN</code>, e <code>NaN</code> nunca é igual a si mesmo com <code>===</code>. Então <code>resultado === resultado</code> é <code>false</code> — na verdade, esse é um jeito antigo (e confuso) de detectar NaN. Prefira <code>Number.isNaN()</code>.",
          noText: "<b>Lembre da regra do NaN.</b> <code>Number(\"abc\")</code> dá <code>NaN</code>, e <code>NaN === NaN</code> é sempre <code>false</code>. Logo, <code>resultado === resultado</code> é <code>false</code> — a única 'coisa' que não é igual a si mesma em JavaScript."
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
          heading: "Desafio: detectar o vazio",
          html: `
            <p>Escreva uma função <code>estaVazio(x)</code> que devolve <code>true</code> se <code>x</code> for <code>null</code> <strong>ou</strong> <code>undefined</code> — usando o atalho idiomático <code>== null</code>. Teste-a com os três casos abaixo.</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            '// escreva estaVazio(x) usando == null',
            '',
            '',
            '// console.log(estaVazio(null))       // true',
            '// console.log(estaVazio(undefined))  // true',
            '// console.log(estaVazio(0))          // false'
          ].join("\n"),
          solution: [
            'function estaVazio(x) {',
            '  return x == null   // pega null E undefined de uma vez',
            '}',
            '',
            'console.log(estaVazio(null))       // true',
            'console.log(estaVazio(undefined))  // true',
            'console.log(estaVazio(0))          // false'
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
            "O JavaScript tem quatro algoritmos de igualdade: ==, ===, SameValueZero e SameValue (Object.is).",
            "== faz coerção; === não; os dois tratam NaN como diferente de si mesmo.",
            "SameValueZero (usado por includes e Set) considera NaN igual a NaN; Object.is também distingue +0 de -0.",
            "Use === por padrão; reserve == para o idioma x == null (null ou undefined).",
            "Para testar NaN, use Number.isNaN() — nunca === NaN.",
            "O modo estrito fecha armadilhas antigas e já é automático em módulos ES e classes."
          ]
        }
      ]
    }
  ]
};
