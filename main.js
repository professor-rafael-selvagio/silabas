import "./style.css";
import Hypher from "hypher";
import portuguese from "hyphenation.pt";

const syllableEngine = new Hypher({
  ...portuguese,
  leftmin: 1,
  rightmin: 1,
});

const input = document.querySelector("#sentence-input");
const processButton = document.querySelector("#process-btn");
const speakButton = document.querySelector("#speak-btn");
const fullscreenButton = document.querySelector("#fullscreen-btn");
const output = document.querySelector("#output");
const status = document.querySelector("#status");

const wordRegex = /[\p{L}\p{M}]+(?:['-][\p{L}\p{M}]+)*/gu;

function cancelSpeech() {
  window.speechSynthesis.cancel();
}

function speakText(text) {
  if (!text.trim()) {
    status.textContent = "Digite uma frase para ouvir.";
    return;
  }

  cancelSpeech();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.82;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

function splitWord(word) {
  const syllables = syllableEngine.hyphenate(word);
  return syllables.length ? syllables : [word];
}

function tokenizeSentence(sentence) {
  const tokens = [];
  let lastIndex = 0;

  for (const match of sentence.matchAll(wordRegex)) {
    const [word] = match;
    const index = match.index ?? 0;

    if (index > lastIndex) {
      tokens.push({
        type: "text",
        value: sentence.slice(lastIndex, index),
      });
    }

    tokens.push({
      type: "word",
      value: word,
      syllables: splitWord(word),
    });

    lastIndex = index + word.length;
  }

  if (lastIndex < sentence.length) {
    tokens.push({
      type: "text",
      value: sentence.slice(lastIndex),
    });
  }

  return tokens;
}

function renderSentence() {
  const sentence = input.value.trim();
  output.innerHTML = "";

  if (!sentence) {
    status.textContent = "Digite uma frase em português para separar as sílabas.";
    output.innerHTML = '<p class="placeholder">A frase separada aparecerá aqui.</p>';
    return;
  }

  const tokens = tokenizeSentence(sentence);
  const fragment = document.createDocumentFragment();

  for (const token of tokens) {
    if (token.type === "text") {
      fragment.append(document.createTextNode(token.value));
      continue;
    }

    const wordWrapper = document.createElement("span");
    wordWrapper.className = "word";

    token.syllables.forEach((syllable, index) => {
      const syllableButton = document.createElement("button");
      syllableButton.type = "button";
      syllableButton.className = "syllable";
      syllableButton.textContent = syllable;
      syllableButton.setAttribute("aria-label", `Ouvir sílaba ${syllable}`);
      syllableButton.addEventListener("click", () => {
        status.textContent = `Reproduzindo a sílaba "${syllable}".`;
        speakText(syllable);
      });
      wordWrapper.append(syllableButton);

      if (index < token.syllables.length - 1) {
        const hyphen = document.createElement("span");
        hyphen.className = "hyphen";
        hyphen.textContent = "-";
        wordWrapper.append(hyphen);
      }
    });

    fragment.append(wordWrapper);
  }

  output.append(fragment);
  status.textContent = "Frase processada. Toque em uma sílaba ou no botão de áudio.";
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
    fullscreenButton.textContent = "Sair da tela cheia";
    status.textContent = "Modo tela cheia ativado.";
    return;
  }

  await document.exitFullscreen();
  fullscreenButton.textContent = "Tela cheia";
  status.textContent = "Modo tela cheia desativado.";
}

document.addEventListener("fullscreenchange", () => {
  fullscreenButton.textContent = document.fullscreenElement
    ? "Sair da tela cheia"
    : "Tela cheia";
});

processButton.addEventListener("click", renderSentence);
speakButton.addEventListener("click", () => {
  status.textContent = "Reproduzindo a frase completa.";
  speakText(input.value);
});
fullscreenButton.addEventListener("click", () => {
  toggleFullscreen().catch(() => {
    status.textContent = "Seu navegador bloqueou a tela cheia.";
  });
});

input.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    renderSentence();
  }
});

renderSentence();
