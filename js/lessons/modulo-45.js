/* ============================================================
   Léxico — Conteúdo do Módulo (slug: declaracoes-namespaces)
   "Namespaces & arquivos de declaração" — exibido como nº 43.
   Estreia o bloco 'mergelab': um laboratório de declaration
   merging — declarações de mesmo nome se fundindo numa só.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["declaracoes-namespaces"] = {
  title: "Namespaces & arquivos de declaração",
  lead: "O TypeScript precisa saber o formato de código que ele não compila: bibliotecas em JavaScript puro, APIs do navegador, variáveis globais. Os arquivos de declaração resolvem isso — descrevem tipos sem gerar código. E uma regra peculiar os torna poderosos: declarações de mesmo nome se fundem em vez de brigar.",

  steps: [
    /* 1 */
    {
      label: "Por que isso existe",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Tipos para código que você não escreveu",
          html: `
            <p>Você vai usar bibliotecas feitas em JavaScript puro, sem um tipo sequer. Vai tocar em <code>window</code>, <code>document</code> e dezenas de APIs do navegador. Nada disso passou pelo compilador do TypeScript — então como ele sabe o formato de tudo?</p>
            <p>A resposta são os <strong>arquivos de declaração</strong> (<code>.d.ts</code>): arquivos que <em>só descrevem tipos</em>, sem gerar nenhum código. E, antes dos módulos ESM existirem, os <strong>namespaces</strong> eram a forma de agrupar código e evitar colisões de nome. Hoje eles têm um papel menor, mas ainda aparecem — e entender os dois fecha o ciclo do sistema de tipos.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🗺️",
          title: "Modelo mental: a legenda do mapa",
          html: `
            <p>O código compilado é o território. Um <code>.d.ts</code> é a <strong>legenda</strong>: não é o terreno em si, mas diz o que cada coisa é. O compilador lê a legenda para te guiar, e no final ela some — não vira JavaScript nenhum.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Três formas de organizar",
      kind: "interactive",
      blocks: [
        {
          type: "prose",
          heading: "O mesmo contrato, três embalagens",
          html: `
            <p>Imagine um utilitário <code>formatar</code> dentro de um grupo <code>Moeda</code>. Compare como ele é organizado e exposto em cada abordagem — e repare que o <strong>formato</strong> é sempre o mesmo; muda só a embalagem.</p>`
        },
        {
          type: "codetabs",
          tabs: [
            {
              label: "Módulo ESM",
              file: "moeda.ts",
              note: "O padrão hoje. Cada arquivo é um módulo; você importa só o que precisa. É o que você usa em aplicações.",
              code: [
                "// moeda.ts — um arquivo, um módulo",
                "export function formatar(v: number): string {",
                '  return v.toLocaleString("pt-BR", {',
                '    style: "currency", currency: "BRL",',
                "  })",
                "}",
                "",
                "// uso em outro arquivo:",
                '// import { formatar } from "./moeda"'
              ].join("\n")
            },
            {
              label: "Namespace",
              file: "moeda.ts",
              note: "Agrupa nomes sob um rótulo sem usar módulos. Útil quando NÃO há sistema de módulos — hoje, sobretudo dentro de arquivos .d.ts.",
              code: [
                "namespace Moeda {",
                "  export function formatar(v: number): string {",
                '    return v.toLocaleString("pt-BR", {',
                '      style: "currency", currency: "BRL",',
                "    })",
                "  }",
                "}",
                "",
                "// uso: acessa pelo rótulo, sem import",
                "// Moeda.formatar(1990)"
              ].join("\n")
            },
            {
              label: ".d.ts ambient",
              file: "moeda.d.ts",
              note: "Só o contrato, sem corpo. Descreve algo que já existe em JavaScript em outro lugar — o compilador confia na legenda.",
              code: [
                "// moeda.d.ts — apenas tipos, zero implementação",
                "declare namespace Moeda {",
                "  function formatar(v: number): string",
                "}",
                "",
                "// 'declare' = 'confie em mim, isto existe em runtime'",
                "// nenhum JavaScript é gerado a partir daqui"
              ].join("\n")
            }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Arquivos .d.ts",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A palavra declare",
          html: `
            <p>Dentro de um <code>.d.ts</code> (ou atrás de <code>declare</code>), você afirma que algo <strong>existe em runtime</strong> sem fornecer o corpo. É uma promessa ao compilador: "pode confiar, essa variável/função vai estar lá".</p>`
        },
        {
          type: "code",
          file: "ambient.d.ts",
          code: [
            "// uma variável global injetada por um <script> externo",
            "declare const ANALYTICS_ID: string",
            "",
            "// uma função global que uma lib define",
            "declare function gtag(cmd: string, ...args: unknown[]): void",
            "",
            "// o formato de um módulo JS sem tipos próprios",
            'declare module "lib-antiga" {',
            "  export function soma(a: number, b: number): number",
            "}"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "📦",
          title: "@types e o DefinitelyTyped",
          html: `
            <p>Para milhares de bibliotecas JavaScript, a comunidade já escreveu os <code>.d.ts</code>: é só instalar <code>@types/nome-da-lib</code>. Pacotes modernos já vêm com tipos embutidos. Você raramente escreve declarações do zero — mas precisa saber lê-las e, às vezes, ajustá-las.</p>`
        }
      ]
    },

    /* 4 */
    {
      label: "Declaration merging",
      kind: "interactive",
      blocks: [
        {
          type: "prose",
          heading: "A regra peculiar: nomes iguais se somam",
          html: `
            <p>Aqui está o que diferencia uma <code>interface</code> de um <code>type</code>: se você declarar a <strong>mesma interface duas vezes</strong>, o TypeScript não reclama — ele <strong>funde</strong> as duas numa só, somando os membros. Veja a fusão acontecer passo a passo.</p>`
        },
        {
          type: "mergelab",
          heading: "Mescle as declarações",
          intro: "Três arquivos declaram uma interface <code>Janela</code>. Clique em <strong>Mesclar</strong> e observe o lado direito: o compilador trata todas como uma única definição.",
          symbol: "Janela",
          keyword: "interface",
          sources: [
            { label: "app.ts", members: [{ name: "titulo", type: "string" }] },
            { label: "tema-plugin.ts", members: [{ name: "tema", type: '"claro" | "escuro"' }] },
            { label: "layout.d.ts", members: [{ name: "largura", type: "number" }, { name: "altura", type: "number" }] }
          ]
        },
        {
          type: "callout",
          variant: "warn",
          icon: "⚠️",
          title: "type NÃO faz isso",
          html: `
            <p>Declarar o mesmo <code>type X = ...</code> duas vezes é <strong>erro</strong> ("Duplicate identifier"). Só <code>interface</code> (e <code>namespace</code>) se fundem. É justamente por isso que bibliotecas expõem interfaces: elas permitem que você <em>estenda</em> os tipos delas — o tema do próximo passo.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "Augmentation",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Estender o que já existe",
          html: `
            <p>O merging vira superpoder quando você aplica a código de <em>outras pessoas</em>. Isso tem dois sabores:</p>
            <ul>
              <li><strong>Module augmentation</strong> — abrir um <code>declare module "lib"</code> e adicionar membros aos tipos daquela biblioteca (ex.: um campo novo numa interface de config).</li>
              <li><strong>Global augmentation</strong> — abrir <code>declare global</code> para somar propriedades a tipos globais, como a <code>Window</code> do navegador.</li>
            </ul>`
        },
        {
          type: "code",
          file: "augment.ts",
          code: [
            "// adicionar uma propriedade global a Window, com segurança de tipos",
            "declare global {",
            "  interface Window {",
            "    minhaApp: { versao: string }",
            "  }",
            "}",
            "",
            "// agora o compilador conhece isto — sem 'any', sem gambiarra:",
            'window.minhaApp = { versao: "1.0" }',
            "",
            "export {} // torna o arquivo um módulo (necessário p/ declare global)"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🧩",
          title: "Por que o export {} no fim?",
          html: `
            <p>Um arquivo sem <code>import</code>/<code>export</code> é tratado como <em>script global</em>, e aí <code>declare global</code> não faz sentido. O <code>export {}</code> vazio transforma o arquivo num módulo — é um truque idiomático que você vai reencontrar.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Namespaces hoje",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Por que os módulos venceram",
          html: `
            <p>Namespaces nasceram antes do ESM, para evitar que tudo colidisse no escopo global. Os <strong>módulos resolveram o mesmo problema melhor</strong>: cada arquivo tem seu próprio escopo, as dependências ficam explícitas nos <code>import</code>, e os bundlers conseguem remover o que você não usa (tree-shaking).</p>
            <p>Então, para código de aplicação, a regra é simples: <strong>use módulos ESM</strong> (Módulo 19), não namespaces. Namespaces ainda têm lugar legítimo em um caso: organizar grandes <strong>arquivos de declaração ambient</strong>, onde não há módulos para agrupar os tipos.</p>`
        },
        {
          type: "codetabs",
          tabs: [
            {
              label: "✓ Faça (ESM)",
              file: "app.ts",
              note: "Escopo por arquivo, dependências explícitas, tree-shaking. O padrão para qualquer aplicação.",
              code: [
                'import { formatar } from "./moeda"',
                'import { validar } from "./validacao"',
                "",
                "export function checkout(v: number) {",
                "  if (!validar(v)) return",
                "  return formatar(v)",
                "}"
              ].join("\n")
            },
            {
              label: "✗ Evite (namespace)",
              file: "app.ts",
              note: "Namespaces aninhados em código de app recriam o problema que os módulos já resolvem. Deixe-os para os .d.ts ambient.",
              code: [
                "namespace App {",
                "  export namespace Checkout {",
                "    export function processar(v: number) {",
                "      // dependências implícitas, difícil de refatorar",
                "      return Moeda.formatar(v)",
                "    }",
                "  }",
                "}"
              ].join("\n")
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
          heading: "Funde ou dá erro?",
          code: "interface Carrinho { itens: number }\ninterface Carrinho { total: number }\n\ntype Pedido = { id: string }\ntype Pedido = { pago: boolean }",
          question: "Compilando este trecho, o que acontece?",
          options: [
            { label: "interface Carrinho funde; type Pedido dá erro de duplicata", correct: true },
            { label: "Tudo funde: Carrinho e Pedido ganham os dois campos" },
            { label: "Tudo dá erro: nomes repetidos nunca são permitidos" },
            { label: "Nada funde, mas também não há erro" }
          ],
          okText: "<b>Exato.</b> <code>interface</code> faz declaration merging — <code>Carrinho</code> passa a exigir <code>itens</code> <em>e</em> <code>total</code>. Já <code>type</code> não funde: a segunda <code>Pedido</code> é um erro de identificador duplicado. É a distinção prática mais importante entre os dois.",
          noText: "<b>Separe os dois.</b> Só <code>interface</code> (e <code>namespace</code>) se fundem — <code>Carrinho</code> vira <code>{ itens; total }</code>. <code>type</code> não funde: declarar <code>Pedido</code> duas vezes é erro de duplicata."
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
          heading: "Desafio: escolha a ferramenta certa",
          html: `
            <p>Você usa uma biblioteca de rotas cujo objeto de contexto é tipado por <code>interface Contexto</code>, exportada pelo módulo <code>"roteador"</code>. Seu middleware precisa anexar <code>usuario</code> a esse contexto, e você quer que todo o app enxergue esse campo com tipo seguro — sem editar a biblioteca.</p>`
        },
        {
          type: "quiz",
          question: "Qual abordagem resolve isso corretamente?",
          options: [
            { label: 'declare module "roteador" reabrindo a interface Contexto com o campo usuario', correct: true },
            { label: "type Contexto = { usuario: User } num arquivo seu" },
            { label: 'namespace Roteador { interface Contexto { usuario: User } }' },
            { label: "Fazer um cast com as any toda vez que acessar ctx.usuario" }
          ],
          okText: "<b>Isso.</b> Module augmentation: você reabre o módulo da lib com <code>declare module \"roteador\" { interface Contexto { usuario: User } }</code>. Como <code>Contexto</code> é uma interface, sua declaração <em>funde</em> com a original — o campo <code>usuario</code> passa a existir em todo o app, com tipo real e sem tocar na biblioteca.",
          noText: "<b>Pense em merging + módulo.</b> Um <code>type</code> novo cria outro tipo, não estende o da lib. Um <code>namespace</code> não casa com o módulo. <code>as any</code> joga fora a segurança. O certo é <code>declare module \"roteador\"</code> reabrindo a <code>interface Contexto</code> — ela se funde com a original."
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
            "Arquivos .d.ts só descrevem tipos — não geram JavaScript; são a 'legenda' do código que o compilador não vê.",
            "declare afirma que algo existe em runtime (variáveis, funções, módulos) sem fornecer corpo.",
            "@types / DefinitelyTyped já traz declarações prontas para milhares de libs JavaScript.",
            "Declaration merging: interfaces (e namespaces) de mesmo nome se fundem somando membros; type duplicado é erro.",
            "Module augmentation (declare module) e global augmentation (declare global) estendem tipos de terceiros com segurança.",
            "Para código de aplicação use módulos ESM; reserve namespaces para organizar .d.ts ambient."
          ]
        }
      ]
    }
  ]
};
