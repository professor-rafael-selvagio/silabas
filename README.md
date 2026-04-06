# Silabas Divertidas

Aplicativo educacional interativo para apoiar a alfabetizacao infantil com foco em separacao silabica, reconhecimento visual de letras, pratica de leitura e apoio sonoro em portugues do Brasil.

O projeto funciona no navegador e foi pensado para uso simples, visual e direto, tanto por criancas quanto por responsaveis e educadores.

## Acesso

Projeto publicado no GitHub Pages:

* [https://professor-rafael-selvagio.github.io/silabas/](https://professor-rafael-selvagio.github.io/silabas/)

Paginas disponiveis:

* [https://professor-rafael-selvagio.github.io/silabas/](https://professor-rafael-selvagio.github.io/silabas/)
* [https://professor-rafael-selvagio.github.io/silabas/letras.html](https://professor-rafael-selvagio.github.io/silabas/letras.html)
* [https://professor-rafael-selvagio.github.io/silabas/progresso.html](https://professor-rafael-selvagio.github.io/silabas/progresso.html)
* [https://professor-rafael-selvagio.github.io/silabas/responsaveis.html](https://professor-rafael-selvagio.github.io/silabas/responsaveis.html)
* [https://professor-rafael-selvagio.github.io/silabas/sobre.html](https://professor-rafael-selvagio.github.io/silabas/sobre.html)
* [https://professor-rafael-selvagio.github.io/silabas/autor.html](https://professor-rafael-selvagio.github.io/silabas/autor.html)
* [https://professor-rafael-selvagio.github.io/silabas/versions.html](https://professor-rafael-selvagio.github.io/silabas/versions.html)

Repositorio:

* [https://github.com/professor-rafael-selvagio/silabas](https://github.com/professor-rafael-selvagio/silabas)

## Visao Geral

O projeto hoje esta organizado em frentes complementares:

* pagina principal de frases com separacao silabica e sintese de voz
* pagina de letras e familias silabicas
* biblioteca de musicas educativas com player e letras
* pagina de progresso salvo no navegador
* pagina para responsaveis e educadores
* pagina sobre o projeto
* pagina do autor
* pagina publica de versoes

## Funcionalidades

* separacao silabica automatica em portugues
* clique em cada silaba para ouvir a pronuncia
* reproducao da frase completa
* sorteio de frases por nivel e tamanho
* frases organizadas por temas
* modo crianca e modo completo
* colorizacao de silabas
* contraste alto
* fonte amigavel para leitura
* tamanho ajustavel da leitura
* audio automatico ao sortear
* favorito de frases
* frases recentes e estatisticas locais
* tela de letras maiusculas, minusculas e familias silabicas
* musicas educativas com modal, audio e letras em texto
* menu de navegacao com acessos principais e opcoes extras
* pagina do autor com foto, links e QR Codes

## Paginas

### 1. Frases

Arquivo: [index.html](./index.html)

Responsavel por:

* receber a frase digitada
* sortear frases prontas
* separar palavras em silabas
* tocar silabas e frase completa
* salvar preferencias locais
* mostrar progresso local e favoritas

Arquivos relacionados:

* [main.js](./main.js)
* [style.css](./style.css)
* [sentences.js](./sentences.js)
* [app-data.js](./app-data.js)

### 2. Letras e Silabas

Arquivo: [letras.html](./letras.html)

Responsavel por:

* mostrar letras maiusculas e minusculas
* mostrar familias silabicas
* reproduzir audio de letras e silabas
* oferecer musicas educativas de apoio

Arquivos relacionados:

* [letras.js](./letras.js)
* [letras.css](./letras.css)
* audio/alfabeto.mp3
* audio/aeiou.mp3
* audio/abelha.mp3
* audio/bibu.mp3
* audio/rimadosapato.mp3
* audio/trembabe.mp3

### 3. Progresso

Arquivo: [progresso.html](./progresso.html)

Responsavel por:

* exibir frases recentes
* exibir frases favoritas
* mostrar musicas abertas recentemente
* mostrar paginas visitadas
* permitir limpar o progresso local

Arquivos relacionados:

* [progresso.js](./progresso.js)
* [app-data.js](./app-data.js)

### 4. Apoio Institucional

Arquivos:

* [responsaveis.html](./responsaveis.html)
* [sobre.html](./sobre.html)
* [autor.html](./autor.html)
* [versions.html](./versions.html)

Essas paginas cobrem:

* orientacoes para responsaveis
* explicacao do projeto
* autoria, tecnologias e links do autor
* historico de versoes do sistema

## Banco De Frases

As frases ficam em:

* [sentences.js](./sentences.js)

O banco foi organizado por:

* tema
* nivel
* tamanho

Isso permite sorteio mais controlado, manutencao mais simples e expansao futura sem poluir a logica principal do app.

## Persistencia Local

Os dados locais ficam centralizados em:

* [app-data.js](./app-data.js)

Hoje o navegador salva:

* frases processadas
* frases favoritas
* frases recentes
* musicas abertas
* paginas visitadas
* quantidade de silabas tocadas
* preferencias de leitura e visual

Nada disso depende de backend.

## Musicas Educativas

Faixas atualmente integradas:

* Alfabeto
* AEIOU
* Abelha
* Bibu
* Rima do Sapato
* Trem Bebe

Observacao importante:

* as musicas foram criadas com Suno AI
* o autor informou que nao possui direitos comerciais sobre essas faixas
* o uso no projeto deve ser entendido como educacional e demonstrativo

## Acessibilidade

O projeto inclui:

* skip link para pular direto ao conteudo
* estados de foco visiveis
* contraste alto
* fonte amigavel para leitura
* respeito a `prefers-reduced-motion`
* modo crianca com menos distracoes

## Tecnologias Utilizadas

* HTML
* CSS
* JavaScript
* Vite
* Hypher
* hyphenation.pt
* Web Speech API
* VS Code
* Codex

## Requisitos

* Node.js 24 ou superior recomendado
* npm

Ambiente usado mais recentemente neste projeto:

* node v24.14.1
* npm 11.11.0

## Como Executar Localmente

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar o ambiente de desenvolvimento

```bash
npm run dev
```

Como o projeto usa a base `/silabas/`, o acesso local normalmente sera:

* [http://localhost:5173/silabas/](http://localhost:5173/silabas/)

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

Fluxo esperado:

1. fazer commit das alteracoes
2. enviar para a branch `main`
3. o GitHub Pages publica a build automatica

Configuracao principal:

* [vite.config.js](./vite.config.js)

## Estrutura Do Projeto

```text
.
|-- index.html
|-- letras.html
|-- progresso.html
|-- responsaveis.html
|-- sobre.html
|-- autor.html
|-- versions.html
|-- main.js
|-- letras.js
|-- progresso.js
|-- static-page.js
|-- nav-menu.js
|-- app-data.js
|-- sentences.js
|-- style.css
|-- letras.css
|-- extra-pages.css
|-- versions.css
|-- audio/
|-- imagem/
|-- vite.config.js
`-- package.json
```

## Estado Atual

Versao publicada mais recente:

* 1.7.5

Destaques recentes:

* menu principal reorganizado com tres pontinhos para paginas secundarias
* pagina do autor com foto, links e QR Codes
* fechamento automatico do menu apos navegacao
* musicas educativas com letras em modal

## Objetivo Educacional

O foco do projeto e apoiar a alfabetizacao de forma visual, interativa e acessivel, incentivando:

* reconhecimento de letras
* identificacao de silabas
* leitura de palavras e frases
* escuta ativa
* associacao entre escrita e som

## Licenca

O `package.json` esta com `ISC`, mas se quiser pode alinhar com uma licenca mais adequada para o repositorio e conteudos incluidos.
