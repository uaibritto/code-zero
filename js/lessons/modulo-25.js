/* ============================================================
   Léxico — Conteúdo do Módulo 25
   "Introdução ao TypeScript"
   Abre a trilha TypeScript. Estreia o bloco 'tscheck':
   o mesmo código em JavaScript (quebra) vs TypeScript (pega antes).
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["intro-typescript"] = {
  title: "Introdução ao TypeScript",
  lead: "Você passou 24 módulos aprendendo como o JavaScript realmente pensa. Agora vem a camada que te protege dos próprios erros: o TypeScript não é uma linguagem nova — é o JavaScript que você já conhece, com um verificador olhando por cima do seu ombro.",

  steps: [
    /* 1 */
    {
      label: "O problema",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O JavaScript confia demais",
          html: `
            <p>O JavaScript só descobre muitos erros <strong>quando o código roda</strong> — às vezes na frente do usuário. Pior: por causa da coerção (Módulo 06), ele muitas vezes <strong>não reclama</strong> e produz um resultado errado em silêncio. Rode e veja um bug clássico:</p>`
        },
        {
          type: "runnable",
          file: "bug.js",
          autorun: true,
          code: [
            'const preco = "10"   // veio de um formulário → é string',
            '',
            'console.log("dobro:", preco * 2)  // 20  (coação por sorte)',
            'console.log("soma: ", preco + 2)  // "102"  (bug silencioso!)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🦺",
          title: "Modelo mental: o cinto de segurança",
          html: `
            <p>O JavaScript dirige em alta velocidade sem cinto: tudo bem até a primeira curva fechada. O TypeScript é o cinto — ele não muda o carro, mas te avisa do perigo <strong>antes</strong> do acidente, não depois.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "JS vs TS",
      kind: "interactive",
      blocks: [
        {
          type: "tscheck",
          heading: "O mesmo código, duas reações",
          intro: "Abaixo, uma função que espera um texto. Clique em <strong>Rodar como JavaScript</strong> e veja o que acontece. Depois clique em <strong>Verificar com TypeScript</strong> e repare onde o erro é pego — antes de rodar.",
          file: "saudar.ts",
          code: [
            'function saudar(nome: string) {',
            '  return "Olá, " + nome.toUpperCase()',
            '}',
            '',
            'console.log(saudar("Ana"))',
            'console.log(saudar(42))'
          ],
          errors: {
            "5": "Argument of type 'number' is not assignable to parameter of type 'string'."
          },
          js: {
            logs: ["Olá, ANA"],
            crash: "TypeError: nome.toUpperCase is not a function (linha 2, ao rodar saudar(42))"
          }
        },
        {
          type: "prose",
          html: `
            <p>O JavaScript rodou feliz até bater em <code>42.toUpperCase()</code> — e aí quebrou, em produção. O TypeScript apontou a linha <strong>antes de rodar qualquer coisa</strong>. Essa é a ideia inteira.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "O que é",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um superconjunto do JavaScript",
          html: `
            <p>Três fatos que explicam quase tudo:</p>
            <ul>
              <li><strong>Todo JavaScript válido é TypeScript válido.</strong> Você não recomeça do zero — só adiciona tipos onde ajudam.</li>
              <li><strong>O TypeScript não roda.</strong> Um compilador (<code>tsc</code>) o traduz para JavaScript comum, que é o que o browser ou o Node executam.</li>
              <li><strong>Os tipos somem na tradução.</strong> Eles existem só enquanto você escreve e compila — em tempo de execução, não sobra nenhum tipo.</li>
            </ul>`
        }
      ]
    },

    /* 4 */
    {
      label: "Anotações",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Dizendo o tipo com :",
          html: `
            <p>A sintaxe central é <code>: tipo</code> depois do nome. Você anota variáveis, parâmetros e o retorno de funções. Os três tipos básicos herdam direto dos valores do JavaScript (Módulo 04):</p>`
        },
        {
          type: "code",
          file: "anotacoes.ts",
          code: [
            'let nome: string = "Ana"',
            'let idade: number = 30',
            'let ativo: boolean = true',
            '',
            '// parâmetros e retorno de uma função',
            'function somar(a: number, b: number): number {',
            '  return a + b',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Inferência",
      kind: "interactive",
      blocks: [
        {
          type: "prose",
          heading: "Você nem sempre precisa anotar",
          html: `
            <p>Na maior parte do tempo o TypeScript <strong>adivinha</strong> o tipo pelo valor inicial — isso se chama <em>inferência</em>. Se você escreve <code>let idade = 30</code>, ele já sabe que <code>idade</code> é <code>number</code>, e passa a vigiar. Teste os dois botões:</p>`
        },
        {
          type: "tscheck",
          file: "inferencia.ts",
          code: [
            'let idade = 30          // TS infere: number',
            '',
            'idade = 31              // ok, ainda é number',
            'idade = "trinta e um"   // e isto?'
          ],
          errors: {
            "3": "Type 'string' is not assignable to type 'number'."
          },
          js: {
            logs: [],
            crash: "Em JavaScript isto não dá erro — idade vira a string \"trinta e um\" sem aviso."
          }
        }
      ]
    },

    /* 6 */
    {
      label: "A compilação",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "De .ts para .js",
          html: `
            <p>Veja o antes e o depois. O arquivo que você escreve tem tipos; o arquivo que o browser roda é JavaScript puro — os tipos foram <strong>apagados</strong>. Alterne as abas:</p>`
        },
        {
          type: "codetabs",
          tabs: [
            {
              label: "aluno.ts",
              file: "aluno.ts",
              code: [
                'function media(notas: number[]): number {',
                '  const soma = notas.reduce((a, b) => a + b, 0)',
                '  return soma / notas.length',
                '}',
                '',
                'const resultado: number = media([8, 6, 10])'
              ].join("\n"),
              note: "O que você escreve: anotações <code>: number[]</code> e <code>: number</code> guiam o verificador."
            },
            {
              label: "aluno.js (compilado)",
              file: "aluno.js",
              code: [
                'function media(notas) {',
                '  const soma = notas.reduce((a, b) => a + b, 0)',
                '  return soma / notas.length',
                '}',
                '',
                'const resultado = media([8, 6, 10])'
              ].join("\n"),
              note: "O que roda: os tipos sumiram. É JavaScript idêntico ao que você já sabe escrever."
            }
          ]
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
          heading: "Os tipos existem quando o código roda?",
          code: 'let total: number = 100\nconsole.log(typeof total)',
          question: "Depois de compilado, o que esse código imprime em tempo de execução?",
          options: [
            { label: '"number" — o typeof do JavaScript', correct: true },
            { label: "a anotação : number que você escreveu" },
            { label: "um erro, porque o tipo foi apagado" }
          ],
          okText: "<b>Certo.</b> A anotação <code>: number</code> é apagada na compilação. O que sobra é <code>let total = 100</code>, então <code>typeof</code> devolve a string <code>\"number\"</code> do próprio JavaScript (Módulo 04) — nada a ver com TypeScript.",
          noText: "<b>Lembre: os tipos somem.</b> A anotação <code>: number</code> só existe enquanto você escreve e compila. Em runtime roda <code>let total = 100</code>, e <code>typeof</code> é o operador normal do JavaScript — resultado: <code>\"number\"</code>."
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
          heading: "Desafio: ache o erro",
          html: `
            <p>A função abaixo monta uma mensagem. Antes de clicar, <strong>preveja</strong> qual linha o TypeScript vai apontar. Depois use os botões para conferir o que o JavaScript faz e o que o verificador pega.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'function repetir(texto: string, vezes: number): string {',
            '  return texto.repeat(vezes)',
            '}',
            '',
            'console.log(repetir("ab", 3))',
            'console.log(repetir("ab", "3"))'
          ],
          errors: {
            "5": "Argument of type 'string' is not assignable to parameter of type 'number'."
          },
          js: {
            logs: ["ababab"],
            crash: "RangeError: Invalid count value (linha 2: \"3\" vira NaN e repeat quebra)."
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
            "O JavaScript só pega muitos erros em runtime — e, por coerção, às vezes nem pega.",
            "O TypeScript verifica os tipos ANTES de rodar, apontando o problema na linha exata.",
            "Todo JavaScript válido já é TypeScript válido — você só acrescenta tipos onde ajudam.",
            "A sintaxe central é : tipo (string, number, boolean) em variáveis, parâmetros e retorno.",
            "A inferência deixa o TS adivinhar o tipo pelo valor inicial, sem você anotar tudo.",
            "O tsc compila .ts → .js e apaga os tipos: em tempo de execução, é JavaScript puro."
          ]
        }
      ]
    }
  ]
};
