# Code Zero — Full Snack Dev

Plataforma interativa que ensina **JavaScript e TypeScript do zero ao avançado**, em português. Curso de 45 módulos organizados em 9 fases (trilhas), com aulas em etapas, blocos de código, quizzes e exercícios — tudo em uma interface no estilo editor de código.

É um site **estático** (HTML + CSS + JavaScript puro, sem build e sem dependências). Roda em qualquer navegador e publica em qualquer host estático.

## Estrutura

```
.
├── index.html                 # App (interface + lógica inline); carrega os dados abaixo
├── standalone.html            # ⭐ Versão de ARQUIVO ÚNICO (tudo embutido) — ideal p/ download/offline
├── js/
│   ├── data.js                # Currículo: fases e os 45 módulos (fonte única de verdade)
│   ├── progress.js            # Progresso do aluno (localStorage)
│   └── lessons/
│       ├── modulo-01.js       # Conteúdo das aulas (um arquivo por módulo)
│       └── ... modulo-45.js
├── .github/workflows/deploy.yml  # Deploy automático no GitHub Pages
├── robots.txt · sitemap.xml   # SEO (indexação pelos buscadores)
└── .nojekyll                  # Impede o Jekyll de processar o site
```

## Rodar localmente

Como o `index.html` carrega os arquivos de `js/` via `<script src>`, use um servidor local (abrir via `file://` pode ser bloqueado por alguns navegadores):

```bash
# Python
python3 -m http.server 8000
# depois abra http://localhost:8000
```

Ou, no VS Code, use a extensão **Live Server**.

> Alternativa sem servidor: abra **`standalone.html`** diretamente (duplo clique). Ele tem todo o conteúdo embutido e funciona offline.

## Publicar no GitHub Pages

### Método A — Deploy a partir de um branch (mais simples)

1. Crie um repositório no GitHub e suba estes arquivos no branch `main`.
2. No repositório: **Settings → Pages**.
3. Em **Source**, escolha **Deploy from a branch**.
4. Selecione o branch **`main`** e a pasta **`/ (root)`** e salve.
5. Em ~1 minuto o site fica em `https://uaibritto.github.io/codezero/`.

O arquivo `.nojekyll` já está incluído para o site ser servido exatamente como está.

### Método B — GitHub Actions (automático a cada push)

Já existe um workflow em `.github/workflows/deploy.yml`.

1. Suba os arquivos no branch `main`.
2. Em **Settings → Pages**, defina **Source = GitHub Actions**.
3. A cada push para `main` o site é publicado automaticamente.

> Dica: para publicar **só o arquivo único**, renomeie `standalone.html` para `index.html` em um repositório separado — nenhuma outra configuração é necessária.

## Download do código

- **Arquivo único:** abra `standalone.html` no navegador e use **Arquivo → Salvar como…** (ou `Cmd/Ctrl + S`). É um `.html` autossuficiente com os 45 módulos embutidos.
- **Projeto completo:** baixe os arquivos desta pasta mantendo a estrutura acima.

## Licença

Uso livre para fins educacionais. Ajuste conforme necessário.

## SEO (indexação nos buscadores)

O site já vem otimizado para aparecer em buscas por **curso de JavaScript, TypeScript e algoritmos**:

- `<title>`, meta `description`/`keywords`, Open Graph e Twitter Card no `index.html`.
- **Dados estruturados** (JSON-LD schema.org `Course` + `ItemList` dos 45 módulos) para resultados ricos de cursos no Google.
- Conteúdo rastreável (fases + módulos) embutido para os buscadores, já que a aplicação é renderizada via JavaScript e o conteúdo real fica após o login.
- `robots.txt` e `sitemap.xml` prontos.

**Passo obrigatório ao publicar:** troque a URL `https://code-zero.github.io/` pela URL real do seu site em **3 lugares** — `index.html` (canonical + Open Graph), `sitemap.xml` e `robots.txt`. Depois, cadastre o site no [Google Search Console](https://search.google.com/search-console) e envie o `sitemap.xml`.
