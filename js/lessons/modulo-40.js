/* ============================================================
   Léxico — Conteúdo do Módulo (slug: enums)
   "Enums" — exibido como nº 30 na trilha TypeScript.
   Estreia o bloco 'enumcompare': o mesmo conjunto modelado como
   enum (numérico/string/const) vs. união de literais, com o
   código .ts ao lado do .js compilado (o custo em runtime).
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["enums"] = {
  title: "Enums",
  lead: "Enums dão nome a um conjunto fechado de opções — status, direções, papéis. São úteis, mas têm uma peculiaridade que quase nenhum tutorial mostra: ao contrário de todo o resto do TypeScript, um enum deixa código no seu bundle. Entender isso decide quando usá-lo e quando preferir uma união de literais.",

  steps: [
    /* 1 */
    {
      label: "Opções com nome",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Matando os valores mágicos",
          html: `
            <p>Espalhar <code>status === 1</code> ou <code>cor === "VERDE"</code> pelo código é frágil: ninguém lembra o que <code>1</code> significa, e um erro de digitação em <code>"VERDE"</code> passa batido. Um <strong>enum</strong> dá nomes a esse conjunto fechado, centralizando as opções num só lugar com autocomplete.</p>
            <p>Mas há mais de uma forma de modelar "um conjunto fechado de opções" — e elas se comportam de maneira bem diferente depois de compiladas.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🎛️",
          title: "Modelo mental: o seletor de opções",
          html: `
            <p>Pense num botão giratório com posições fixas: só dá para parar nas marcas definidas. O enum (ou a união de literais) é esse botão — ele impede valores fora da lista. A diferença entre as versões é o que sobra do botão quando o código vira JavaScript.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Quatro formas",
      kind: "interactive",
      blocks: [
        {
          type: "enumcompare",
          heading: "O que você escreve × o que roda",
          intro: "O mesmo conjunto, modelado de quatro jeitos. Compare o <code>.ts</code> com o <code>.js</code> compilado e repare no ponto central: enums geram um objeto no runtime; <code>const enum</code> e a união de literais não deixam quase nada.",
          cases: [
            {
              id: "num",
              label: "enum numérico",
              ts: [
                'enum Status {',
                '  Pendente,   // 0',
                '  Ativo,      // 1',
                '  Fechado     // 2',
                '}',
                '',
                'let s: Status = Status.Ativo'
              ],
              js: [
                'var Status;',
                '(function (Status) {',
                '  Status[Status["Pendente"] = 0] = "Pendente";',
                '  Status[Status["Ativo"] = 1] = "Ativo";',
                '  Status[Status["Fechado"] = 2] = "Fechado";',
                '})(Status || (Status = {}));',
                'let s = Status.Ativo;   // 1'
              ],
              note: "Vira um <strong>objeto real</strong> com mapeamento <strong>bidirecional</strong>: <code>Status.Ativo</code> dá <code>1</code> e <code>Status[1]</code> dá <code>\"Ativo\"</code>. Poderoso, mas é código extra no bundle."
            },
            {
              id: "str",
              label: "enum de string",
              ts: [
                'enum Cor {',
                '  Vermelho = "VERMELHO",',
                '  Verde = "VERDE"',
                '}',
                '',
                'let c: Cor = Cor.Verde'
              ],
              js: [
                'var Cor;',
                '(function (Cor) {',
                '  Cor["Vermelho"] = "VERMELHO";',
                '  Cor["Verde"] = "VERDE";',
                '})(Cor || (Cor = {}));',
                'let c = Cor.Verde;   // "VERDE"'
              ],
              note: "Também gera objeto, mas <strong>só numa direção</strong> (sem reverse mapping). A vantagem: ao depurar, você vê <code>\"VERDE\"</code> em vez de um <code>1</code> sem sentido."
            },
            {
              id: "const",
              label: "const enum",
              ts: [
                'const enum Direcao {',
                '  Cima,',
                '  Baixo',
                '}',
                '',
                'let d = Direcao.Cima'
              ],
              js: [
                '// nenhum objeto é gerado!',
                'let d = 0 /* Direcao.Cima */;'
              ],
              note: "O <code>const enum</code> é <strong>inlined</strong>: o compilador troca cada uso pelo valor literal e não gera objeto nenhum. Custo zero em runtime — mas você perde iterar ou acessar pelo índice."
            },
            {
              id: "union",
              label: "união de literais",
              ts: [
                'type Status = "pendente" | "ativo" | "fechado"',
                '',
                'let s: Status = "ativo"'
              ],
              js: [
                '// o tipo some por completo:',
                'let s = "ativo";'
              ],
              note: "A união de literais <strong>não existe em runtime</strong> — some como qualquer tipo. É a opção mais leve e idiomática no TS moderno: strings legíveis, zero footprint e narrowing perfeito (Módulo 35)."
            }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Enum numérico",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Auto-incremento e mapa reverso",
          html: `
            <p>Sem valores explícitos, os membros recebem <code>0, 1, 2...</code> em ordem. O objeto gerado permite ir nos dois sentidos — nome para número e número para nome. Isso é conveniente, mas também é a razão de o enum "pesar" no bundle:</p>`
        },
        {
          type: "code",
          file: "numerico.ts",
          code: [
            'enum Status { Pendente, Ativo, Fechado }',
            '',
            'Status.Ativo        // 1   (nome → número)',
            'Status[1]           // "Ativo"  (número → nome, reverse mapping)',
            '',
            '// dá para começar de outro número:',
            'enum Codigo { OK = 200, NaoEncontrado = 404 }'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Enum de string",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Valores legíveis, melhor para depurar",
          html: `
            <p>Com valores de string explícitos, o que trafega e aparece nos logs é legível — <code>"ADMIN"</code>, não <code>0</code>. É a escolha preferida quando o valor cruza fronteiras (vai para uma API, um banco, uma URL), porque continua fazendo sentido fora do código:</p>`
        },
        {
          type: "code",
          file: "string.ts",
          code: [
            'enum Papel {',
            '  Admin = "ADMIN",',
            '  Editor = "EDITOR",',
            '  Leitor = "LEITOR"',
            '}',
            '',
            'function pode(p: Papel) {',
            '  return p === Papel.Admin',
            '}',
            '',
            'pode(Papel.Editor)   // false — e nos logs você vê "EDITOR"'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "O custo e o const enum",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quando o enum pesa",
          html: `
            <p>O ponto que o visualizador deixou claro: enums comuns <strong>geram código JavaScript</strong>. Na maioria dos projetos isso é irrelevante, mas em bibliotecas e bundles enxutos conta. O <code>const enum</code> resolve inlinando os valores — a custo de algumas limitações (não funciona bem com certos setups de build, e não dá para iterar).</p>
            <p>Por isso muitos times modernos tomam uma decisão simples: <strong>preferir união de literais por padrão</strong>, e usar enum só quando precisam de fato do objeto em runtime (iterar sobre os membros, mapeamento reverso).</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "A alternativa moderna",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "União de literais (às vezes com as const)",
          html: `
            <p>Na prática, uma união de literais cobre quase todos os casos de um enum — com strings legíveis e <strong>zero</strong> runtime. Quando você também quer o objeto para iterar, o padrão é um objeto <code>as const</code> somado a um tipo derivado dele:</p>`
        },
        {
          type: "code",
          file: "moderna.ts",
          code: [
            '// 1) só o tipo — nada em runtime:',
            'type Status = "pendente" | "ativo" | "fechado"',
            '',
            '// 2) precisa iterar? objeto as const + tipo derivado:',
            'const Status = {',
            '  Pendente: "pendente",',
            '  Ativo: "ativo",',
            '} as const',
            'type Status = typeof Status[keyof typeof Status]',
            '// "pendente" | "ativo" — e Status existe para iterar'
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
          heading: "O valor do membro",
          code: 'enum Nivel {\n  Baixo,\n  Medio,\n  Alto\n}\n\nconsole.log(Nivel.Alto)',
          question: "O que é impresso?",
          options: [
            { label: "2", correct: true },
            { label: '"Alto"' },
            { label: "3" }
          ],
          okText: "<b>Certo.</b> Sem valores explícitos, os membros são numerados a partir de <code>0</code>: <code>Baixo=0</code>, <code>Medio=1</code>, <code>Alto=2</code>. Logo, <code>Nivel.Alto</code> é <code>2</code>. (Para ver <code>\"Alto\"</code>, seria <code>Nivel[2]</code>, o mapa reverso.)",
          noText: "<b>Conte a partir do zero.</b> Enums numéricos sem valor explícito começam em <code>0</code>: <code>Baixo=0</code>, <code>Medio=1</code>, <code>Alto=2</code>. Então <code>Nivel.Alto</code> imprime <code>2</code>."
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
          heading: "Desafio: fora do conjunto",
          html: `
            <p>A variável é tipada como o enum <code>Status</code>. Antes de clicar, descubra qual linha o TypeScript recusa — e lembre que o enum fecha o conjunto de valores aceitos.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'enum Status { Pendente, Ativo, Fechado }',
            '',
            'let s: Status = Status.Ativo',
            'let t: Status = 7'
          ],
          errors: {
            "3": "Type '7' is not assignable to type 'Status'. (7 não corresponde a nenhum membro)"
          },
          js: {
            logs: [],
            crash: "Em runtime, Status é um objeto e s vale 1; mas t = 7 não é membro nenhum — exatamente o bug que o tipo do enum barra na compilação."
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
            "Enums dão nome a um conjunto fechado de opções, acabando com valores mágicos espalhados.",
            "Enum numérico gera um objeto com mapeamento bidirecional (nome↔número); começa em 0 por padrão.",
            "Enum de string gera objeto só numa direção, mas com valores legíveis — melhor para logs e APIs.",
            "const enum é inlined e não deixa objeto em runtime; a troco de limitações de build e iteração.",
            "Ao contrário do resto do TS, enums comuns deixam código no bundle — a união de literais não deixa nada.",
            "No TS moderno, prefira união de literais por padrão; use enum quando precisa do objeto em runtime."
          ]
        }
      ]
    }
  ]
};
