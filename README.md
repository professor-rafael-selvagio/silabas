# Silabas Divertidas

Aplicativo educacional interativo para separar frases em silabas, ouvir cada silaba por clique e ler a frase completa com Text-to-Speech.

## Requisitos

- Node.js 20.19+ ou 22.12+ instalado

## Como executar

```bash
npm install
npm run dev
```

Depois, abra no navegador o endereco exibido pelo Vite, normalmente `http://localhost:5173`.

## Como gerar a versao de producao

```bash
npm run build
npm run preview
```

## Publicacao no GitHub Pages

O projeto esta configurado para publicacao em um repositorio chamado `silabas` usando GitHub Pages.

Depois de subir para o GitHub:

1. Abra `Settings > Pages` no repositorio.
2. Em `Build and deployment`, selecione `GitHub Actions`.
3. O workflow em `.github/workflows/deploy-pages.yml` fara o build e o deploy automaticamente a cada push na branch `main`.
