/* ============================================================
   Léxico — Conteúdo do Módulo 36
   "Projeto final" — o encerramento do curso.
   Estreia o bloco 'buildproject': construção guiada de um app
   tipado, com cada etapa marcando os módulos que ela usa.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["projeto-final"] = {
  title: "Projeto final",
  lead: "Trinta e cinco módulos atrás, você começou perguntando o que é uma variável. Agora você vai montar um aplicativo real, tipado de ponta a ponta — e cada peça dele vai acionar algo que você aprendeu pelo caminho.",

  steps: [
    /* 1 */
    {
      label: "A jornada",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Olhe de onde você veio",
          html: `
            <p>Você percorreu duas trilhas inteiras. Em JavaScript, saiu dos valores e tipos até o event loop, closures, protótipos, promises e o DOM — entendendo não só <em>como</em> escrever, mas <em>por que</em> a linguagem se comporta como se comporta. Em TypeScript, foi do primeiro <code>: string</code> até recursão no nível dos tipos.</p>
            <p>O objetivo nunca foi decorar sintaxe. Foi construir <strong>modelos mentais</strong>: a pilha e o heap, o funil do narrowing, a fábrica de tipos. Com eles, qualquer código novo passa a ser legível — você sabe o que está acontecendo por baixo.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🏔️",
          title: "O que muda a partir daqui",
          html: `
            <p>Você não precisa mais de um módulo para cada conceito. A partir de agora, o aprendizado vira o próprio ato de construir: você bate numa dúvida, investiga, resolve, e segue. É assim que desenvolvedores crescem — e você já tem a base para isso.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O projeto",
      kind: "interactive",
      blocks: [
        {
          type: "buildproject",
          heading: "Monte um gerenciador de tarefas tipado",
          intro: "Avance etapa por etapa e construa um app completo. Em cada passo, repare nas etiquetas: elas mostram exatamente quais módulos daquela jornada você está colocando em prática agora.",
          steps: [
            {
              title: "1. Modelar os dados",
              code: [
                '// o status é uma união de opções fechadas',
                'type Status = "pendente" | "fazendo" | "concluida"',
                '',
                'interface Tarefa {',
                '  id: number',
                '  titulo: string',
                '  status: Status',
                '}'
              ],
              uses: ["Tipos literais · M30", "Interfaces · M33", "Uniões · M33"],
              note: "Tudo começa pela forma dos dados. Com o tipo bem definido, o resto do app ganha autocomplete e proteção de graça."
            },
            {
              title: "2. Criar com segurança",
              code: [
                'let proximoId = 1',
                '',
                'function criar(titulo: string): Tarefa {',
                '  return { id: proximoId++, titulo, status: "pendente" }',
                '}'
              ],
              uses: ["Funções · M10", "Inferência · M36"],
              note: "O retorno é tipado como <code>Tarefa</code>: se você esquecer um campo ou errar o status, o verificador avisa na hora."
            },
            {
              title: "3. Atualizar com Partial",
              code: [
                '// aceita apenas os campos que mudaram',
                'function atualizar(t: Tarefa, dados: Partial<Tarefa>): Tarefa {',
                '  return { ...t, ...dados }',
                '}',
                '',
                'atualizar(tarefa, { status: "concluida" })'
              ],
              uses: ["Utility types · M41", "Objetos · M12"],
              note: "<code>Partial&lt;Tarefa&gt;</code> deixa todos os campos opcionais — perfeito para uma atualização parcial, sem abrir mão da checagem."
            },
            {
              title: "4. Carregar dados (async)",
              code: [
                'async function carregar(): Promise<Tarefa[]> {',
                '  const res = await fetch("/api/tarefas")',
                '  const dados: unknown = await res.json()',
                '  // valide dados antes de confiar (narrowing)',
                '  return dados as Tarefa[]',
                '}'
              ],
              uses: ["Promises · M22", "Web APIs · M27", "unknown · M32"],
              note: "O que vem da rede entra como <code>unknown</code>: o TypeScript te lembra de validar antes de tratar como <code>Tarefa[]</code>."
            },
            {
              title: "5. Processar genericamente",
              code: [
                '// genérica: filtra qualquer lista por uma condição',
                'function filtrar<T>(lista: T[], ok: (x: T) => boolean): T[] {',
                '  return lista.filter(ok)',
                '}',
                '',
                'const pendentes = filtrar(tarefas, t => t.status === "pendente")'
              ],
              uses: ["Generics · M36", "Arrays · M11", "Funções · M10"],
              note: "Um <code>&lt;T&gt;</code> torna a função reutilizável para qualquer lista, sem perder o tipo dos itens dentro do callback."
            },
            {
              title: "6. Renderizar no DOM",
              code: [
                'function render(tarefa: Tarefa): HTMLElement {',
                '  const li = document.createElement("li")',
                '  li.textContent = tarefa.titulo',
                '  li.dataset.id = String(tarefa.id)',
                '  return li',
                '}',
                '',
                '// um listener no pai cuida de todos os itens',
                'lista.addEventListener("click", (e) => {',
                '  const alvo = e.target as HTMLElement',
                '  if (alvo.dataset.id) concluir(Number(alvo.dataset.id))',
                '})'
              ],
              uses: ["DOM e eventos · M26", "Narrowing · M35"],
              note: "Event delegation (um listener no pai) + <code>dataset</code> para saber qual tarefa foi clicada. O DOM, agora com tipos."
            },
            {
              title: "7. Juntar tudo",
              code: [
                'async function main() {',
                '  const tarefas = await carregar()',
                '  const pendentes = filtrar(tarefas, t => t.status === "pendente")',
                '  pendentes.map(render).forEach(el => lista.appendChild(el))',
                '}',
                '',
                'main()'
              ],
              uses: ["async/await · M22", "Tudo junto"],
              note: "Carregar, filtrar, renderizar. Sete etapas, uma dezena de módulos — e um app que o verificador garante que encaixa."
            }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Rodando de verdade",
      kind: "interactive",
      blocks: [
        {
          type: "prose",
          heading: "A lógica, executando",
          html: `
            <p>Tire os tipos e sobra o JavaScript que você domina. Aqui está o núcleo do gerenciador rodando ao vivo — o mesmo que, com as anotações do passo anterior, o TypeScript protegeria do começo ao fim:</p>`
        },
        {
          type: "runnable",
          file: "tarefas.js",
          autorun: true,
          code: [
            'const tarefas = []',
            'let proximoId = 1',
            '',
            'function criar(titulo) {',
            '  const t = { id: proximoId++, titulo, status: "pendente" }',
            '  tarefas.push(t)',
            '  return t',
            '}',
            'function concluir(id) {',
            '  const t = tarefas.find(x => x.id === id)',
            '  if (t) t.status = "concluida"',
            '}',
            'function pendentes() {',
            '  return tarefas.filter(t => t.status === "pendente")',
            '}',
            '',
            'criar("Estudar closures")',
            'criar("Entender generics")',
            'concluir(1)',
            '',
            'console.log("pendentes:", pendentes().map(t => t.titulo))',
            'console.log("total:", tarefas.length)'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Sua vez",
      kind: "challenge",
      blocks: [
        {
          type: "prose",
          heading: "Desafio final",
          html: `
            <p>Feche o curso com código seu. Adicione uma função <code>porStatus(status)</code> que devolve as tarefas com aquele status, e use-a. (A estrutura inicial já está pronta abaixo.)</p>`
        },
        {
          type: "runnable",
          file: "desafio.js",
          code: [
            'const tarefas = [',
            '  { id: 1, titulo: "A", status: "pendente" },',
            '  { id: 2, titulo: "B", status: "concluida" },',
            '  { id: 3, titulo: "C", status: "pendente" }',
            ']',
            '',
            '// escreva porStatus(status) e chame com "pendente"',
            ''
          ].join("\n"),
          solution: [
            'const tarefas = [',
            '  { id: 1, titulo: "A", status: "pendente" },',
            '  { id: 2, titulo: "B", status: "concluida" },',
            '  { id: 3, titulo: "C", status: "pendente" }',
            ']',
            '',
            'function porStatus(status) {',
            '  return tarefas.filter(t => t.status === status)',
            '}',
            '',
            'console.log(porStatus("pendente").map(t => t.titulo))'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "O que vem depois",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Continue construindo",
          html: `
            <p>A base está firme. Alguns caminhos naturais daqui:</p>
            <ul>
              <li><strong>Um framework.</strong> React, Vue ou Svelte — todos abraçam o TypeScript. Agora você entende os tipos que eles pedem.</li>
              <li><strong>O lado do servidor.</strong> Node com TypeScript, APIs, bancos de dados. O mesmo idioma, outro ambiente (lembra do Módulo 27?).</li>
              <li><strong>Projetos próprios.</strong> O jeito mais rápido de consolidar: escolha algo que você quer que exista e construa. Vai bater em dúvidas — e resolvê-las é o aprendizado real.</li>
            </ul>
            <p>Guarde o hábito que este curso tentou plantar: antes de decorar a solução, entenda o modelo mental. É isso que faz um bom desenvolvedor, em qualquer linguagem.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🎓",
          title: "Parabéns",
          html: `
            <p>Você foi do primeiro <code>console.log</code> ao type-level programming. Isso não é pouca coisa. O que você construiu aqui não foram 36 lições soltas — foi uma forma de pensar sobre código. Leve-a adiante.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Fim",
      kind: "summary",
      blocks: [
        {
          type: "summary",
          heading: "A jornada inteira, em seis linhas",
          items: [
            "JavaScript: valores, escopo, closures, protótipos, o event loop, promises, o DOM — o como e o porquê.",
            "TypeScript: dos tipos fundamentais ao narrowing, generics, conditional/mapped types e recursão de tipos.",
            "O fio condutor foi sempre o modelo mental antes da sintaxe — a pilha, o funil, a fábrica de tipos.",
            "Um app real combina dezenas desses conceitos; você acabou de montar um, tipado de ponta a ponta.",
            "O próximo passo é construir o seu projeto: a dúvida que aparecer é o próximo módulo que você se dá.",
            "Você aprendeu a pensar como desenvolvedor. O resto é prática — e ela começa agora."
          ]
        }
      ]
    }
  ]
};
