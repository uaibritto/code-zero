/* ============================================================
   Léxico — Conteúdo do Módulo 34
   "Utility types"
   Estreia o bloco 'utilpick': catálogo interativo dos utility
   types prontos, com seleção de chaves para Pick/Omit.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["utility-types"] = {
  title: "Utility types",
  lead: "Nos módulos anteriores você aprendeu a construir transformadores de tipos do zero. A boa notícia: para os casos mais comuns, você não precisa. O TypeScript já traz uma caixa de ferramentas pronta — e agora você entende exatamente como cada peça funciona por dentro.",

  steps: [
    /* 1 */
    {
      label: "A caixa pronta",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Não reinvente a roda",
          html: `
            <p>Você viu mapped types reescreverem campos e conditional types com <code>infer</code> extraírem pedaços. A biblioteca padrão do TypeScript empacota os usos mais frequentes disso em <strong>utility types</strong>: tipos genéricos globais, prontos para usar, sem importar nada.</p>
            <p>Dominar esse catálogo é o que separa escrever tipos repetitivos de derivar tipos com elegância. E, graças aos módulos anteriores, nenhum deles é mágica para você.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧰",
          title: "Modelo mental: a caixa de ferramentas",
          html: `
            <p>Você sabe forjar uma chave de fenda (Módulos 31–33). Mas a caixa já vem com um jogo completo. Pegar a ferramenta certa é mais rápido e mais legível do que forjar a sua — e qualquer pessoa que leia o código reconhece <code>Partial</code> na hora.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O catálogo",
      kind: "interactive",
      blocks: [
        {
          type: "utilpick",
          heading: "Explore as ferramentas",
          intro: "À esquerda, o tipo de origem. Escolha um utilitário e veja o resultado à direita. Para <code>Pick</code> e <code>Omit</code>, clique nas chaves para montar o conjunto — e repare na chamada exata embaixo.",
          source: {
            name: "User",
            fields: [
              { k: "id", t: "number" },
              { k: "nome", t: "string" },
              { k: "email", t: "string" },
              { k: "ativo", t: "boolean" }
            ]
          },
          utils: [
            { id: "partial", label: "Partial<T>", mode: "all", line: "§K?: §T" },
            { id: "required", label: "Required<T>", mode: "all", line: "§K: §T" },
            { id: "readonly", label: "Readonly<T>", mode: "all", line: "readonly §K: §T" },
            { id: "pick", label: "Pick<T, K>", mode: "keep", line: "§K: §T" },
            { id: "omit", label: "Omit<T, K>", mode: "drop", line: "§K: §T" }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Transformar campos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Partial, Required, Readonly",
          html: `
            <p>Os três mexem nos <strong>modificadores</strong> de todos os campos de uma vez. <code>Partial</code> torna tudo opcional (ótimo para funções de atualização, que recebem só alguns campos). <code>Required</code> faz o oposto. <code>Readonly</code> congela:</p>`
        },
        {
          type: "code",
          file: "modificadores.ts",
          code: [
            'interface User { id: number; nome: string; email?: string }',
            '',
            'type Rascunho = Partial<User>   // tudo opcional',
            'type Completo = Required<User>  // tudo obrigatório',
            'type Imutavel = Readonly<User>  // tudo readonly',
            '',
            '// uso típico: atualizar só alguns campos',
            'function atualizar(id: number, dados: Partial<User>) { /* ... */ }',
            'atualizar(1, { nome: "Ana" })   // ok: só um campo'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Selecionar campos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Pick e Omit",
          html: `
            <p>Estes recortam um objeto. <code>Pick&lt;T, K&gt;</code> mantém <strong>só</strong> as chaves que você listar; <code>Omit&lt;T, K&gt;</code> mantém todas <strong>menos</strong> essas. São perfeitos para derivar "versões" de um tipo — um resumo, um formato público sem campos sensíveis:</p>`
        },
        {
          type: "code",
          file: "recorte.ts",
          code: [
            'interface User { id: number; nome: string; senha: string }',
            '',
            '// só o essencial para uma lista',
            'type Resumo = Pick<User, "id" | "nome">',
            '// { id: number; nome: string }',
            '',
            '// tudo, menos o que é sensível',
            'type Publico = Omit<User, "senha">',
            '// { id: number; nome: string }'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Construir e extrair",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Record, ReturnType, Parameters, Awaited",
          html: `
            <p>Além de transformar objetos existentes, alguns utilitários <strong>constroem</strong> ou <strong>extraem</strong> tipos. <code>Record&lt;K, V&gt;</code> monta um objeto de chaves <code>K</code> com valores <code>V</code>. Os outros usam <code>infer</code> (Módulo 39) por baixo para arrancar tipos de funções e promises:</p>`
        },
        {
          type: "code",
          file: "extrair.ts",
          code: [
            '// um dicionário tipado:',
            'type Estoque = Record<string, number>',
            'const e: Estoque = { cafe: 10, cha: 5 }',
            '',
            'function criar() { return { id: 1, nome: "Ana" } }',
            '',
            'type Retorno = ReturnType<typeof criar>  // { id: number; nome: string }',
            'type Args    = Parameters<typeof criar>  // []',
            'type Dado    = Awaited<Promise<string>>  // string'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Filtrar uniões",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Exclude, Extract, NonNullable",
          html: `
            <p>Um último trio, que opera sobre <strong>uniões</strong> em vez de objetos. <code>Exclude</code> remove membros; <code>Extract</code> mantém só os que casam; <code>NonNullable</code> tira <code>null</code> e <code>undefined</code> — exatamente o <code>SemNulo</code> que você viu nascer com <code>infer</code>:</p>`
        },
        {
          type: "code",
          file: "unioes.ts",
          code: [
            'type Status = "ativo" | "pausado" | "cancelado"',
            '',
            'type SemCancelado = Exclude<Status, "cancelado">',
            '// "ativo" | "pausado"',
            '',
            'type SoFinais = Extract<Status, "cancelado" | "pausado">',
            '// "pausado" | "cancelado"',
            '',
            'type Limpo = NonNullable<string | null | undefined>',
            '// string'
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
          heading: "O que Omit produz?",
          code: 'interface Produto {\n  id: number\n  nome: string\n  custo: number\n}\n\ntype Publico = Omit<Produto, "custo">',
          question: "Qual é o tipo Publico?",
          options: [
            { label: "{ id: number; nome: string }", correct: true },
            { label: "{ custo: number }" },
            { label: "{ id: number; nome: string; custo: number }" }
          ],
          okText: "<b>Certo.</b> <code>Omit&lt;T, K&gt;</code> mantém todas as chaves <strong>menos</strong> as listadas. Removendo <code>\"custo\"</code>, sobram <code>id</code> e <code>nome</code> com seus tipos originais.",
          noText: "<b>Omit remove.</b> Ele devolve o objeto <strong>sem</strong> as chaves listadas — o oposto de <code>Pick</code>. Tirando <code>\"custo\"</code>, o resultado é <code>{ id: number; nome: string }</code>."
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
          heading: "Desafio: o tipo público protege",
          html: `
            <p><code>Omit&lt;User, "senha"&gt;</code> cria um tipo sem o campo sensível. Antes de clicar, preveja qual atribuição o TypeScript recusa — e por quê.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'interface User { id: number; nome: string; senha: string }',
            'type Publico = Omit<User, "senha">',
            '',
            'const a: Publico = { id: 1, nome: "Ana" }',
            'const b: Publico = { id: 2, nome: "Rui", senha: "x" }'
          ],
          errors: {
            "4": "Object literal may only specify known properties, and 'senha' does not exist in type 'Publico'."
          },
          js: {
            logs: [],
            crash: "Em JavaScript ambos os objetos existem normalmente — nada impede vazar a senha no formato público."
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
            "Utility types são tipos genéricos globais prontos, embalando os padrões mais comuns de mapped e conditional types.",
            "Partial, Required e Readonly mexem nos modificadores de todos os campos de uma vez.",
            "Pick<T, K> mantém só as chaves listadas; Omit<T, K> mantém todas menos essas.",
            "Record<K, V> constrói um objeto; ReturnType, Parameters e Awaited extraem tipos de funções e promises.",
            "Exclude, Extract e NonNullable filtram membros de uniões.",
            "Pegar a ferramenta pronta é mais rápido e mais legível do que escrever o tipo à mão."
          ]
        }
      ]
    }
  ]
};
