/* ============================================================
   Léxico — Conteúdo do Módulo 12
   "Strings"
   Estreia o bloco 'stringlab': laboratório de métodos de string.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["strings"] = {
  title: "Strings",
  lead: "Texto está em todo lugar: nomes, mensagens, URLs, respostas de APIs. A string é o tipo que representa texto no JavaScript — e, com os template literals e um punhado de métodos, manipulá-la fica surpreendentemente agradável.",

  steps: [
    /* 1 */
    {
      label: "O que é uma string",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Sequências de caracteres",
          html: `
            <p>Uma <strong>string</strong> é uma sequência de caracteres entre aspas — simples <code>'...'</code> ou duplas <code>"..."</code>, tanto faz. Você já as usa desde o primeiro módulo. Dá para juntá-las com <code>+</code> (concatenação) e medir seu tamanho com <code>.length</code>. Rode:</p>`
        },
        {
          type: "runnable",
          file: "string.js",
          autorun: true,
          code: [
            'const nome = "Ana"',
            "const sobrenome = 'Silva' // aspas simples também valem",
            '',
            'console.log(nome + " " + sobrenome) // "Ana Silva"',
            'console.log(nome.length)            // 3'
          ].join("\n")
        }
      ]
    },

    /* 2 */
    {
      label: "Template literals",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A forma moderna de montar texto",
          html: `
            <p>Concatenar com <code>+</code> cansa rápido. Os <strong>template literals</strong> usam crase (<code>\`</code>) e permitem inserir valores direto no texto com <code>\${...}</code>. Também aceitam várias linhas sem truque. Rode:</p>`
        },
        {
          type: "runnable",
          file: "template.js",
          autorun: true,
          code: [
            'const nome = "Ana"',
            'const idade = 28',
            '',
            'const msg = `${nome} tem ${idade} anos`',
            'console.log(msg)',
            '',
            'const bloco = `linha 1',
            'linha 2`',
            'console.log(bloco)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: o molde com lacunas",
          html: `
            <p>Pense num molde de texto com espaços em branco para preencher: "___ tem ___ anos". Os <code>\${...}</code> são essas lacunas — você escreve o texto fixo e marca onde cada valor entra. O JavaScript preenche na hora.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "Laboratório de strings",
      kind: "interactive",
      blocks: [
        {
          type: "stringlab",
          heading: "Métodos em ação",
          intro: "Strings têm muitos métodos úteis. Edite o texto e clique em cada método para ver o resultado na hora. Repare que o texto original nunca muda — cada método devolve algo novo.",
          initial: "Olá, Mundo",
          ops: [
            { label: ".toUpperCase()", fn: "s => s.toUpperCase()" },
            { label: ".toLowerCase()", fn: "s => s.toLowerCase()" },
            { label: ".length", fn: "s => s.length" },
            { label: ".slice(0, 3)", fn: "s => s.slice(0, 3)" },
            { label: '.replace("Mundo", "JS")', fn: 's => s.replace("Mundo", "JS")' },
            { label: '.includes("Olá")', fn: 's => s.includes("Olá")' }
          ]
        }
      ]
    },

    /* 4 */
    {
      label: "Métodos essenciais",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Os que você mais vai usar",
          html: `
            <p>Alguns métodos aparecem o tempo todo: <code>trim</code> (remove espaços das pontas), <code>split</code> (quebra em array), <code>replace</code> (troca trechos) e <code>includes</code> (verifica se contém algo). E como cada um devolve uma string, dá para <strong>encadeá-los</strong>. Rode:</p>`
        },
        {
          type: "runnable",
          file: "metodos.js",
          autorun: true,
          code: [
            'const frase = "  JavaScript é demais  "',
            '',
            'console.log(frase.trim())                 // sem espaços nas pontas',
            'console.log(frase.trim().toUpperCase())   // encadeado',
            'console.log("a,b,c".split(","))           // ["a","b","c"]',
            'console.log("banana".replace("a", "A"))   // "bAnana" (só a 1ª)',
            'console.log("banana".includes("nan"))     // true'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Imutabilidade",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Strings nunca mudam",
          html: `
            <p>Diferente de arrays e objetos, strings são <strong>imutáveis</strong>: nenhum método altera a string original. Eles sempre <strong>devolvem uma nova</strong>. Se você quer o resultado, precisa guardá-lo. Rode e veja o erro clássico de iniciante:</p>`
        },
        {
          type: "runnable",
          file: "imutavel.js",
          autorun: true,
          code: [
            'let texto = "ola"',
            '',
            'texto.toUpperCase()  // devolve "OLA", mas não guarda',
            'console.log(texto)   // "ola" — intacto!',
            '',
            'texto = texto.toUpperCase() // reatribuindo o retorno',
            'console.log(texto)   // "OLA"'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "🔒",
          title: "O retorno é tudo",
          html: `
            <p>Chamar um método de string sem guardar o retorno é inútil — a original continua igual. Sempre faça <code>texto = texto.metodo(...)</code> ou use o resultado direto. Esse esquecimento é um dos bugs mais comuns de quem está começando.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Unicode & length",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quando length surpreende",
          html: `
            <p>Normalmente <code>.length</code> conta os caracteres como você espera. Mas internamente o JavaScript mede em "unidades de código" (UTF-16), e alguns símbolos — como vários emojis — ocupam <strong>duas</strong> unidades. Rode e observe:</p>`
        },
        {
          type: "runnable",
          file: "unicode.js",
          autorun: true,
          code: [
            'console.log("café".length)    // 4',
            'console.log("🎉".length)       // 2 (!)',
            'console.log("a".charCodeAt(0)) // 97 (código do caractere)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🌍",
          title: "Não entre em pânico",
          html: `
            <p>Para o dia a dia, você raramente precisa pensar nisso. Só guarde a ideia: <code>length</code> conta unidades de código, não necessariamente "letras visíveis". Quando lidar com emojis ou alfabetos especiais, lembre que a contagem pode surpreender.</p>`
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
          heading: "Dentro das chaves",
          code: 'const preco = 10\nconsole.log(`Total: R$ ${preco * 2}`)',
          question: "O que aparece no console?",
          options: [
            { label: "Total: R$ 20", correct: true },
            { label: "Total: R$ ${preco * 2}" },
            { label: "Total: R$ 10 * 2" }
          ],
          okText: "<b>Certo.</b> Dentro de <code>\${...}</code> o JavaScript <strong>avalia a expressão</strong>: <code>preco * 2</code> vira <code>20</code>, e esse valor é inserido no texto. Template literals não guardam o código — guardam o resultado.",
          noText: "<b>O \${} avalia a expressão.</b> Ele não imprime <code>preco * 2</code> literalmente: calcula <code>10 * 2 = 20</code> e insere no texto. O resultado é <code>Total: R$ 20</code>."
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
          heading: "Desafio: a mensagem de boas-vindas",
          html: `
            <p>Usando um <strong>template literal</strong>, imprima exatamente: <code>Olá, Ana! Bem-vindo a Recife.</code> — mas montando a frase a partir das variáveis <code>nome</code> e <code>cidade</code>.</p>`
        },
        {
          type: "runnable",
          file: "boas-vindas.js",
          code: [
            'const nome = "Ana"',
            'const cidade = "Recife"',
            '',
            '// Use um template literal para imprimir:',
            '// Olá, Ana! Bem-vindo a Recife.',
            ''
          ].join("\n"),
          solution: [
            'const nome = "Ana"',
            'const cidade = "Recife"',
            '',
            'console.log(`Olá, ${nome}! Bem-vindo a ${cidade}.`)'
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
            "Strings são sequências de caracteres entre aspas simples ou duplas.",
            "Template literals usam crase e ${...} para inserir valores e permitem várias linhas.",
            "Métodos como trim, split, replace e includes manipulam texto e podem ser encadeados.",
            "Strings são imutáveis: métodos devolvem uma nova string e nunca alteram a original.",
            "Guarde o retorno (texto = texto.metodo()); senão a mudança se perde.",
            "length conta unidades de código UTF-16 — alguns emojis contam como 2."
          ]
        }
      ]
    }
  ]
};
