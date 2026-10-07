/* ============================================================
   Léxico — Conteúdo do Módulo 22
   "Memória & garbage collection"
   Estreia o bloco 'gcviz': alcançabilidade e coleta de lixo.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["memoria-gc"] = {
  title: "Memória & garbage collection",
  lead: "Você nunca precisou liberar memória manualmente em JavaScript — algo faz isso por você. Entender como esse mecanismo decide o que manter e o que descartar explica vazamentos, performance e fecha a trilha do runtime.",

  steps: [
    /* 1 */
    {
      label: "Onde os valores vivem",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Stack e heap",
          html: `
            <p>Os valores vivem em dois lugares. A <strong>stack</strong> guarda coisas pequenas e de tamanho fixo: primitivos e as <strong>referências</strong>. O <strong>heap</strong> é uma área grande e flexível onde moram os objetos, arrays e funções.</p>
            <p>A variável fica na stack e guarda apenas um <strong>endereço</strong> que aponta para o objeto lá no heap — exatamente o "controle remoto apontando para a TV" que você viu em objetos.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🗄️",
          title: "Modelo mental: a mesa e o depósito",
          html: `
            <p>A <strong>stack</strong> é a sua mesa de trabalho: coisas pequenas, à mão, empilhadas e desempilhadas rápido. O <strong>heap</strong> é o depósito: itens grandes, guardados em prateleiras, acessados por um endereço. A mesa aponta para as prateleiras.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Referências mantêm vivo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A regra da alcançabilidade",
          html: `
            <p>A memória do heap não é infinita, então o JavaScript precisa saber quando um objeto não é mais necessário. A regra é a <strong>alcançabilidade</strong>: um objeto permanece vivo <strong>enquanto for possível chegar até ele</strong> a partir de uma "raiz" — tipicamente, uma variável ativa.</p>
            <p>Se nada mais aponta para um objeto, nem direta nem indiretamente, ele se torna <strong>inalcançável</strong> — vira lixo, e pode ser recolhido.</p>`
        }
      ]
    },

    /* 3 */
    {
      label: "O coletor de lixo",
      kind: "interactive",
      blocks: [
        {
          type: "gcviz",
          heading: "Veja o que é recolhido e por quê",
          intro: "Avance passo a passo. Objetos alcançáveis a partir das raízes ficam verdes; os que ninguém alcança viram lixo (vermelho) e são recolhidos. Observe o que acontece quando uma referência é cortada.",
          steps: [
            {
              roots: ["usuario"],
              objs: [
                { id: "usuario", label: "usuario", refs: ["perfil"] },
                { id: "perfil", label: "perfil", refs: [] },
                { id: "temp", label: "temp", refs: [] }
              ],
              collectedIds: [],
              note: "<code>usuario</code> é alcançável direto pela variável (uma raiz). <code>perfil</code> é alcançável <strong>através</strong> de <code>usuario</code>. Já <code>temp</code> não tem ninguém apontando para ele — é lixo."
            },
            {
              roots: ["usuario"],
              objs: [
                { id: "usuario", label: "usuario", refs: ["perfil"] },
                { id: "perfil", label: "perfil", refs: [] },
                { id: "temp", label: "temp", refs: [] }
              ],
              collectedIds: ["temp"],
              note: "O garbage collector roda e recolhe <code>temp</code>: ninguém o alcançava. A memória dele é liberada."
            },
            {
              roots: ["usuario"],
              objs: [
                { id: "usuario", label: "usuario", refs: [] },
                { id: "perfil", label: "perfil", refs: [] }
              ],
              collectedIds: [],
              note: "Cortamos a referência: <code>usuario.perfil = null</code>. Agora <code>usuario</code> não aponta mais para <code>perfil</code>, e nenhuma outra raiz o alcança — <code>perfil</code> virou lixo."
            },
            {
              roots: ["usuario"],
              objs: [
                { id: "usuario", label: "usuario", refs: [] },
                { id: "perfil", label: "perfil", refs: [] }
              ],
              collectedIds: ["perfil"],
              note: "Nova coleta: <code>perfil</code> também é liberado. Sobra apenas <code>usuario</code>, que ainda tem a variável apontando para ele."
            }
          ]
        }
      ]
    },

    /* 4 */
    {
      label: "Como o GC decide",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Automático, por marcação",
          html: `
            <p>O <strong>garbage collector</strong> roda automaticamente, de tempos em tempos. Ele parte das raízes, <strong>marca</strong> tudo que consegue alcançar, e recolhe o resto — liberando a memória dos inalcançáveis.</p>
            <p>Em JavaScript você <strong>não</strong> libera memória na mão (diferente de linguagens como C). Isso é uma comodidade enorme, mas não é mágica: se você mantém referências sem perceber, o GC não pode recolher — e aí nascem os vazamentos.</p>`
        }
      ]
    },

    /* 5 */
    {
      label: "Vazamentos de memória",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Quando a memória cresce sem parar",
          html: `
            <p>Um <strong>vazamento</strong> acontece quando você mantém, sem querer, uma referência a algo que não usa mais — impedindo o GC de recolhê-lo. A memória cresce silenciosamente até degradar a aplicação. Veja um clássico:</p>`
        },
        {
          type: "code",
          file: "vazamento.js",
          code: [
            "// Vazamento clássico: um cache que nunca é limpo",
            "const cache = {}",
            "",
            "function guardar(id, dados) {",
            "  cache[id] = dados // nunca removido → cresce para sempre",
            "}",
            "",
            "// Outros culpados comuns:",
            "// - listeners de evento não removidos",
            "// - setInterval que segue rodando",
            "// - variáveis globais acidentais"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "info",
          icon: "🪢",
          title: "WeakMap ao resgate",
          html: `
            <p>Lembra do <code>WeakMap</code>/<code>WeakSet</code> do módulo anterior? Como usam referências <strong>fracas</strong>, eles não impedem a coleta — são ideais para caches associados a objetos, que somem junto com eles.</p>`
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
          heading: "O que acontece com o objeto?",
          code: 'let a = { nome: "obj1" }\nlet b = { nome: "obj2" }\na = null',
          question: "Depois de a = null, o que acontece com o objeto { nome: \"obj1\" }?",
          options: [
            { label: "Fica inalcançável e pode ser coletado pelo GC.", correct: true },
            { label: "É apagado da memória imediatamente, na linha a = null." },
            { label: "Continua vivo, porque b ainda existe." }
          ],
          okText: "<b>Certo.</b> <code>a</code> era a única referência ao <code>obj1</code>. Com <code>a = null</code>, ninguém mais o alcança — ele vira lixo e <strong>pode</strong> ser coletado (quando o GC rodar, não necessariamente na hora). <code>b</code> aponta para outro objeto, intacto.",
          noText: "<b>Pense na alcançabilidade.</b> <code>a</code> era o único caminho até o <code>obj1</code>; <code>a = null</code> o torna inalcançável. A coleta não é imediata (o GC decide quando rodar), e <code>b</code> aponta para o <code>obj2</code>, não o obj1."
        }
      ]
    },

    /* 7 */
    {
      label: "Resumo",
      kind: "summary",
      blocks: [
        {
          type: "summary",
          heading: "O que você aprendeu",
          items: [
            "Primitivos e referências vivem na stack; objetos, arrays e funções vivem no heap.",
            "Um objeto permanece vivo enquanto for alcançável a partir de uma raiz.",
            "Se nada mais aponta para um objeto, ele vira lixo e pode ser coletado.",
            "O garbage collector roda automaticamente — você não libera memória na mão.",
            "Referências esquecidas (caches, listeners, timers, globais) causam vazamentos de memória.",
            "WeakMap/WeakSet não impedem a coleta — úteis para evitar esses vazamentos."
          ]
        }
      ]
    }
  ]
};
