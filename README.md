# Silabas Divertidas

Aplicativo educacional interativo para praticar separacao silabica em portugues do Brasil. A crianca pode digitar uma frase, visualizar a divisao em silabas e tocar em cada parte para ouvir a pronuncia.

## Acesso

Projeto publicado em:

`https://professor-rafael-selvagio.github.io/silabas/`

## Recursos

- Separacao silabica automatica de palavras em portugues
- Leitura por clique de cada silaba com Text-to-Speech
- Reproducao da frase completa
- Interface amigavel para uso educacional
- Modo tela cheia

## Tecnologias

- HTML, CSS e JavaScript
- [Vite](https://vitejs.dev/) para desenvolvimento e build
- [`hypher`](https://www.npmjs.com/package/hypher) com [`hyphenation.pt`](https://www.npmjs.com/package/hyphenation.pt) para hifenizacao em portugues
- Web Speech API para audio no navegador

## Requisitos

- Node.js 18+ ou 20+
- npm

## Executar localmente

Instale as dependencias:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Depois, abra no navegador o endereco exibido pelo Vite, normalmente `http://localhost:5173`.

Neste projeto, a rota local esperada fica em:

`http://localhost:5173/silabas/`

## Build de producao

Para gerar a versao otimizada:

```bash
npm run build
```

Para visualizar localmente a build:

```bash
npm run preview
```

## Publicacao no GitHub Pages

O projeto esta configurado para deploy no GitHub Pages por GitHub Actions.

Fluxo de publicacao:

1. Enviar alteracoes para a branch `main`
2. O workflow em `.github/workflows/deploy-pages.yml` executa o build
3. O conteudo gerado em `dist/` e publicado automaticamente no GitHub Pages

## Estrutura principal

```text
.
|-- index.html
|-- main.js
|-- style.css
|-- vite.config.js
`-- .github/workflows/deploy-pages.yml
```

## Objetivo

Este projeto foi pensado como uma ferramenta simples de apoio a alfabetizacao, incentivando a leitura, a escuta e a compreensao da formacao silabica de palavras em portugues.
