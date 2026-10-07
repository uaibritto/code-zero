/* ============================================================
   Léxico — Conteúdo do Módulo 16
   "Módulos (ESM / CommonJS)"
   Estreia o bloco 'modulemap': conexão export ↔ import.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["modulos"] = {
  title: "Módulos",
  lead: "Nenhum programa sério vive num arquivo só. Módulos permitem dividir o código em arquivos independentes, cada um escolhendo o que compartilhar e o que esconder. É o que torna projetos grandes gerenciáveis.",

  steps: [
    /* 1 */
    {
      label: "Por que módulos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Dividir para organizar",
          html: `
            <p>Até agora todo o código morava num arquivo só. Em projetos reais, isso vira um caos: milhares de linhas, nomes colidindo, impossível achar nada. A solução é dividir o código em <strong>módulos</strong> — arquivos independentes, cada um com seu próprio escopo.</p>
            <p>Cada módulo decide o que <strong>compartilhar</strong> com os outros (export) e o que manter <strong>privado</strong>. Assim você reutiliza código, evita conflitos de nomes e encontra as coisas com facilidade.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "📦",
          title: "Modelo mental: caixas rotuladas",
          html: `
            <p>Cada módulo é uma caixa fechada: por padrão, nada do que está dentro vaza para fora. Você cola uma <strong>etiqueta</strong> (<code>export</code>) nos itens que quer disponibilizar. Outros módulos então pegam só esses itens etiquetados (<code>import</code>). O resto fica protegido lá dentro.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "export / import",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A dupla export e import (ESM)",
          html: `
            <p>O formato moderno chama-se <strong>ESM</strong> (ECMAScript Modules). Num arquivo, <code>export</code> marca o que fica disponível; em outro, <code>import { }</code> traz esses itens pelo nome. Os nomes no <code>import</code> devem bater com os do <code>export</code>.</p>`
        },
        {
          type: "code",
          file: "math.js",
          caption: "O módulo que exporta:",
          code: [
            "export const PI = 3.14",
            "",
            "export function soma(a, b) {",
            "  return a + b",
            "}"
          ].join("\n")
        },
        {
          type: "code",
          file: "app.js",
          caption: "O módulo que importa e usa:",
          code: [
            'import { soma, PI } from "./math.js"',
            "",
            "console.log(soma(2, 3)) // 5",
            "console.log(PI)         // 3.14"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "ℹ️",
          title: "Por que não dá para rodar aqui",
          html: `
            <p>O playground executa <strong>um arquivo só</strong>. Módulos, por natureza, envolvem vários arquivos e precisam de um ambiente real: o navegador com <code>&lt;script type="module"&gt;</code>, o Node.js, ou um bundler. Por isso, neste módulo, vamos ler e visualizar o código em vez de executá-lo.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "Conexão entre módulos",
      kind: "interactive",
      blocks: [
        {
          type: "modulemap",
          heading: "A ponte entre arquivos",
          intro: "Clique em um nome exportado ou importado e veja a conexão acender nos dois arquivos. Repare que todo import precisa de um export correspondente do outro lado.",
          files: [
            {
              name: "math.js",
              lines: ["export const PI = 3.14", "export function soma(a, b) {", "  return a + b", "}"],
              exports: ["PI", "soma"]
            },
            {
              name: "app.js",
              lines: ['import { soma, PI } from "./math.js"', "", "console.log(soma(2, 3))", "console.log(PI)"],
              imports: ["soma", "PI"]
            }
          ],
          note: "Cada seta é uma dependência: <code>app.js</code> depende de <code>math.js</code>. Esse grafo de dependências entre módulos é o que um bundler (como Vite ou webpack) percorre para montar sua aplicação."
        }
      ]
    },

    /* 4 */
    {
      label: "default export",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O export principal",
          html: `
            <p>Além dos exports nomeados, um módulo pode ter <strong>um</strong> <code>export default</code> — o seu item "principal". Na importação, o default vem <strong>sem chaves</strong>, e você escolhe o nome livremente. Você pode ter vários exports nomeados, mas só um default por módulo.</p>`
        },
        {
          type: "code",
          file: "botao.js / app.js",
          code: [
            "// botao.js",
            "export default function Botao() {",
            '  return "um botão"',
            "}",
            "",
            "// app.js",
            'import Botao from "./botao.js" // sem chaves, nome livre'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "ESM vs CommonJS",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Dois dialetos de módulos",
          html: `
            <p>Você vai cruzar com dois sistemas. O <strong>ESM</strong> (<code>import</code>/<code>export</code>) é o padrão moderno, usado no navegador e em projetos atuais. O <strong>CommonJS</strong> (<code>require</code>/<code>module.exports</code>) é o formato clássico do Node.js, ainda muito presente. Compare:</p>`
        },
        {
          type: "codetabs",
          caption: "A mesma ideia, dois sistemas:",
          tabs: [
            {
              label: "ESM (moderno)",
              file: "esm.js",
              code: [
                "// exportar",
                "export function soma(a, b) { return a + b }",
                "",
                "// importar",
                'import { soma } from "./math.js"'
              ].join("\n"),
              note: "Padrão da linguagem, usado no navegador e em projetos modernos."
            },
            {
              label: "CommonJS (Node clássico)",
              file: "cjs.js",
              code: [
                "// exportar",
                "function soma(a, b) { return a + b }",
                "module.exports = { soma }",
                "",
                "// importar",
                'const { soma } = require("./math.js")'
              ].join("\n"),
              note: "Formato original do Node.js. Você ainda o encontra bastante; o Node moderno aceita os dois."
            }
          ]
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
          heading: "O import vai funcionar?",
          code: '// math.js\nexport function soma(a, b) { return a + b }\n\n// app.js\nimport { total } from "./math.js"',
          question: "math.js exporta soma, mas app.js tenta importar total. O que acontece?",
          options: [
            { label: "Erro: math.js não exporta nada chamado total.", correct: true },
            { label: "Funciona: total vira um apelido de soma." },
            { label: "Importa todas as funções de math.js automaticamente." }
          ],
          okText: "<b>Certo.</b> Imports nomeados precisam bater <strong>exatamente</strong> com os nomes exportados. Como <code>math.js</code> exporta <code>soma</code> (não <code>total</code>), o import falha. Para renomear na importação, use <code>import { soma as total }</code>.",
          noText: "<b>Os nomes precisam coincidir.</b> O que está entre chaves tem que existir como <code>export</code> no outro módulo. Só há <code>soma</code>, então importar <code>total</code> dá erro. (Para apelidar: <code>import { soma as total }</code>.)"
        }
      ]
    },

    /* 7 */
    {
      label: "import dinâmico",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Carregar sob demanda",
          html: `
            <p>O <code>import</code> normal fica no topo e carrega o módulo sempre. Já o <strong>import dinâmico</strong> — <code>import(...)</code> como função — carrega um módulo <strong>só quando preciso</strong>, devolvendo uma Promise. É ótimo para dividir o app e adiar o carregamento de partes pesadas.</p>`
        },
        {
          type: "code",
          file: "dinamico.js",
          code: [
            "// import normal: no topo, sempre carregado",
            'import { soma } from "./math.js"',
            "",
            "// import dinâmico: sob demanda, devolve uma Promise",
            'const modulo = await import("./math.js")',
            "modulo.soma(2, 3)"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "⏳",
          title: "Promise?",
          html: `
            <p>O import dinâmico devolve uma <strong>Promise</strong> — um valor que chega "no futuro". Esse é o próximo grande tema do curso: assincronicidade. Por ora, basta saber que <code>import()</code> é a forma preguiçosa de carregar módulos.</p>`
        }
      ]
    },

    /* 8 */
    {
      label: "Fixe o conceito",
      kind: "exercise",
      blocks: [
        {
          type: "classify",
          heading: "ESM ou CommonJS?",
          question: "Cada trecho pertence ao sistema moderno (ESM) ou ao clássico do Node (CommonJS)?",
          buckets: [
            { id: "esm", label: "ESM (import/export)", short: "ESM" },
            { id: "cjs", label: "CommonJS (require)", short: "CommonJS" }
          ],
          items: [
            { text: 'import { x } from "./a"', bucket: "esm" },
            { text: 'const x = require("./a")', bucket: "cjs" },
            { text: "export default App", bucket: "esm" },
            { text: "module.exports = App", bucket: "cjs" },
            { text: "export const y = 1", bucket: "esm" },
            { text: 'const { y } = require("./a")', bucket: "cjs" }
          ],
          okText: "A regra visual é simples: <code>import</code>/<code>export</code> = <strong>ESM</strong>; <code>require</code>/<code>module.exports</code> = <strong>CommonJS</strong>. Saber distinguir ajuda a ler qualquer base de código.",
          noText: "Dica rápida: viu <code>import</code> ou <code>export</code>? É ESM. Viu <code>require</code> ou <code>module.exports</code>? É CommonJS."
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
            "Módulos dividem o código em arquivos independentes, cada um com seu escopo.",
            "export compartilha itens; import os traz pelo nome (que deve coincidir).",
            "export default é o item principal: importado sem chaves e com nome livre.",
            "ESM (import/export) é o padrão moderno; CommonJS (require/module.exports) é o clássico do Node.",
            "import dinâmico (import()) carrega um módulo sob demanda e devolve uma Promise.",
            "O grafo de dependências entre módulos é o que os bundlers percorrem para montar o app."
          ]
        }
      ]
    }
  ]
};
