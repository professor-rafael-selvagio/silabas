# Silabas Divertidas

Aplicativo educacional interativo para apoiar o processo de alfabetizacao com foco em separacao silabica, reconhecimento visual de letras e pratica com leitura em portugues do Brasil.

O projeto foi pensado para uso simples e direto: a crianca pode digitar ou sortear frases, visualizar a divisao em silabas, tocar em cada parte para ouvir a pronuncia e navegar por atividades complementares.

## Acesso

Projeto publicado no GitHub Pages:

- `https://professor-rafael-selvagio.github.io/silabas/`

Paginas disponiveis:

- `https://professor-rafael-selvagio.github.io/silabas/`
- `https://professor-rafael-selvagio.github.io/silabas/letras.html`
- `https://professor-rafael-selvagio.github.io/silabas/versions.html`

## Visao Geral

O projeto hoje possui tres frentes principais:

- Pagina de silabas com foco na divisao silabica e reproducao de audio.
- Pagina de letras e familias silabicas para apoio visual na alfabetizacao.
- Pagina de versoes com o historico resumido da evolucao do projeto.

## Funcionalidades

- Separacao silabica automatica de palavras em portugues.
- Renderizacao visual destacando as silabas como botoes clicaveis.
- Reproducao individual de silabas com sintese de voz do navegador.
- Reproducao da frase completa.
- Sorteio de frases por nivel de dificuldade.
- Frases separadas por tamanho:
  - curtas
  - maiores
- Niveis de dificuldade:
  - facil
  - medio
  - dificil
- Tela complementar com letras maiusculas e minusculas.
- Tela complementar com familias silabicas.
- Modo tela cheia.
- Layout adaptado para desktop e mobile.

## Estrutura Das Paginas

### 1. Pagina principal

Arquivo: [index.html](/Users/rafael.selvagio/Projetos/Eloah/silabas/index.html)

Responsavel por:

- receber a frase digitada
- sortear frases prontas
- processar e separar as palavras em silabas
- permitir ouvir cada silaba
- destacar a area de resultado como elemento central da experiencia

Arquivos relacionados:

- [main.js](/Users/rafael.selvagio/Projetos/Eloah/silabas/main.js)
- [style.css](/Users/rafael.selvagio/Projetos/Eloah/silabas/style.css)
- [sentences.js](/Users/rafael.selvagio/Projetos/Eloah/silabas/sentences.js)

### 2. Pagina de letras e silabas

Arquivo: [letras.html](/Users/rafael.selvagio/Projetos/Eloah/silabas/letras.html)

Responsavel por:

- mostrar letras maiusculas e minusculas
- permitir ouvir letras e silabas
- exibir familias silabicas em organizacao visual

Arquivos relacionados:

- [letras.js](/Users/rafael.selvagio/Projetos/Eloah/silabas/letras.js)
- [letras.css](/Users/rafael.selvagio/Projetos/Eloah/silabas/letras.css)

### 3. Pagina de historico

Arquivo: [versions.html](/Users/rafael.selvagio/Projetos/Eloah/silabas/versions.html)

Responsavel por:

- resumir as principais versoes do projeto
- servir como pagina de apoio para consulta e documentacao publica

Arquivos relacionados:

- [versions.css](/Users/rafael.selvagio/Projetos/Eloah/silabas/versions.css)

## Banco De Frases

As frases usadas no sorteio ficam em um arquivo proprio:

- [sentences.js](/Users/rafael.selvagio/Projetos/Eloah/silabas/sentences.js)

Esse arquivo centraliza o objeto `sentenceBank`, organizado por:

- nivel:
  - `easy`
  - `medium`
  - `hard`
- tamanho:
  - `short`
  - `long`

Isso deixa o [main.js](/Users/rafael.selvagio/Projetos/Eloah/silabas/main.js) mais limpo e facilita:

- ampliar o numero de frases
- revisar o nivel pedagogico
- separar por temas no futuro
- migrar depois para JSON ou backend, se necessario

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- [Vite](https://vitejs.dev/) para desenvolvimento e build
- [`hypher`](https://www.npmjs.com/package/hypher) para separacao silabica
- [`hyphenation.pt`](https://www.npmjs.com/package/hyphenation.pt) para hifenizacao em portugues
- Web Speech API para reproducao de audio no navegador

## Requisitos

- Node.js 18+ ou superior
- npm

## Como Executar Localmente

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

Depois, abra no navegador a URL exibida pelo Vite.

Como o projeto usa a base `/silabas/`, o caminho local normalmente sera:

- `http://localhost:5173/silabas/`

Paginas locais esperadas:

- `http://localhost:5173/silabas/`
- `http://localhost:5173/silabas/letras.html`
- `http://localhost:5173/silabas/versions.html`

## Build De Producao

Para gerar a versao otimizada:

```bash
npm run build
```

Para visualizar localmente a build:

```bash
npm run preview
```

## Publicacao No GitHub Pages

O projeto esta preparado para deploy no GitHub Pages com build automatizado.

Fluxo esperado:

1. Fazer commit das alteracoes.
2. Enviar para a branch `main`.
3. O GitHub Actions executa o build.
4. O conteudo de `dist/` e publicado no GitHub Pages.

Arquivo de configuracao principal:

- [.github/workflows/deploy-pages.yml](/Users/rafael.selvagio/Projetos/Eloah/silabas/.github/workflows/deploy-pages.yml)

Configuracao de multiplas paginas no build:

- [vite.config.js](/Users/rafael.selvagio/Projetos/Eloah/silabas/vite.config.js)

## Estrutura Do Projeto

```text
.
|-- index.html
|-- letras.html
|-- versions.html
|-- main.js
|-- letras.js
|-- sentences.js
|-- style.css
|-- letras.css
|-- versions.css
|-- vite.config.js
|-- package.json
`-- .github/
```

## Evolucao Do Projeto

Resumo das principais evolucoes ja realizadas:

1. Criacao da pagina principal para separacao silabica.
2. Inclusao de audio por sintese de voz.
3. Criacao da pagina de letras e familias silabicas.
4. Expansao das familias silabicas.
5. Melhoria do layout com melhor aproveitamento do espaco.
6. Reorganizacao visual com foco maior na area de resultado.
7. Correcao do alfabeto com inclusao de `K`, `W` e `Y`.
8. Ampliacao do banco de frases.
9. Extracao das frases para arquivo dedicado.
10. Criacao da pagina publica de versoes.

## Possiveis Proximos Passos

- Separar frases por tema, serie ou faixa etaria.
- Adicionar mais controles pedagogicos por nivel.
- Criar feedback visual de acerto para atividades guiadas.
- Integrar captura de microfone para leitura oral.
- Adicionar backend no futuro para reconhecimento de fala mais robusto.

## Objetivo Educacional

O foco do projeto e apoiar a alfabetizacao de forma visual, interativa e acessivel, incentivando:

- reconhecimento de letras
- identificacao de silabas
- leitura de palavras
- escuta ativa
- associacao entre escrita e som

## Licenca

Este projeto esta sem licenca definida no momento. Se desejar, o proximo passo pode ser adicionar uma licenca explicita ao repositorio.
