/* ============================================================
   Léxico — Conteúdo do Módulo 01
   "Pensando como programador"
   Estrutura em ETAPAS (steps): cada etapa é uma tela mostrada
   por vez, evitando despejar tudo de uma vez. Cada etapa tem
   um "kind" (concept | interactive | exercise | challenge | summary).

   Este é o módulo mais importante do curso: ele não ensina
   sintaxe, ensina a PENSAR. As quatro ferramentas do pensamento
   computacional (decomposição, padrões, abstração, algoritmo)
   são treinadas uma a uma sobre um mesmo exemplo real — um app
   de lista de tarefas — e depois reunidas num método repetível
   que termina transformando uma ideia vaga em um plano de código.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["pensando-como-programador"] = {
  title: "Pensando como programador",
  lead: "Antes de escrever a primeira linha de código, existe algo mais importante: aprender a pensar em passos claros. É isso que separa quem decora comandos de quem realmente programa — e é a habilidade que, treinada de propósito, transforma uma ideia na sua cabeça em algo que você consegue construir.",

  steps: [
    /* ---------- Etapa 1 ---------- */
    {
      label: "O que é programar",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Programar é dar instruções",
          html: `
            <p>Antes de aprender qualquer linguagem, vale entender o que você vai realmente fazer. Programar não é decorar símbolos estranhos. É <strong>escrever instruções tão claras que uma máquina consiga segui-las sem pensar por conta própria</strong>.</p>
            <p>Existe um problema no mundo — organizar uma lista, calcular um preço, mostrar uma mensagem — e você descreve, passo a passo, como resolvê-lo. O computador executa exatamente o que você mandou. Nem mais, nem menos.</p>
            <p>Essa é a mudança de mentalidade mais importante do curso inteiro. Tudo o que vem depois — variáveis, funções, tipos — são apenas formas mais precisas de escrever instruções.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧠",
          title: "Modelo mental: o cozinheiro literal",
          html: `
            <p>Imagine um cozinheiro <strong>absurdamente rápido</strong>, capaz de executar milhões de passos por segundo — mas também <strong>absurdamente literal</strong>. Ele nunca supõe nada. Se a receita disser "misture", ele pergunta: misturar o quê, com o quê, por quanto tempo?</p>
            <p>Esse cozinheiro é o computador. Sua velocidade é sobre-humana, mas sua interpretação é zero. Você é o chef que escreve a receita.</p>`
        }
      ]
    },

    /* ---------- Etapa 2 ---------- */
    {
      label: "Algoritmos",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "O que é um algoritmo",
          html: `
            <p>Uma receita de cozinha é uma sequência de passos que leva de ingredientes crus a um prato pronto. Em programação, essa sequência tem um nome: <strong>algoritmo</strong>.</p>
            <p>Um algoritmo é simplesmente <strong>uma lista ordenada de instruções que resolve um problema</strong>. Você já usa algoritmos o dia inteiro sem perceber: escovar os dentes, fazer um café, chegar ao trabalho.</p>`
        },
        {
          type: "code",
          file: "sanduiche.txt",
          caption: "Um algoritmo escrito em português — antes mesmo de existir código:",
          code: [
            "// Algoritmo: montar um sanduíche",
            "// 1. Pegue duas fatias de pão",
            "// 2. Passe manteiga em uma das fatias",
            "// 3. Coloque o queijo sobre a manteiga",
            "// 4. Junte as duas fatias, com o recheio no meio",
            "// 5. Pronto — o sanduíche está montado"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "warn",
          icon: "⚠️",
          title: "A armadilha da ambiguidade",
          html: `
            <p>Para um humano, esse algoritmo é claro. Para o cozinheiro literal, não. "Passe manteiga" — com a faca? com a mão? quanta manteiga?</p>
            <p>Boa parte de aprender a programar é treinar o olho para enxergar essas lacunas <strong>antes</strong> que a máquina as encontre. Precisão é o idioma nativo do computador.</p>`
        }
      ]
    },

    /* ---------- Etapa 3 ---------- */
    {
      label: "Preveja o resultado",
      kind: "interactive",
      blocks: [
        {
          type: "predict",
          heading: "Teste sua intuição",
          question: "No passo 2, o algoritmo diz apenas “passe manteiga”. Para um computador literal, qual é o problema?",
          options: [
            { label: "Nenhum — ele entende o que você quis dizer." },
            { label: "Falta dizer com o quê, onde e quanta manteiga usar.", correct: true },
            { label: "“Manteiga” não é um tipo de informação válido." }
          ],
          okText: "<b>Exatamente.</b> O computador não preenche lacunas por você. Cada detalhe implícito é uma decisão que ele não sabe tomar. Escrever instruções completas é a habilidade central de todo o curso.",
          noText: "<b>Quase.</b> O computador nunca “entende o que você quis dizer” — ele é literal. A opção destacada mostra o problema real: detalhes deixados de fora são justamente o que trava uma máquina literal."
        }
      ]
    },

    /* ---------- Etapa 4 ---------- */
    {
      label: "Pensamento computacional",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "As quatro ferramentas do pensamento",
          html: `
            <p>Resolver problemas grandes escrevendo passos claros tem um nome: <strong>pensamento computacional</strong>. Não é sobre computadores — é uma forma de raciocinar, apoiada em quatro ferramentas que você vai usar em todos os módulos.</p>
            <p>Nas etapas seguintes a gente não vai só <em>citar</em> cada ferramenta: vamos treinar uma por uma, sobre o mesmo exemplo, até que elas virem um método que você consegue repetir em qualquer ideia.</p>`
        },
        {
          type: "cards",
          cards: [
            { n: "01", title: "Decomposição", text: "Quebrar um problema grande em pedaços pequenos e resolvíveis. Ninguém “faz um app” — faz-se uma parte de cada vez." },
            { n: "02", title: "Reconhecer padrões", text: "Perceber que pedaços diferentes se parecem. Se dois problemas têm a mesma forma, uma solução pode servir aos dois." },
            { n: "03", title: "Abstração", text: "Ignorar os detalhes que não importam agora e focar no essencial. Você não precisa saber como o motor funciona para dirigir." },
            { n: "04", title: "Algoritmos", text: "Escrever a sequência exata de passos que resolve cada pedaço. É onde as outras três ferramentas viram ação." }
          ]
        }
      ]
    },

    /* ---------- Etapa 5 (NOVA) — o reframe ---------- */
    {
      label: "O verdadeiro obstáculo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Por que saber a linguagem não basta",
          html: `
            <p>Quase todo mundo acredita que programar é aprender a <strong>linguagem</strong>: a sintaxe, os comandos, os algoritmos clássicos. Então a pessoa estuda, entende cada pedaço quando lê — e mesmo assim trava na frente de um arquivo em branco. Reconhece o cenário?</p>
            <p>O que falta quase nunca é sintaxe. É a habilidade de pegar uma ideia difusa na cabeça e transformá-la em <strong>uma estrutura de pedaços pequenos que se encaixam</strong>. Essa é a parte que ninguém ensina explicitamente, porque parece "óbvia" para quem já sabe — e invisível para quem não sabe.</p>
            <p>A boa notícia, e eu quero que você leve isso a sério: <strong>isso não é talento, é um processo.</strong> As quatro ferramentas da etapa anterior não são uma lista para decorar. São <strong>quatro movimentos que você faz, em ordem, sobre qualquer problema</strong>. O resto deste módulo treina cada movimento sobre um exemplo real e depois mostra como reuni-los.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🔁",
          title: "O loop do qual você quer sair",
          html: `
            <p>O loop é mais ou menos assim: você copia um código → ele funciona → mas você não conseguiria recriá-lo sozinho → sente que está "trapaceando" → copia mais código. E o ciclo se fecha.</p>
            <p>A saída não é copiar melhor nem decorar mais sintaxe. A saída é <strong>praticar o pensamento de propósito</strong>: em voz alta, no papel, em pedaços pequenos, antes de tocar no editor. É literalmente o que vamos fazer agora — e é uma habilidade que se treina como qualquer outra.</p>`
        }
      ]
    },

    /* ---------- Etapa 6 (NOVA) — Decomposição ---------- */
    {
      label: "Decomposição a fundo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Decompor: quebrar até caber na cabeça",
          html: `
            <p>Ninguém "faz um app". A frase já está errada de tão grande. O que você faz é resolver um pedacinho, depois outro, depois outro — e a soma deles vira o app. <strong>Decompor é quebrar um problema até que cada pedaço seja algo que você já saberia começar.</strong></p>
            <p>Existe uma técnica concreta para isso, e ela cabe em uma pergunta que você repete:</p>
            <p style="font-size:17px"><strong>“Para isso acontecer, o que precisa ser verdade ou acontecer antes?”</strong></p>
            <p>Você faz a pergunta sobre o objetivo. Ela te dá peças menores. Você faz a mesma pergunta sobre cada peça. E vai parando quando um pedaço passa no <strong>teste do pedaço pequeno</strong>: você consegue descrevê-lo em uma frase que começa com um verbo, e tem uma ideia aproximada de como faria.</p>`
        },
        {
          type: "code",
          file: "decomposicao.txt",
          caption: "Vamos decompor uma ideia real — um app de lista de tarefas. Repare como o pedaço grande se abre em pedaços cada vez mais concretos:",
          code: [
            "APP DE LISTA DE TAREFAS  (grande demais — o que precisa existir?)",
            "│",
            "├─ Mostrar as tarefas na tela",
            "│    ├─ Guardar a lista de tarefas em algum lugar",
            "│    └─ Desenhar cada tarefa como um item na tela",
            "│",
            "├─ Adicionar uma tarefa nova",
            "│    ├─ Pegar o texto que a pessoa digitou",
            "│    ├─ Se o texto estiver vazio, avisar e não continuar",
            "│    ├─ Guardar a nova tarefa na lista",
            "│    └─ Redesenhar a lista na tela",
            "│",
            "├─ Marcar uma tarefa como concluída",
            "│    ├─ Descobrir em qual tarefa a pessoa clicou",
            "│    ├─ Trocar o estado dela para 'concluída'",
            "│    └─ Redesenhar a lista na tela",
            "│",
            "└─ Apagar uma tarefa",
            "     ├─ Descobrir em qual tarefa a pessoa clicou",
            "     ├─ Remover essa tarefa da lista",
            "     └─ Redesenhar a lista na tela"
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🪄",
          title: "A pergunta mágica",
          html: `
            <p>“Para isso acontecer, o que precisa ser verdade antes?” — repita até cada folha da árvore ser um verbo concreto. Esse texto indentado acima <strong>já é</strong> metade do seu programa. Ainda não é código, mas é a planta da casa. E repare: nenhum pedaço lá embaixo é assustador sozinho.</p>`
        }
      ]
    },

    /* ---------- Etapa 7 (NOVA) — Decomposição prática ---------- */
    {
      label: "Pratique: decompor",
      kind: "exercise",
      blocks: [
        {
          type: "quiz",
          heading: "Qual pedaço ainda está grande demais?",
          question: "Alguém tentou decompor “adicionar uma tarefa”. Qual destes passos ainda esconde vários passos dentro de si — ou seja, ainda precisa ser quebrado?",
          options: [
            { label: "Pegar o texto que a pessoa digitou no campo." },
            { label: "Validar, guardar, reordenar por data, filtrar as concluídas e redesenhar tudo.", correct: true },
            { label: "Limpar o campo de digitação depois de adicionar." }
          ],
          okText: "<b>Isso.</b> Quando um único passo faz várias coisas (“validar E guardar E reordenar E filtrar E redesenhar”), isso é o sinal clássico de que ele ainda é um problema, não um passo. A regra prática: um passo faz <i>uma</i> coisa. Se você precisa de um “e” para descrevê-lo, provavelmente são dois passos.",
          noText: "<b>Repare no tamanho.</b> Dois dos passos fazem exatamente uma coisa cada. Um deles faz cinco coisas de uma vez — e é esse que ainda não terminou de ser decomposto. Procure o passo cheio de “e”."
        }
      ]
    },

    /* ---------- Etapa 8 = original Etapa 5 ---------- */
    {
      label: "Ordene os passos",
      kind: "exercise",
      blocks: [
        {
          type: "order",
          heading: "Coloque em ordem",
          question: "Escreva o algoritmo de “atravessar a rua com segurança”. Clique nos passos na ordem correta:",
          steps: [
            "Atravesse, mantendo atenção nos dois sentidos",
            "Pare na beira da calçada",
            "Confirme que os carros pararam ou estão distantes",
            "Olhe para a esquerda e para a direita"
          ],
          correct: [1, 3, 2, 0],
          okText: "<b>Perfeito.</b> A ordem importa tanto quanto os passos. “Atravessar” antes de “olhar” usa exatamente as mesmas instruções, mas produz um resultado desastroso. Em código, trocar duas linhas de lugar pode mudar tudo.",
          noText: "<b>Ainda não.</b> Repare que alguns passos dependem de outros: você só confirma que é seguro <i>depois</i> de olhar. Clique em “Recomeçar” e pense na dependência entre eles."
        }
      ]
    },

    /* ---------- Etapa 9 (NOVA) — Reconhecer padrões ---------- */
    {
      label: "Padrões a fundo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Reconhecer padrões: resolver uma vez, usar muitas",
          html: `
            <p>Volte à árvore da lista de tarefas e olhe para três pedaços diferentes: <strong>adicionar</strong>, <strong>concluir</strong> e <strong>apagar</strong>. À primeira vista, três coisas distintas. Olhe de novo com atenção à <em>forma</em> de cada uma.</p>
            <p>Reconhecer um padrão é perceber que coisas diferentes têm a <strong>mesma forma por baixo</strong>. Quando você vê isso, para de resolver o mesmo problema três vezes — resolve a forma uma vez e reaproveita.</p>`
        },
        {
          type: "code",
          file: "padroes.txt",
          caption: "As três operações, lado a lado. Olhe a coluna da direita: a forma se repete.",
          code: [
            "ADICIONAR        CONCLUIR          APAGAR            A FORMA EM COMUM",
            "──────────       ──────────        ──────────        ────────────────",
            "pega o texto     acha a tarefa     acha a tarefa  →  1. identificar o alvo",
            "guarda na lista  muda o estado     remove da lista→  2. mexer na lista",
            "redesenha        redesenha         redesenha      →  3. redesenhar a tela"
          ].join("\n")
        },
        {
          type: "prose",
          html: `
            <p>Todas as três seguem <strong>mexer na lista → redesenhar a tela</strong>. Isso é um padrão. Na prática, significa que você pode escrever o "redesenhar a tela" <strong>uma única vez</strong> e chamá-lo nas três — em vez de reescrever a mesma lógica em todo lugar.</p>
            <p>Padrões também aparecem <em>entre</em> projetos. "Validar um formulário", "carregar dados de uma API", "mostrar uma lista" são formas que você vai reencontrar a vida inteira. Quanto mais você programa, mais sua cabeça vira um catálogo de formas conhecidas — e é por isso que programadores experientes parecem rápidos: eles já viram aquela forma antes.</p>`
        }
      ]
    },

    /* ---------- Etapa 10 (NOVA) — Padrões prática ---------- */
    {
      label: "Pratique: padrões",
      kind: "interactive",
      blocks: [
        {
          type: "quiz",
          heading: "Encontre a forma repetida",
          question: "“Dar um like num post”, “favoritar uma música” e “salvar um artigo para depois”. Qual é o padrão — a forma que as três compartilham?",
          options: [
            { label: "São todas sobre redes sociais, então usam a mesma tela." },
            { label: "Identificar um item → marcar/desmarcar um estado nele → atualizar o visual desse item.", correct: true },
            { label: "Nenhum padrão — cada uma é um recurso totalmente diferente." }
          ],
          okText: "<b>Exato.</b> As três são a mesma forma: pegar um item, virar um interruptor de estado (ligado/desligado) nele e refletir isso na tela. Quem enxerga isso escreve <i>uma</i> solução de “alternar estado” e reaproveita nas três — em vez de três códigos quase idênticos.",
          noText: "<b>Olhe a mecânica, não o assunto.</b> O assunto (música, post, artigo) é diferente, mas a <i>ação</i> é idêntica nas três: ligar/desligar um estado num item e atualizar a tela. É essa forma compartilhada que é o padrão."
        }
      ]
    },

    /* ---------- Etapa 11 (NOVA) — Abstração (a chave) ---------- */
    {
      label: "Abstração a fundo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Abstração: o direito de esquecer os detalhes",
          html: `
            <p>Esta é a ferramenta que, na minha experiência, destrava mais gente — porque ataca diretamente a sensação de estar afogado. <strong>Abstrair é esconder os detalhes atrás de um nome, para poder pensar no <em>o quê</em> sem carregar o <em>como</em>.</strong></p>
            <p>Pense por que uma ideia grande paralisa: sua cabeça tenta segurar <strong>todos</strong> os detalhes ao mesmo tempo — a tela, os dados, as validações, os cliques — e não cabe. Ninguém consegue. A abstração resolve isso deixando você trabalhar <strong>um nível de cada vez</strong>.</p>
            <p>Quando você dirige, usa o volante, os pedais e o câmbio. Você não pensa na injeção eletrônica nem na combustão. O carro te deu uma <strong>interface</strong> — um conjunto de botões — e escondeu o motor atrás dela. Programar é construir e usar interfaces assim, camada sobre camada.</p>`
        },
        {
          type: "code",
          file: "abstracao.js",
          caption: "No código, abstração vira função. Repare: você consegue USAR a tarefa sem saber o recheio dela:",
          code: [
            "// Você pensa só nisto — o 'o quê':",
            "adicionarTarefa('Comprar pão')",
            "concluirTarefa(3)",
            "",
            "// ...e por enquanto NÃO precisa saber como elas funcionam por dentro.",
            "// O nome 'adicionarTarefa' é uma caixa fechada: você confia nele,",
            "// usa agora, e abre a caixa para preencher o recheio mais tarde."
          ].join("\n")
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧰",
          title: "Esquecer de propósito",
          html: `
            <p>Abstração é o <strong>direito de esquecer</strong>. Quando você dá um nome a um pedaço — <code>mostrarLista()</code>, <code>validarTexto()</code> — você compra o direito de parar de pensar nele e seguir em frente, confiando que vai preenchê-lo depois.</p>
            <p>É assim que a ideia gigante encolhe: ela vira meia dúzia de nomes que você entende, e cada nome vira um probleminha pequeno para resolver quando chegar a hora. Você nunca segura o app inteiro na cabeça — segura um nível de nomes de cada vez.</p>`
        }
      ]
    },

    /* ---------- Etapa 12 (NOVA) — Abstração prática ---------- */
    {
      label: "Pratique: abstração",
      kind: "interactive",
      blocks: [
        {
          type: "quiz",
          heading: "Abstração bem usada",
          question: "Você está montando o plano do app e chega na parte de “mostrar a lista na tela”. Qual decisão é abstração bem usada <em>neste momento</em>?",
          options: [
            { label: "Parar tudo e descobrir cada detalhe de como desenhar um item antes de seguir." },
            { label: "Dar um nome — mostrarLista() — anotar o que ela faz, e deixar o COMO desenhar para depois.", correct: true },
            { label: "Desistir dessa parte porque desenhar na tela é complicado demais." }
          ],
          okText: "<b>Isso é abstração.</b> Você nomeia o pedaço, registra sua responsabilidade (“desenha as tarefas na tela”) e segue com o plano. O “como” fica guardado para quando você estiver resolvendo <i>só</i> aquela caixa. Assim o plano inteiro avança sem travar nos detalhes de um ponto.",
          noText: "<b>Esse é exatamente o freio que te prende.</b> Mergulhar em todos os detalhes de um pedaço no meio do plano é o que faz a ideia parecer impossível. Abstração é o oposto: nomear a caixa, confiar no nome e seguir — para abrir a caixa depois, isolada."
        }
      ]
    },

    /* ---------- Etapa 13 (NOVA) — Algoritmo: juntar peças ---------- */
    {
      label: "Juntar as peças",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Algoritmo: ordenar os nomes",
          html: `
            <p>Agora as três primeiras ferramentas se pagam. Você <strong>decompôs</strong> a ideia em pedaços, viu os <strong>padrões</strong> que se repetem e <strong>abstraiu</strong> cada pedaço num nome. Sobrou a parte que parecia o começo mas na verdade é o fim: <strong>colocar os nomes na ordem certa.</strong></p>
            <p>Isso se escreve primeiro em <strong>pseudocódigo</strong> — português estruturado, sem se preocupar com a sintaxe da linguagem. O pseudocódigo é a ponte: ele já tem a lógica da máquina, mas ainda fala a sua língua.</p>`
        },
        {
          type: "code",
          file: "algoritmo.txt",
          caption: "O algoritmo de “adicionar uma tarefa”, escrito com os nomes que você já abstraiu:",
          code: [
            "QUANDO a pessoa clicar em “Adicionar”:",
            "  1. texto = pegar o que foi digitado no campo",
            "  2. SE texto estiver vazio:",
            "        avisar a pessoa e PARAR aqui",
            "  3. guardar uma nova tarefa com esse texto na lista",
            "  4. limpar o campo de digitação",
            "  5. mostrarLista()   // reaproveita o pedaço que já tem nome"
          ].join("\n")
        },
        {
          type: "prose",
          html: `
            <p>Está vendo? O passo 5 só <strong>chama um nome</strong> — <code>mostrarLista()</code> — que você já tinha abstraído. É o padrão "redesenhar a tela" sendo reaproveitado. Decomposição, padrão, abstração e algoritmo, todos numa linha só.</p>
            <p>Abaixo, esse mesmo plano virou código JavaScript de verdade. <strong>Você ainda não precisa entender a sintaxe</strong> — isso é trabalho dos próximos módulos. Só rode e repare numa coisa: o código tem <em>a mesma forma</em> do seu pseudocódigo. A tradução é quase direta.</p>`
        },
        {
          type: "runnable",
          file: "tarefas.js",
          caption: "Clique em ▶ Rodar. Depois, se quiser, troque os textos entre aspas e rode de novo:",
          code: [
            "// A lista começa vazia",
            "let tarefas = []",
            "",
            "// Um nome (abstração) para 'adicionar uma tarefa'",
            "function adicionarTarefa(texto) {",
            "  if (texto === '') {",
            "    console.log('Texto vazio — nada foi adicionado.')",
            "    return",
            "  }",
            "  tarefas.push(texto)",
            "  mostrarLista()",
            "}",
            "",
            "// Outro nome (abstração) para 'mostrar a lista'",
            "function mostrarLista() {",
            "  console.log('--- Minhas tarefas ---')",
            "  tarefas.forEach(function (t, i) {",
            "    console.log((i + 1) + '. ' + t)",
            "  })",
            "}",
            "",
            "// O algoritmo em ação:",
            "adicionarTarefa('Comprar pão')",
            "adicionarTarefa('Estudar Léxico')",
            "adicionarTarefa('')",
            "adicionarTarefa('Beber água')"
          ].join("\n"),
          autorun: false
        }
      ]
    },

    /* ---------- Etapa 14 (NOVA) — Algoritmo prática ---------- */
    {
      label: "Pratique: algoritmo",
      kind: "exercise",
      blocks: [
        {
          type: "order",
          heading: "Monte o algoritmo",
          question: "Você vai escrever o algoritmo de “adicionar uma tarefa” usando os pedaços já nomeados. Clique na ordem correta:",
          steps: [
            "Pegar o texto que a pessoa digitou",
            "Guardar a nova tarefa na lista",
            "Se o texto estiver vazio, avisar e não continuar",
            "Redesenhar a lista na tela"
          ],
          correct: [0, 2, 1, 3],
          okText: "<b>Perfeito.</b> Primeiro você obtém o dado, depois valida (e para se estiver errado), só então guarda, e por fim redesenha. Guardar antes de validar deixaria entrar tarefa vazia; redesenhar antes de guardar mostraria a lista velha. A ordem é a lógica.",
          noText: "<b>Pense nas dependências.</b> Você não pode validar um texto que ainda não pegou, nem redesenhar uma lista que ainda não recebeu a tarefa nova. E a validação precisa vir <i>antes</i> de guardar — senão a tarefa vazia entra. Recomece seguindo o fluxo do dado."
        }
      ]
    },

    /* ---------- Etapa 15 = original Etapa 6 ---------- */
    {
      label: "Seu primeiro código",
      kind: "concept",
      blocks: [
        {
          type: "code",
          file: "ola.js",
          heading: "Seu primeiro contato com código",
          caption: "Você ainda não precisa entender a sintaxe. Só perceba que isto é uma instrução — “mostre este texto na tela”. Clique em testar:",
          code: 'console.log("Olá, mundo!")',
          output: "Olá, mundo!",
          run: true
        },
        {
          type: "prose",
          html: `
            <p>Essa linha é um algoritmo de um passo só: “mostre o texto <code>Olá, mundo!</code>”. Nos próximos módulos você vai aprender exatamente o que é <code>console.log</code>, por que existem aspas e o que acontece por baixo dos panos quando esse código roda.</p>
            <p>Por enquanto, guarde a ideia: <strong>código é instrução, e instrução precisa ser precisa</strong>.</p>`
        }
      ]
    },

    /* ---------- Etapa 16 (NOVA) — O método completo ---------- */
    {
      label: "O método completo",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Da ideia ao código, em cinco movimentos",
          html: `
            <p>Tudo o que a gente treinou vira um <strong>roteiro repetível</strong>. Da próxima vez que uma ideia aparecer e você sentir aquele branco, não abra o editor. Abra uma folha (de papel ou de notas) e rode estes cinco movimentos — nesta ordem:</p>`
        },
        {
          type: "cards",
          cards: [
            { n: "01", title: "Escreva o objetivo", text: "Uma frase, começando por um verbo, dizendo o resultado. “Mostrar uma lista de tarefas que a pessoa pode adicionar, concluir e apagar.”" },
            { n: "02", title: "Decomponha", text: "Pergunte “o que precisa ser verdade antes?” e quebre até cada pedaço ser um verbo que você saberia começar." },
            { n: "03", title: "Ache padrões", text: "Marque os pedaços que têm a mesma forma. Planeje resolver essa forma uma vez e reaproveitar." },
            { n: "04", title: "Abstraia", text: "Dê um nome a cada pedaço. Confie no nome, anote o que ele faz e NÃO abra o recheio agora." },
            { n: "05", title: "Escreva o algoritmo", text: "Ordene os nomes em pseudocódigo. Depois abra uma caixa de cada vez e transforme em código." }
          ]
        },
        {
          type: "callout",
          variant: "mental",
          icon: "📝",
          title: "O editor em branco é uma armadilha",
          html: `
            <p>O erro que trava quase todo mundo é tentar pensar <em>e</em> escrever código ao mesmo tempo, na frente do editor piscando. Separe as duas coisas. <strong>Primeiro o plano, no papel, na sua língua. Depois a tradução, no editor.</strong></p>
            <p>Quando você chega ao editor com os cinco movimentos feitos, não existe mais "página em branco": existe uma lista de caixas pequenas, cada uma com nome, esperando ser preenchida. É aí que programar deixa de ser assustador.</p>`
        }
      ]
    },

    /* ---------- Etapa 17 (NOVA) — Capstone ---------- */
    {
      label: "Capstone: ideia → plano",
      kind: "challenge",
      blocks: [
        {
          type: "challenge",
          heading: "Transforme uma ideia num plano",
          prompt: "Pegue esta ideia vaga: “um app que me lembra de beber água e conta quantos copos eu já bebi hoje”. Aplique os cinco movimentos — objetivo em uma frase, decomposição, padrões, nomes (abstração) e o algoritmo em pseudocódigo. (Se quiser, troque pela sua própria ideia. O que importa é rodar o processo inteiro.)",
          placeholder: "1. Objetivo:\n2. Decomposição:\n   - ...\n3. Padrões:\n4. Nomes (abstração):\n5. Algoritmo:",
          model: `
            <p style="margin-bottom:10px">Não existe resposta única — o valor está em ter rodado os cinco movimentos. Uma versão possível:</p>
            <p style="font-family:var(--font-mono);font-size:13px;line-height:1.85;color:var(--text-2)">
            <strong>1) Objetivo (uma frase):</strong><br>
            Mostrar quantos copos de água bebi hoje, deixar eu registrar um novo copo e me lembrar de beber de tempos em tempos.<br><br>
            <strong>2) Decomposição</strong> (“o que precisa ser verdade antes?”):<br>
            • Guardar a contagem de copos de hoje<br>
            • Guardar a meta diária (ex.: 8 copos)<br>
            • Registrar um copo → somar 1 na contagem → redesenhar a tela<br>
            • Mostrar na tela: copos de hoje, meta e quanto falta<br>
            • Zerar a contagem quando virar o dia<br>
            • Lembrar a pessoa de tempos em tempos<br><br>
            <strong>3) Padrões:</strong><br>
            “Registrar um copo” e “zerar no novo dia” têm a mesma forma: <i>mudar a contagem → redesenhar a tela</i>. Logo, “redesenhar a tela” é um pedaço único e reaproveitável.<br><br>
            <strong>4) Nomes (abstração):</strong><br>
            registrarCopo() · mostrarProgresso() · precisaZerarHoje() · dispararLembrete()<br><br>
            <strong>5) Algoritmo (pseudocódigo):</strong><br>
            AO ABRIR o app:<br>
            &nbsp;&nbsp;SE precisaZerarHoje(): contagem = 0<br>
            &nbsp;&nbsp;mostrarProgresso()<br>
            QUANDO a pessoa tocar em “Bebi um copo”:<br>
            &nbsp;&nbsp;registrarCopo()&nbsp;&nbsp;// soma 1 e chama mostrarProgresso()<br>
            A CADA 1 hora:<br>
            &nbsp;&nbsp;SE contagem &lt; meta: dispararLembrete()
            </p>
            <p style="margin-top:12px">Repare no que acabou de acontecer: uma frase vaga virou <strong>quatro nomes e um fluxo claro</strong>. Nenhum pedaço é assustador sozinho, e você saberia por onde começar cada um. <strong>Isto</strong> é pensar computacionalmente — e você acabou de fazer.</p>`
        }
      ]
    },

    /* ---------- Etapa 18 = original Etapa 7 ---------- */
    {
      label: "Desafio: o literal",
      kind: "challenge",
      blocks: [
        {
          type: "challenge",
          heading: "Desafio",
          prompt: "Escreva, em português, o algoritmo para escovar os dentes — como se explicasse ao cozinheiro literal. Seja específico o bastante para que nada fique implícito.",
          placeholder: "1. ...\n2. ...\n3. ...",
          model: `
            <p style="margin-bottom:10px">Não existe uma resposta única — o objetivo é treinar o olhar para os detalhes. Uma versão bem específica poderia ser:</p>
            <p style="font-family:var(--font-mono);font-size:13.5px;line-height:1.8;color:var(--text-2)">
            1. Pegue a escova de dentes pelo cabo<br>
            2. Abra o tubo de pasta<br>
            3. Aperte o tubo até uma porção do tamanho de uma ervilha cair sobre as cerdas<br>
            4. Feche o tubo<br>
            5. Molhe as cerdas com um pouco de água<br>
            6. Escove cada grupo de dentes por cerca de 30 segundos, em movimentos circulares<br>
            7. Cuspa a pasta<br>
            8. Enxágue a boca e a escova com água</p>
            <p style="margin-top:12px">Se você escreveu “escove os dentes” em um passo só, tudo bem: perceber que <i>esse</i> passo esconde vários outros já é decomposição em ação.</p>`
        }
      ]
    },

    /* ---------- Etapa 19 (NOVA) — Encorajamento com método ---------- */
    {
      label: "Isso se treina",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "A parte que ninguém te contou",
          html: `
            <p>Se você sente que entende a linguagem mas não consegue construir, saiba de uma coisa: isso <strong>não é falta de inteligência nem de talento</strong>. É a ausência de uma prática deliberada no único músculo que importa — pegar uma ideia e estruturá-la. Esse músculo quase nunca é treinado explicitamente, então muita gente passa anos achando que o problema é ela.</p>
            <p>A sensação de "estou copiando código que não sei recriar" tem cura, e a cura é mecânica, não mágica:</p>`
        },
        {
          type: "cards",
          cards: [
            { n: "01", title: "Decomponha em voz alta", text: "Pegue uma ideia pequena por semana e rode os cinco movimentos no papel — sem escrever código. O objetivo é o plano, não o app." },
            { n: "02", title: "Recrie sem olhar", text: "Depois de copiar algo que funcionou, feche tudo e reconstrua do zero. O que você não conseguir é exatamente o que ainda não entendeu." },
            { n: "03", title: "Comece ridiculamente pequeno", text: "Um app de um botão que soma 1 é um app real. Terminar algo minúsculo ensina mais que começar algo grande e abandonar." },
            { n: "04", title: "Narre o porquê", text: "Para cada linha, diga em voz alta por que ela existe. Se não souber, achou uma lacuna no seu entendimento — ótimo, é ali que se aprende." }
          ]
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🌱",
          title: "Dez anos não foram perdidos",
          html: `
            <p>Todo o tempo que você passou com a linguagem não foi em vão — ele é a <strong>base</strong> sobre a qual este músculo cresce rápido. Faltava só o treino certo, não recomeçar do zero. A partir de agora, cada vez que uma ideia aparecer, você tem um roteiro: objetivo, decompor, padrões, abstrair, algoritmo. Rode-o de propósito, e o "branco" na frente do editor vai ficando cada vez menor até sumir.</p>`
        }
      ]
    },

    /* ---------- Etapa 20 = original Etapa 8 (resumo ampliado) ---------- */
    {
      label: "Resumo",
      kind: "summary",
      blocks: [
        {
          type: "summary",
          heading: "O que você aprendeu",
          items: [
            "Programar é escrever instruções precisas para uma máquina que executa tudo literalmente.",
            "Um algoritmo é uma sequência ordenada de passos que resolve um problema.",
            "O computador é rápido e literal: ele não preenche as lacunas que você deixa.",
            "A ordem dos passos é parte da solução — trocar a ordem pode mudar o resultado.",
            "Pensamento computacional = decomposição, reconhecer padrões, abstração e algoritmos.",
            "Código é só uma forma mais precisa de escrever esses passos — é o que vem a seguir.",
            "O obstáculo real não é a sintaxe: é transformar uma ideia difusa em pedaços pequenos que se encaixam. Isso é processo, não talento.",
            "Decompor = perguntar “o que precisa ser verdade antes?” até cada pedaço ser um verbo que você saberia começar.",
            "Reconhecer padrões = enxergar a mesma forma em pedaços diferentes para resolver uma vez e reaproveitar.",
            "Abstrair = esconder os detalhes atrás de um nome, para pensar um nível de cada vez e não se afogar.",
            "O método: (1) objetivo numa frase, (2) decompor, (3) achar padrões, (4) abstrair em nomes, (5) ordenar o algoritmo — no papel, antes do editor.",
            "Isso se treina: decomponha em voz alta, recrie sem olhar, comece minúsculo e narre o porquê de cada passo."
          ]
        }
      ]
    }
  ]
};
