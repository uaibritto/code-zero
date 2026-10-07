/* ============================================================
   Léxico — Conteúdo do Módulo 27
   "any, unknown e never"
   Estreia o bloco 'typeuniverse': unknown é o universo (todos os
   valores), never é o vazio (nenhum valor), any fura as paredes.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["any-unknown-never"] = {
  title: "any, unknown e never",
  lead: "Três tipos que parecem exóticos, mas são os extremos do mapa. any desliga a checagem (perigoso). unknown é o 'topo' seguro: aceita tudo, mas te obriga a verificar antes de usar. never é o 'fundo': o tipo que não tem nenhum valor.",

  steps: [
    /* 1 */
    {
      label: "Os extremos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Topo, fundo e a saída de emergência",
          html: `
            <p>No Módulo 30 você viu que um tipo é um conjunto de valores. Esses três são os casos-limite desse mundo:</p>
            <ul>
              <li><code>unknown</code> é o conjunto que contém <strong>todos</strong> os valores — o universo inteiro.</li>
              <li><code>never</code> é o conjunto <strong>vazio</strong> — nenhum valor pertence a ele.</li>
              <li><code>any</code> não é bem um conjunto: é uma saída de emergência que <strong>desliga</strong> o verificador.</li>
            </ul>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🌌",
          title: "Modelo mental: o mapa dos tipos",
          html: `
            <p>Imagine todos os tipos num mapa. <code>unknown</code> é a borda que cerca tudo; <code>never</code> é o ponto central sem área nenhuma; os tipos comuns (<code>string</code>, <code>number</code>) ocupam o meio. <code>any</code> é um fantasma que atravessa qualquer parede — conveniente e perigoso.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O universo",
      kind: "interactive",
      blocks: [
        {
          type: "typeuniverse",
          heading: "Onde cada um vive",
          intro: "Clique em cada tipo para ver sua região no mapa e entender como ele se comporta. Repare: <code>unknown</code> cerca tudo, <code>never</code> é o vazio no centro, e <code>any</code> ignora as paredes.",
          concepts: [
            { id: "unknown", label: "unknown", desc: "o <strong>topo</strong>: contém todos os valores. Qualquer coisa cabe num <code>unknown</code> — por isso o TS não deixa você usá-lo até <strong>provar</strong> qual tipo é (narrowing)." },
            { id: "string", label: "string", desc: "um tipo comum: um subconjunto do universo. Cabe dentro de <code>unknown</code>, e você pode usar seus métodos livremente." },
            { id: "number", label: "number", desc: "outro subconjunto comum. Como <code>string</code>, vive dentro de <code>unknown</code> e tem suas próprias operações seguras." },
            { id: "boolean", label: "boolean", desc: "o menor dos comuns: só <code>true</code> e <code>false</code>. Ainda assim, um subconjunto bem definido do universo." },
            { id: "never", label: "never", desc: "o <strong>fundo</strong>: o conjunto vazio. Nenhum valor é <code>never</code>. Aparece onde um valor é impossível — um ramo que nunca acontece, uma função que nunca retorna." },
            { id: "any", label: "any", desc: "a <strong>saída de emergência</strong>: desliga a checagem. Atravessa qualquer parede nos dois sentidos — e com isso devolve você ao JavaScript sem rede de proteção." }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "any",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Poderoso e traiçoeiro",
          html: `
            <p>Um valor <code>any</code> aceita qualquer operação sem reclamar — o verificador simplesmente desiste dele. Isso parece liberdade, mas é como arrancar o cinto de segurança: os bugs voltam a aparecer só em runtime. Use <code>any</code> como último recurso, nunca por preguiça.</p>`
        },
        {
          type: "tscheck",
          file: "any.ts",
          code: [
            'let dado: any = "texto"',
            '',
            'dado.foo.bar               // o TS deixa passar...',
            'dado()                     // ...e isto também...',
            'dado.toFixed(2)            // ...e isto'
          ],
          errors: {},
          js: {
            logs: [],
            crash: "Nenhum erro de tipo — mas em runtime \"texto\".foo.bar e \"texto\"() quebram. O any escondeu tudo."
          }
        }
      ]
    },

    /* 4 */
    {
      label: "unknown",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O any seguro",
          html: `
            <p><code>unknown</code> também aceita qualquer valor na entrada — mas, ao contrário do <code>any</code>, não deixa você <strong>fazer nada</strong> com ele até verificar o tipo. É o par perfeito para dados que chegam de fora (um <code>fetch</code>, um JSON), quando você ainda não sabe o formato:</p>`
        },
        {
          type: "tscheck",
          file: "unknown.ts",
          code: [
            'let dado: unknown = carregarJSON()',
            '',
            'dado.toUpperCase()              // ✗ bloqueado: e se não for string?',
            '',
            'if (typeof dado === "string") {',
            '  dado.toUpperCase()            // ✓ agora o TS sabe que é string',
            '}'
          ],
          errors: {
            "2": "'dado' is of type 'unknown'. (verifique o tipo antes de usar)"
          },
          js: {
            logs: [],
            crash: "Em JavaScript isso roda e pode quebrar; o TypeScript com unknown te obriga a checar primeiro."
          }
        }
      ]
    },

    /* 5 */
    {
      label: "never",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O tipo do impossível",
          html: `
            <p><code>never</code> é o valor que nunca existe. Você raramente o escreve à mão, mas ele aparece sozinho em dois lugares: uma função que <strong>nunca retorna</strong> (lança erro ou roda para sempre), e um ramo de código que o TypeScript provou ser <strong>inalcançável</strong>. É a ferramenta das checagens exaustivas (Módulo 35).</p>`
        },
        {
          type: "code",
          file: "never.ts",
          code: [
            '// função que nunca devolve um valor: retorno never',
            'function falhar(msg: string): never {',
            '  throw new Error(msg)',
            '}',
            '',
            '// ramo impossível: depois de cobrir todos os casos,',
            '// o que sobra tem tipo never — e o TS confirma isso.'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "any vs unknown",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A regra prática",
          html: `
            <p>Os dois aceitam qualquer valor. A diferença está no que vem <strong>depois</strong>:</p>
            <ul>
              <li><code>any</code>: faça o que quiser, por sua conta e risco. O verificador saiu de cena.</li>
              <li><code>unknown</code>: o verificador fica, e cobra uma verificação antes de qualquer uso.</li>
            </ul>
            <p><strong>Regra:</strong> quando for tentado a escrever <code>any</code> para dados externos, escreva <code>unknown</code>. Você mantém a segurança e só paga o preço de um <code>if</code> de checagem.</p>`
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
          heading: "Qual deles bloqueia o erro?",
          code: 'function tamanho(x: ???) {\n  return x.length\n}',
          question: "Para que o TypeScript RECUSE x.length (porque x pode não ter .length), qual tipo você usa?",
          options: [
            { label: "unknown — exige verificar antes de usar", correct: true },
            { label: "any — aceita qualquer coisa" },
            { label: "never — o tipo vazio" }
          ],
          okText: "<b>Certo.</b> Com <code>unknown</code>, o TS não deixa acessar <code>.length</code> até você provar que <code>x</code> tem esse campo (com um <code>typeof</code> ou checagem). Com <code>any</code>, ele deixaria passar e quebraria em runtime.",
          noText: "<b>Pense em quem mantém a proteção.</b> <code>any</code> deixa <code>x.length</code> passar sem checar. <code>never</code> nem aceita um valor. Só <code>unknown</code> aceita o valor E exige a verificação antes do uso."
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
          heading: "Desafio: any não protege",
          html: `
            <p>O código abaixo usa <code>any</code>. Antes de clicar, preveja: o verificador vai reclamar? Depois rode como JavaScript para ver o que <code>any</code> estava escondendo.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'function processar(entrada: any) {',
            '  return entrada.toUpperCase()',
            '}',
            '',
            'console.log(processar("ok"))',
            'console.log(processar(123))'
          ],
          errors: {},
          js: {
            logs: ["OK"],
            crash: "TypeError: entrada.toUpperCase is not a function (linha 2, em processar(123)). Com unknown + checagem, o TS teria avisado antes."
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
            "unknown é o topo: contém todos os valores, mas exige verificação antes de qualquer uso.",
            "never é o fundo: o conjunto vazio, o tipo de valores que nunca existem.",
            "any desliga o verificador — aceita tudo e esconde erros até o runtime. Último recurso.",
            "any e unknown aceitam qualquer valor; só unknown mantém a segurança, cobrando um narrowing.",
            "never aparece sozinho em funções que nunca retornam e em ramos de código inalcançáveis.",
            "Regra prática: para dados externos, prefira unknown a any."
          ]
        }
      ]
    }
  ]
};
