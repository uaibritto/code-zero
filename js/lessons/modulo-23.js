/* ============================================================
   Léxico — Conteúdo do Módulo 23
   "DOM e eventos"
   Estreia o bloco 'eventflow': propagação de eventos.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["dom-e-eventos"] = {
  title: "DOM e eventos",
  lead: "Até aqui, o JavaScript rodava isolado. Agora ele encontra a página. O DOM é a ponte entre seu código e o que o usuário vê — e os eventos são como a página conversa de volta com você.",

  steps: [
    /* 1 */
    {
      label: "O DOM",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A página como uma árvore",
          html: `
            <p>Quando o navegador carrega um HTML, ele constrói o <strong>DOM</strong> (Document Object Model): uma representação do documento como uma <strong>árvore de nós</strong> (elementos). O JavaScript pode ler e modificar essa árvore ao vivo — e qualquer mudança no DOM aparece na tela na hora.</p>
            <p>Abaixo, criamos um elemento na memória (sem anexá-lo à página) só para ver sua forma. Rode:</p>`
        },
        {
          type: "runnable",
          file: "dom.js",
          autorun: true,
          code: [
            'const div = document.createElement("div")',
            'div.textContent = "Olá, DOM!"',
            'div.className = "destaque"',
            '',
            'console.log(div.outerHTML)'
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🌳",
          title: "Modelo mental: o organograma",
          html: `
            <p>O documento é a empresa; cada elemento é um funcionário com um chefe (elemento-pai) e subordinados (elementos-filhos). O JavaScript navega e reorganiza esse organograma — contrata, demite e move funcionários — e a estrutura muda na tela.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "Criar e alterar",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Montando a árvore pelo código",
          html: `
            <p><code>createElement</code> cria um nó, <code>textContent</code> define o texto, e <code>appendChild</code> o insere como filho de outro. Para <strong>encontrar</strong> elementos já na página, usa-se <code>document.querySelector("seletor CSS")</code>. Rode e veja uma pequena árvore sendo montada:</p>`
        },
        {
          type: "runnable",
          file: "montar.js",
          autorun: true,
          code: [
            'const lista = document.createElement("ul")',
            '',
            'const item1 = document.createElement("li")',
            'item1.textContent = "Primeiro"',
            'lista.appendChild(item1)',
            '',
            'const item2 = document.createElement("li")',
            'item2.textContent = "Segundo"',
            'lista.appendChild(item2)',
            '',
            'console.log(lista.outerHTML)',
            'console.log("filhos:", lista.children.length)'
          ].join("\n")
        }
      ]
    },

    /* 3 */
    {
      label: "Eventos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A página fala com você",
          html: `
            <p>Eventos são como a página avisa que algo aconteceu: um clique, uma tecla, o envio de um formulário. Você reage com <code>addEventListener(tipo, callback)</code> — e o callback (lembra deles?) roda quando o evento dispara, recebendo um objeto <code>event</code> com detalhes. Rode:</p>`
        },
        {
          type: "runnable",
          file: "evento.js",
          autorun: true,
          code: [
            'const botao = document.createElement("button")',
            '',
            'botao.addEventListener("click", () => {',
            '  console.log("o botão foi clicado!")',
            '})',
            '',
            'botao.click() // dispara o evento manualmente'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Propagação de eventos",
      kind: "interactive",
      blocks: [
        {
          type: "eventflow",
          heading: "A viagem de um clique",
          intro: "Um clique não acontece isolado: o evento percorre a árvore do topo até o alvo (fase de captura) e depois volta subindo (bubbling). Avance e acompanhe o caminho.",
          tree: [
            { id: "doc", label: "document" },
            { id: "body", label: "<body>" },
            { id: "div", label: '<div class="card">' },
            { id: "btn", label: "<button>" }
          ]
        }
      ]
    },

    /* 5 */
    {
      label: "Bubbling vs capturing",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Duas fases, um alvo",
          html: `
            <p>Como você viu, um clique viaja em duas fases. Na <strong>captura</strong>, o evento desce do <code>document</code> até o alvo. Na <strong>bubbling</strong>, sobe do alvo de volta ao topo. Por padrão, os listeners rodam na fase de <strong>bubbling</strong> — por isso um clique num botão também dispara listeners nos elementos-pai.</p>
            <p>Dois detalhes úteis: <code>event.target</code> é <strong>quem</strong> foi clicado; <code>event.currentTarget</code> é o elemento <strong>onde o listener está</strong>. Essa diferença é a chave do próximo conceito.</p>`
        }
      ]
    },

    /* 6 */
    {
      label: "Event delegation",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um listener para muitos filhos",
          html: `
            <p><strong>Event delegation</strong> é um padrão poderoso: em vez de um listener em cada filho, você coloca <strong>um só no pai</strong>. Graças ao bubbling, o clique no filho sobe até o pai, e <code>event.target</code> revela qual filho foi. Perfeito para listas grandes — e para itens que só aparecem depois. Rode:</p>`
        },
        {
          type: "runnable",
          file: "delegation.js",
          autorun: true,
          code: [
            'const lista = document.createElement("ul")',
            'lista.innerHTML = "<li>Café</li><li>Chá</li><li>Suco</li>"',
            '',
            '// UM listener no pai cuida de todos os filhos',
            'lista.addEventListener("click", (event) => {',
            '  console.log("clicou em:", event.target.textContent)',
            '})',
            '',
            'lista.children[1].click() // simula clique no "Chá"'
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
          heading: "Quem roda primeiro?",
          code: '<div id="pai">\n  <button id="filho">Clique</button>\n</div>\n\n// listeners de click (padrão) em #pai E em #filho',
          question: "Clicando no botão, em que ordem os dois listeners rodam?",
          options: [
            { label: "filho, depois pai", correct: true },
            { label: "pai, depois filho" },
            { label: "só o do filho" }
          ],
          okText: "<b>Certo.</b> Por padrão, listeners rodam na fase de <strong>bubbling</strong>, que sobe do alvo para fora: primeiro o <code>#filho</code> (o alvo do clique), depois o <code>#pai</code>. É por isso que delegation funciona.",
          noText: "<b>Pense no bubbling.</b> O evento sobe do alvo em direção ao topo. O listener do <code>#filho</code> (alvo) roda primeiro; depois o do <code>#pai</code>, por onde o evento passa ao subir."
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
          heading: "Desafio: o botão Enviar",
          html: `
            <p>Crie um <code>&lt;button&gt;</code> com o texto <code>"Enviar"</code>, adicione um listener de <code>click</code> que imprime <code>"enviando..."</code>, e dispare o clique com <code>.click()</code>.</p>`
        },
        {
          type: "runnable",
          file: "enviar.js",
          code: [
            '// 1. Crie um button com texto "Enviar"',
            '// 2. Adicione um listener de click que imprime "enviando..."',
            '// 3. Dispare o clique com .click()',
            ''
          ].join("\n"),
          solution: [
            'const botao = document.createElement("button")',
            'botao.textContent = "Enviar"',
            '',
            'botao.addEventListener("click", () => {',
            '  console.log("enviando...")',
            '})',
            '',
            'botao.click()'
          ].join("\n")
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
            "O DOM representa a página como uma árvore de nós que o JavaScript lê e modifica ao vivo.",
            "createElement/textContent/appendChild criam e montam elementos; querySelector busca por seletor CSS.",
            "addEventListener(tipo, callback) reage a eventos; o callback recebe um objeto event.",
            "Um evento viaja em duas fases: captura (desce) e bubbling (sobe) — listeners rodam no bubbling por padrão.",
            "event.target é quem disparou; event.currentTarget é onde o listener está.",
            "Event delegation usa um listener no pai para cuidar de muitos filhos, via bubbling + event.target."
          ]
        }
      ]
    }
  ]
};
