/* ============================================================
   Léxico — Conteúdo do Módulo (slug: decorators)
   "Decorators" — exibido como nº 41 na trilha TypeScript.
   Estreia o bloco 'decostack': pipeline de decorators em camadas
   (cebola) — a chamada entra e sai por cada decorator.
   ============================================================ */
window.LEXICO = window.LEXICO || {};
LEXICO.lessons = LEXICO.lessons || {};

LEXICO.lessons["decorators"] = {
  title: "Decorators",
  lead: "Decorators deixam você adicionar comportamento a uma classe ou método sem tocar no corpo dele — log, medição, validação, injeção de dependência. É a sintaxe @ que você vê em Angular e NestJS, e que o TypeScript moderno padronizou.",

  steps: [
    /* 1 */
    {
      label: "O que é",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Uma função que embrulha",
          html: `
            <p>Um <strong>decorator</strong> é uma função que recebe o alvo (uma classe, um método) e devolve uma versão <strong>aumentada</strong> dele. Você aplica com <code>@nome</code> logo acima do alvo, e ele roda <strong>uma vez</strong>, quando a classe é definida.</p>
            <p>Servem para <strong>preocupações transversais</strong> (cross-cutting): aquilo que se repete em muitos lugares e não é a lógica principal — registrar chamadas, medir tempo, checar permissões, cadastrar rotas. Em vez de poluir cada método, você marca com um <code>@</code>.</p>`
        },
        {
          type: "callout",
          variant: "mental",
          icon: "🧅",
          title: "Modelo mental: a cebola",
          html: `
            <p>Vários decorators empilhados envolvem o método como camadas de uma cebola. Uma chamada atravessa de fora para dentro até o núcleo (o método original) e volta de dentro para fora — cada camada pode agir na entrada e na saída. É o mesmo padrão de middleware.</p>`
        }
      ]
    },

    /* 2 */
    {
      label: "O pipeline",
      kind: "interactive",
      blocks: [
        {
          type: "decostack",
          heading: "A chamada atravessa as camadas",
          intro: "O método <code>salvar()</code> está envolto por <code>@log</code> (fora) e <code>@medir</code> (dentro). Avance e veja a chamada entrar camada por camada até o núcleo e sair — repare na ordem no console.",
          layers: [
            { label: "@log", kind: "deco" },
            { label: "@medir", kind: "deco" },
            { label: "salvar()", kind: "core" }
          ],
          steps: [
            { layer: 0, phase: "enter", log: "LOG → chamando salvar()" },
            { layer: 1, phase: "enter", log: "⏱ timer iniciado" },
            { layer: 2, phase: "core", log: "corpo original de salvar() executa" },
            { layer: 1, phase: "exit", log: "⏱ salvar() levou 3ms" },
            { layer: 0, phase: "exit", log: "LOG → salvar() retornou" }
          ]
        }
      ]
    },

    /* 3 */
    {
      label: "Anatomia",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Um decorator de método",
          html: `
            <p>No TypeScript moderno (padrão TC39, default a partir do TS 5), um decorator de método recebe o <strong>método original</strong> e um objeto <strong>context</strong> (com o nome, o tipo etc.), e devolve a função que o substitui. Embrulhar é só retornar uma nova função que chama a original no meio:</p>`
        },
        {
          type: "code",
          file: "log.ts",
          code: [
            'function log(original: any, context: ClassMethodDecoratorContext) {',
            '  return function (this: any, ...args: any[]) {',
            '    console.log(`→ chamando ${String(context.name)}`)',
            '    const resultado = original.apply(this, args)   // o núcleo',
            '    console.log(`← ${String(context.name)} retornou`)',
            '    return resultado',
            '  }',
            '}',
            '',
            'class Servico {',
            '  @log',
            '  salvar() { return "salvo" }',
            '}'
          ].join("\n")
        }
      ]
    },

    /* 4 */
    {
      label: "Ordem de composição",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "De baixo para cima, de fora para dentro",
          html: `
            <p>Com vários decorators, há duas ordens que confundem — e são diferentes:</p>
            <ul>
              <li><strong>Aplicação:</strong> de baixo para cima. O decorator mais próximo do método (<code>@medir</code>) embrulha primeiro; <code>@log</code> embrulha o resultado. Fica <code>log(medir(salvar))</code>.</li>
              <li><strong>Execução de uma chamada:</strong> de fora para dentro e de volta. <code>@log</code> age na entrada, depois <code>@medir</code>, depois o método, depois <code>@medir</code> na saída, depois <code>@log</code>. Foi a cebola que você percorreu.</li>
            </ul>`
        },
        {
          type: "code",
          file: "ordem.ts",
          code: [
            'class Servico {',
            '  @log       // aplicado por último → camada externa',
            '  @medir     // aplicado primeiro → camada interna',
            '  salvar() { /* ... */ }',
            '}',
            '',
            '// aplicação:  log(medir(salvar))',
            '// chamada:    log↘ medir↘ salvar ↗medir ↗log'
          ].join("\n")
        }
      ]
    },

    /* 5 */
    {
      label: "Classe e propriedade",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Não só métodos",
          html: `
            <p>Decorators também marcam a <strong>classe inteira</strong> (ótimo para registrar a classe num sistema, como faz o <code>@Component</code> do Angular ou o <code>@Controller</code> do NestJS) e <strong>campos</strong>. Um decorator de classe recebe o construtor e pode substituí-lo ou apenas registrá-lo:</p>`
        },
        {
          type: "code",
          file: "classe.ts",
          code: [
            'function registrar(alvo: Function, context: ClassDecoratorContext) {',
            '  console.log(`classe registrada: ${String(context.name)}`)',
            '}',
            '',
            '@registrar',
            'class Usuario {',
            '  nome = "Ana"',
            '}',
            '// ao definir a classe: "classe registrada: Usuario"'
          ].join("\n")
        }
      ]
    },

    /* 6 */
    {
      label: "Moderno vs legado",
      kind: "concept",
      blocks: [
        {
          type: "prose",
          heading: "Duas gerações (e por que importa)",
          html: `
            <p>Existem <strong>dois</strong> sistemas de decorators, e isso causa confusão:</p>
            <ul>
              <li><strong>Legado</strong> (<code>experimentalDecorators: true</code> no tsconfig): a forma antiga, geralmente com a biblioteca <code>reflect-metadata</code>. É o que <strong>Angular e NestJS</strong> usam até hoje.</li>
              <li><strong>Moderno</strong> (TC39 Stage 3): padronizado pela linguagem, default a partir do TypeScript 5, sem flag. Assinatura <code>(valor, context)</code> — a que você viu aqui.</li>
            </ul>
            <p>Ao ler código de framework, confira o <code>tsconfig</code>: a assinatura dos decorators muda entre os dois mundos. Para código novo e independente de framework, prefira o padrão moderno.</p>`
        },
        {
          type: "callout",
          variant: "warn",
          icon: "⚙️",
          title: "Por que não roda aqui",
          html: `
            <p>Decorators exigem compilação (a sintaxe <code>@</code> ainda não roda direto no navegador). Por isso os exemplos deste módulo são para leitura, e o pipeline acima é uma simulação do que aconteceria em runtime.</p>`
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
          heading: "A ordem no console",
          code: '@log\n@medir\nsalvar() { /* corpo */ }\n\n// ao chamar salvar()',
          question: "Em que ordem as mensagens aparecem?",
          options: [
            { label: "log entra → medir entra → corpo → medir sai → log sai", correct: true },
            { label: "medir entra → log entra → corpo → log sai → medir sai" },
            { label: "corpo → medir → log" }
          ],
          okText: "<b>Certo.</b> <code>@log</code> é a camada externa, então age primeiro na entrada e por último na saída — como uma cebola. A chamada desce <code>log → medir → corpo</code> e sobe <code>corpo → medir → log</code>.",
          noText: "<b>Pense na cebola.</b> <code>@log</code> fica por fora: entra primeiro e sai por último. A sequência é <code>log↘ medir↘ corpo ↗medir ↗log</code> — exatamente o que o pipeline mostrou."
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
          heading: "Desafio: quem embrulha quem?",
          html: `
            <p>Dado o código abaixo, raciocine sobre a <strong>aplicação</strong> dos decorators (não a execução da chamada) e escolha a composição resultante.</p>`
        },
        {
          type: "quiz",
          code: 'class Rota {\n  @autenticar\n  @cachear\n  handler() { /* ... */ }\n}',
          question: "Qual é a composição aplicada ao método handler?",
          options: [
            { label: "autenticar(cachear(handler))", correct: true },
            { label: "cachear(autenticar(handler))" },
            { label: "handler(autenticar, cachear)" }
          ],
          okText: "<b>Certo.</b> A aplicação é de baixo para cima: <code>@cachear</code> (mais próximo) embrulha o <code>handler</code> primeiro, e <code>@autenticar</code> embrulha esse resultado. Logo: <code>autenticar(cachear(handler))</code> — a autenticação fica na camada externa, rodando primeiro em cada chamada.",
          noText: "<b>De baixo para cima.</b> O decorator mais próximo do método (<code>@cachear</code>) é aplicado primeiro; o de cima (<code>@autenticar</code>) embrulha o resultado. Então a composição é <code>autenticar(cachear(handler))</code>."
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
            "Um decorator é uma função que embrulha e aumenta uma classe ou método, aplicada com @ e rodada na definição.",
            "Servem para preocupações transversais: log, medição, validação, injeção, registro de rotas.",
            "Decorators empilhados compõem como uma cebola: a chamada entra de fora para dentro e volta.",
            "Aplicação é de baixo para cima (o mais próximo embrulha primeiro); execução vai do externo ao interno e de volta.",
            "Há decorators de classe, método e propriedade — o de classe é o que registra componentes em frameworks.",
            "Dois sistemas coexistem: legado (experimentalDecorators, usado por Angular/NestJS) e o moderno TC39, default no TS 5."
          ]
        }
      ]
    }
  ]
};
