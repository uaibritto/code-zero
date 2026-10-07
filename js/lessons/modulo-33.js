/* ============================================================
   Léxico — Conteúdo do Módulo 33
   "Type-level programming"
   Estreia o bloco 'typerec': avalia um tipo recursivo passo a
   passo — desce até o caso base e sobe montando o resultado.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["type-level"] = {
  title: "Type-level programming",
  lead: "Conditional types são o if. Mapped types são o for. Falta uma peça para fechar uma linguagem de verdade: a recursão. Com ela, o sistema de tipos do TypeScript vira um pequeno computador — capaz de calcular, no nível dos tipos, coisas que parecem impossíveis.",

  steps: [
    /* 1 */
    {
      label: "Tipos computam",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma linguagem completa",
          html: `
            <p>Reúna o que você viu: <code>extends ? :</code> decide, <code>[K in keyof T]</code> itera, <code>infer</code> captura, template literals montam strings. Falta a recursão — um tipo que se refere a <strong>si mesmo</strong>. Com ela, o sistema de tipos ganha poder de computação real.</p>
            <p>Isso tem um custo: tudo roda <strong>na compilação</strong>, não em runtime (os tipos somem, lembra do Módulo 29). Então é computação para <strong>garantir correção</strong>, não para processar dados. Mas o que dá para expressar impressiona.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🪆",
          title: "Modelo mental: as matrioscas",
          html: `
            <p>Um tipo recursivo é uma boneca russa: abra uma e há outra menor dentro, até a menorzinha que não abre (o caso base). Para montar a resposta, você vai até o fundo e depois fecha boneca por boneca, de dentro para fora.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "A recursão",
      kind: "interactive",
      blocks: [
        {
          type: "typerec",
          heading: "Avalie um tipo recursivo",
          intro: "Este tipo inverte uma tupla. Avance e acompanhe: ele separa a cabeça, <strong>recorre</strong> no resto (azul, descendo) até a tupla vazia (rosa, caso base), e então <strong>monta</strong> o resultado de volta (verde, subindo).",
          signature: "type Reverse<T> = T extends [infer H, ...infer R] ? [...Reverse<R>, H] : []",
          steps: [
            { call: "Reverse<[1, 2, 3]>", expand: "[...Reverse<[2, 3]>, 1]", phase: "down", depth: 0, note: "Separa a cabeça <code>1</code> e recorre no resto <code>[2, 3]</code>." },
            { call: "Reverse<[2, 3]>", expand: "[...Reverse<[3]>, 2]", phase: "down", depth: 1, note: "Cabeça <code>2</code>, recorre em <code>[3]</code>." },
            { call: "Reverse<[3]>", expand: "[...Reverse<[]>, 3]", phase: "down", depth: 2, note: "Cabeça <code>3</code>, recorre em <code>[]</code>." },
            { call: "Reverse<[]>", expand: "[]", phase: "base", depth: 3, note: "<strong>Caso base:</strong> a tupla vazia não casa o padrão <code>[infer H, ...]</code>, então devolve <code>[]</code>. A recursão para de descer." },
            { call: "↑ monta", expand: "[...[], 3] → [3]", phase: "up", depth: 2, note: "Agora sobe: <code>[...[], 3]</code> dá <code>[3]</code>." },
            { call: "↑ monta", expand: "[...[3], 2] → [3, 2]", phase: "up", depth: 1, note: "<code>[...[3], 2]</code> dá <code>[3, 2]</code>." },
            { call: "↑ monta", expand: "[...[3, 2], 1] → [3, 2, 1]", phase: "up", depth: 0, note: "<code>[...[3, 2], 1]</code> dá <code>[3, 2, 1]</code> — <strong>a tupla invertida!</strong>" }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "O padrão",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Caso base + caso recursivo",
          html: `
            <p>Toda recursão — em valores ou em tipos — tem duas partes: o <strong>caso base</strong>, que para a descida, e o <strong>caso recursivo</strong>, que se chama de novo num problema menor. Num conditional type, o <code>extends ? :</code> separa os dois. Sem um caso base alcançável, a recursão não termina:</p>`
        },
        {
          type: "code",
          file: "padrao.ts",
          code: [
            'type Length<T extends any[]> =',
            '  T extends [any, ...infer Resto]   // caso recursivo',
            '    ? AddOne<Length<Resto>>         //   conta 1 + resto',
            '    : 0                             // caso base: lista vazia',
            '',
            '// cada passada remove um elemento e soma 1,',
            '// até a tupla esvaziar e devolver 0.'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Acumuladores",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Carregando o resultado parcial",
          html: `
            <p>Um truque central do type-level: um parâmetro <strong>acumulador</strong> com valor padrão, que cresce a cada passo até a condição de parada. Aqui, <code>Acc</code> começa vazio e ganha um item por recursão, até seu <code>length</code> bater em <code>N</code>:</p>`
        },
        {
          type: "code",
          file: "acumulador.ts",
          code: [
            'type Repetir<T, N extends number, Acc extends T[] = []> =',
            '  Acc["length"] extends N',
            '    ? Acc                        // parou: Acc tem N itens',
            '    : Repetir<T, N, [...Acc, T]> // cresce o acumulador',
            '',
            'type Tres = Repetir<"x", 3>',
            '// ["x", "x", "x"]'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Os limites",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Onde o computador de tipos trava",
          html: `
            <p>O poder tem fronteiras — e é importante conhecê-las:</p>
            <ul>
              <li><strong>Profundidade:</strong> a recursão de tipos tem um limite (algumas dezenas de níveis por padrão). Passar disso dá o erro <em>"Type instantiation is excessively deep and possibly infinite"</em>.</li>
              <li><strong>Custo de compilação:</strong> tipos muito pesados deixam o editor e o build lentos. Não há custo em runtime, mas há no seu dia a dia.</li>
              <li><strong>Legibilidade:</strong> um tipo recursivo esperto pode ser ilegível para o próximo humano (às vezes, você mesmo em um mês).</li>
            </ul>`
        }
      ]
    },

    /* 6 */
    {
      label: "Quando usar",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Com parcimônia e propósito",
          html: `
            <p>Type-level programming é a ferramenta de quem escreve <strong>bibliotecas</strong>: tipar um ORM, um roteador, um validador de schema, para que o usuário final tenha autocomplete perfeito sem fazer nada. No código de produto do dia a dia, prefira o tipo <strong>mais simples que resolve</strong>. Saber que o poder existe vale mais do que usá-lo em todo lugar.</p>`
        },
        {
          type: "callout",
          variant: "warn",
          icon: "⚖️",
          title: "A régua",
          html: `
            <p>Se um tipo recursivo economiza manutenção para dezenas de usuários, vale. Se é só para evitar escrever uma união à mão uma vez, não vale. Complexidade de tipos é dívida como qualquer outra.</p>`
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
          heading: "Siga a recursão",
          code: 'type Length<T extends any[]> =\n  T extends [any, ...infer R] ? AddOne<Length<R>> : 0\n\ntype N = Length<[string, number]>',
          question: "Qual é o valor de N?",
          options: [
            { label: "2", correct: true },
            { label: "0" },
            { label: "[string, number]" }
          ],
          okText: "<b>Certo.</b> Cada passo remove um elemento e soma 1: <code>Length&lt;[string, number]&gt;</code> → 1 + <code>Length&lt;[number]&gt;</code> → 1 + 1 + <code>Length&lt;[]&gt;</code> → 1 + 1 + 0 = <strong>2</strong>.",
          noText: "<b>Desça e volte.</b> A tupla tem dois elementos; a recursão remove um por vez somando 1, até <code>[]</code> devolver 0. Dois elementos, dois incrementos: o resultado é <code>2</code>."
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
          heading: "Desafio: o caso base importa",
          html: `
            <p>Pense no tipo <code>Reverse</code> do laboratório. O que aconteceria se você <strong>esquecesse</strong> o caso base — isto é, se o <code>extends ? :</code> nunca devolvesse <code>[]</code> e sempre recorresse?</p>`
        },
        {
          type: "quiz",
          question: "Sem um caso base alcançável, o que o TypeScript faz?",
          options: [
            { label: 'Erro: "Type instantiation is excessively deep and possibly infinite"', correct: true },
            { label: "Calcula para sempre, travando o editor em silêncio" },
            { label: "Devolve any e segue em frente" }
          ],
          okText: "<b>Certo.</b> O TypeScript tem um limite de profundidade justamente para isso. Ao detectar recursão sem fim, ele para e emite o erro <em>\"excessively deep\"</em> — protegendo você de um compilador que nunca terminaria.",
          noText: "<b>Lembre do limite.</b> O compilador não roda para sempre: ao ultrapassar a profundidade máxima, ele aborta com o erro <em>\"Type instantiation is excessively deep and possibly infinite\"</em>. O caso base existe para a recursão terminar antes disso."
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
            "A recursão fecha a linguagem de tipos: um tipo que se refere a si mesmo em um problema menor.",
            "Toda recursão precisa de um caso base (que para) e um caso recursivo (que se chama de novo).",
            "Acumuladores — um parâmetro com valor padrão que cresce a cada passo — carregam o resultado parcial.",
            "Tudo roda na compilação; os tipos somem em runtime. É computação para garantir correção, não para processar dados.",
            "Há limites: profundidade de recursão, custo de compilação e legibilidade.",
            "Use com parcimônia: é a ferramenta de quem escreve bibliotecas; no dia a dia, prefira o tipo mais simples que resolve."
          ]
        }
      ]
    }
  ]
};
