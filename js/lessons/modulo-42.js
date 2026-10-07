/* ============================================================
   Léxico — Conteúdo do Módulo (slug: overloading-satisfies)
   "Overloading, predicados & satisfies" — exibido como nº 36.
   Estreia o bloco 'overloadpick': resolvedor de sobrecargas —
   escolha a chamada e veja qual assinatura casa e o retorno.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["overloading-satisfies"] = {
  title: "Overloading, predicados & satisfies",
  lead: "Depois de modelar tipos, chega a hora de escrevê-los com precisão cirúrgica. Sobrecargas descrevem funções que mudam de forma conforme o argumento; type predicates ensinam o verificador a estreitar sozinho; satisfies valida sem perder informação. São as ferramentas de quem escreve TypeScript de verdade.",

  steps: [
    /* 1 */
    {
      label: "Autoria precisa",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Cinco ferramentas de refino",
          html: `
            <p>Você já sabe modelar dados. Este módulo é sobre <strong>expressar intenções sutis</strong> ao verificador:</p>
            <ul>
              <li><strong>Overloading</strong> — uma função com várias assinaturas, conforme o argumento.</li>
              <li><strong>Type predicate</strong> (<code>x is T</code>) — uma função que ensina o TS a estreitar.</li>
              <li><strong>satisfies</strong> — validar contra um tipo sem alargar o valor.</li>
              <li><strong>as const</strong> — congelar um valor no seu tipo literal mais específico.</li>
              <li><strong>non-null <code>!</code></strong> — afirmar que algo não é nulo (com cautela).</li>
            </ul>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔧",
          title: "Modelo mental: o jogo de precisão",
          html: `
            <p>Se os módulos anteriores foram marcenaria grossa, estes são as lixas finas. Nenhum é essencial para começar — mas cada um remove um atrito específico, deixando o tipo contar exatamente a verdade que você conhece sobre o código.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "A sobrecarga",
      kind: "interactive",
      blocks: [
        {
          type: "overloadpick",
          heading: "Qual assinatura casa?",
          intro: "A função <code>buscar</code> tem duas assinaturas públicas. Escolha uma chamada e veja qual overload o TypeScript seleciona — e qual tipo de retorno resulta. Tente também um argumento que não casa com nenhuma.",
          signatures: [
            "function buscar(id: number): Usuario",
            "function buscar(nome: string): Usuario[]"
          ],
          cases: [
            { arg: "buscar(42)", match: 0, ret: "Usuario", note: "O argumento é <code>number</code> → casa a <strong>primeira</strong> assinatura → o retorno é um único <code>Usuario</code>." },
            { arg: 'buscar("ana")', match: 1, ret: "Usuario[]", note: "O argumento é <code>string</code> → casa a <strong>segunda</strong> assinatura → o retorno é <code>Usuario[]</code>." },
            { arg: "buscar(true)", match: -1, ret: "nenhuma casa", note: "<code>boolean</code> não corresponde a nenhuma sobrecarga → erro de compilação: <em>no overload matches this call</em>." }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Function overloading",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Várias assinaturas, uma implementação",
          html: `
            <p>Você declara as <strong>assinaturas públicas</strong> acima e uma única <strong>implementação</strong> abaixo, mais genérica. Quem chama só enxerga as assinaturas públicas — é assim que o retorno muda conforme o argumento, sem recorrer a um retorno vago como <code>Usuario | Usuario[]</code>:</p>`
        },
        {
          type: "code",
          file: "overload.ts",
          code: [
            '// assinaturas públicas:',
            'function buscar(id: number): Usuario',
            'function buscar(nome: string): Usuario[]',
            '',
            '// implementação (não visível para quem chama):',
            'function buscar(arg: number | string): Usuario | Usuario[] {',
            '  if (typeof arg === "number") return acharPorId(arg)',
            '  return acharPorNome(arg)',
            '}',
            '',
            'const u = buscar(1)       // Usuario',
            'const us = buscar("ana")  // Usuario[]'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Type predicates",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "x is T: ensinando o verificador",
          html: `
            <p>No Módulo 35 o narrowing funcionava com <code>typeof</code> e <code>in</code>. Mas e uma checagem <strong>sua</strong>, numa função separada? Por padrão o TS não sabe que ela estreita o tipo. Um <strong>type predicate</strong> — retorno <code>x is T</code> — ensina isso: quando a função devolve <code>true</code>, o TS passa a tratar o valor como <code>T</code>.</p>`
        },
        {
          type: "code",
          file: "predicate.ts",
          code: [
            'type Gato = { miar: () => void }',
            '',
            '// o retorno "animal is Gato" é a mágica:',
            'function ehGato(animal: unknown): animal is Gato {',
            '  return typeof animal === "object" && animal !== null && "miar" in animal',
            '}',
            '',
            'function cuidar(bicho: unknown) {',
            '  if (ehGato(bicho)) {',
            '    bicho.miar()   // ✓ aqui o TS já sabe: é Gato',
            '  }',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "satisfies",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Validar sem alargar",
          html: `
            <p>O dilema: anotar <code>const cfg: Config</code> valida o objeto, mas <strong>alarga</strong> o tipo — você perde os valores literais específicos. Não anotar preserva os literais, mas não valida. O <code>satisfies</code> resolve os dois: <strong>verifica</strong> que o valor cumpre o tipo <strong>sem</strong> trocar o tipo inferido por ele.</p>`
        },
        {
          type: "code",
          file: "satisfies.ts",
          code: [
            'type Config = Record<string, string | number>',
            '',
            'const cfg = {',
            '  host: "localhost",',
            '  porta: 8080',
            '} satisfies Config',
            '',
            '// validado como Config, MAS os tipos ficam específicos:',
            'cfg.host    // string (não string | number)',
            'cfg.porta   // number — literal preservado'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "as const e o !",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Congelar e afirmar",
          html: `
            <p>Dois ajustes finais:</p>
            <ul>
              <li><code>as const</code> congela um valor no seu tipo <strong>literal</strong> mais estreito e o torna <code>readonly</code>. <code>["a","b"] as const</code> vira a tupla <code>readonly ["a", "b"]</code>, não <code>string[]</code>.</li>
              <li>O <strong>non-null assertion</strong> <code>valor!</code> diz ao TS "confie, isto não é <code>null</code> nem <code>undefined</code>". É uma promessa sua — se mentir, o bug volta em runtime. Use com parcimônia; prefira narrowing.</li>
            </ul>`
        },
        {
          type: "code",
          file: "asconst.ts",
          code: [
            'const cores = ["vermelho", "verde"] as const',
            '// tipo: readonly ["vermelho", "verde"]  (não string[])',
            '',
            'const el = document.querySelector("#app")',
            '// el: Element | null',
            'el!.textContent = "oi"   // "!": juro que não é null (cuidado!)'
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
          heading: "Depois do predicate",
          code: 'function ehString(x: unknown): x is string {\n  return typeof x === "string"\n}\n\nfunction f(v: unknown) {\n  if (ehString(v)) {\n    // qual o tipo de v aqui?\n  }\n}',
          question: "Dentro do if, qual é o tipo de v?",
          options: [
            { label: "string", correct: true },
            { label: "unknown" },
            { label: "boolean" }
          ],
          okText: "<b>Certo.</b> O retorno <code>x is string</code> ensina o TypeScript: se <code>ehString(v)</code> deu <code>true</code>, então <code>v</code> é <code>string</code> dali para frente. É o narrowing turbinado por uma função sua.",
          noText: "<b>É o que o predicate faz.</b> O retorno <code>x is string</code> instrui o verificador a estreitar <code>v</code> para <code>string</code> dentro do <code>if</code> — sem ele, <code>v</code> continuaria <code>unknown</code>."
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
          heading: "Desafio: satisfies pega o deslize",
          html: `
            <p>O objeto de rotas deve ter valores do tipo <code>string</code>. Antes de clicar, descubra qual linha o <code>satisfies</code> faz o TypeScript recusar — algo que uma anotação comum também pegaria, mas aqui sem perder os tipos literais.</p>`
        },
        {
          type: "tscheck",
          file: "desafio.ts",
          code: [
            'type Rotas = Record<string, string>',
            '',
            'const rotas = {',
            '  home: "/",',
            '  perfil: "/perfil",',
            '  contador: 42',
            '} satisfies Rotas'
          ],
          errors: {
            "5": "Type 'number' is not assignable to type 'string'. (contador: 42 viola Rotas)"
          },
          js: {
            logs: [],
            crash: "Em runtime, rotas é só um objeto comum — nada impede o 42. O satisfies é quem barra o deslize na compilação, preservando os tipos literais dos demais campos."
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
            "Function overloading: assinaturas públicas distintas sobre uma única implementação, com retorno conforme o argumento.",
            "Type predicate (x is T): uma função que ensina o verificador a estreitar o tipo dentro de um if.",
            "satisfies valida um valor contra um tipo sem alargá-lo — você mantém os tipos literais inferidos.",
            "as const congela um valor nos tipos literais mais estreitos e o torna readonly.",
            "O non-null ! afirma que algo não é null/undefined; é uma promessa sua, use com parcimônia.",
            "São lixas finas: nenhuma é obrigatória, mas cada uma remove um atrito e deixa o tipo mais preciso."
          ]
        }
      ]
    }
  ]
};
