import "./style.css";
import Hypher from "hypher";
import portuguese from "hyphenation.pt";
import { sentenceBank, themeConfig } from "./sentences.js";
import {
  APP_VERSION,
  loadProgressData,
  recordPageVisit,
  recordPhraseProcessed,
  recordRandomSentence,
  recordSyllableClick,
  toggleFavoritePhrase,
} from "./app-data.js";

const syllableEngine = new Hypher({
  ...portuguese,
  leftmin: 1,
  rightmin: 1,
});

const input = document.querySelector("#sentence-input");
const processButton = document.querySelector("#process-btn");
const randomShortButton = document.querySelector("#random-short-btn");
const randomLongButton = document.querySelector("#random-long-btn");
const speakButton = document.querySelector("#speak-btn");
const favoriteButton = document.querySelector("#favorite-btn");
const fullscreenButton = document.querySelector("#fullscreen-btn");
const output = document.querySelector("#output");
const status = document.querySelector("#status");
const themeSelect = document.querySelector("#theme-select");
const contrastToggle = document.querySelector("#contrast-toggle");
const dyslexiaToggle = document.querySelector("#dyslexia-toggle");
const autoSpeakToggle = document.querySelector("#auto-speak-toggle");
const colorToggle = document.querySelector("#color-toggle");
const modeToggle = document.querySelector("#mode-toggle");
const themeDescription = document.querySelector("#theme-description");
const encouragement = document.querySelector("#encouragement");
const summaryTheme = document.querySelector("#summary-theme");
const wordCount = document.querySelector("#word-count");
const syllableCount = document.querySelector("#syllable-count");
const focusWord = document.querySelector("#focus-word");
const localPhrasesCount = document.querySelector("#local-phrases-count");
const localSyllablesCount = document.querySelector("#local-syllables-count");
const localFavoritesCount = document.querySelector("#local-favorites-count");
const favoriteList = document.querySelector("#favorite-list");
const recentList = document.querySelector("#recent-list");
const versionLabel = document.querySelector(".app-footer span");
const fontButtons = {
  small: document.querySelector("#font-small-btn"),
  medium: document.querySelector("#font-medium-btn"),
  large: document.querySelector("#font-large-btn"),
};
const difficultyButtons = {
  easy: document.querySelector("#difficulty-easy"),
  medium: document.querySelector("#difficulty-medium"),
  hard: document.querySelector("#difficulty-hard"),
};

const preferencesKey = "silabas.preferences.v1";
const wordRegex = /[\p{L}\p{M}]+(?:['-][\p{L}\p{M}]+)*/gu;
const difficultyNames = {
  easy: "fácil",
  medium: "média",
  hard: "difícil",
};
const fontScaleValues = {
  small: "0.82",
  medium: "1",
  large: "1.18",
};

let selectedDifficulty = "easy";
let selectedTheme = "all";
let selectedFontScale = "medium";
let selectedMode = "full";
let highContrastEnabled = false;
let dyslexiaFontEnabled = false;
let autoSpeakEnabled = false;
let coloredSyllablesEnabled = true;
let lastSentenceByGroup = Object.keys(sentenceBank).reduce((difficultyAccumulator, difficulty) => {
  difficultyAccumulator[difficulty] = Object.keys(themeConfig).reduce((themeAccumulator, theme) => {
    themeAccumulator[theme] = { short: "", long: "" };
    return themeAccumulator;
  }, {});

  return difficultyAccumulator;
}, {});

function cancelSpeech() {
  window.speechSynthesis.cancel();
}

function toDisplayUppercase(text) {
  return text.toLocaleUpperCase("pt-BR");
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
  const syllables = syllableEngine.hyphenate(word.toLocaleLowerCase("pt-BR"));
  const normalizedSyllables = syllables.length ? syllables : [word];
  return normalizedSyllables.map((syllable) => toDisplayUppercase(syllable));
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

function loadPreferences() {
  try {
    const rawPreferences = localStorage.getItem(preferencesKey);
    if (!rawPreferences) {
      return;
    }

    const preferences = JSON.parse(rawPreferences);
    if (preferences.difficulty && difficultyNames[preferences.difficulty]) {
      selectedDifficulty = preferences.difficulty;
    }
    if (preferences.theme && themeConfig[preferences.theme]) {
      selectedTheme = preferences.theme;
    }
    if (preferences.fontScale && fontScaleValues[preferences.fontScale]) {
      selectedFontScale = preferences.fontScale;
    }
    if (preferences.mode === "child" || preferences.mode === "full") {
      selectedMode = preferences.mode;
    }
    highContrastEnabled = Boolean(preferences.highContrastEnabled);
    dyslexiaFontEnabled = Boolean(preferences.dyslexiaFontEnabled);
    autoSpeakEnabled = Boolean(preferences.autoSpeakEnabled);
    coloredSyllablesEnabled = Boolean(preferences.coloredSyllablesEnabled);
  } catch {
    localStorage.removeItem(preferencesKey);
  }
}

function savePreferences() {
  localStorage.setItem(
    preferencesKey,
    JSON.stringify({
      difficulty: selectedDifficulty,
      theme: selectedTheme,
      fontScale: selectedFontScale,
      mode: selectedMode,
      highContrastEnabled,
      dyslexiaFontEnabled,
      autoSpeakEnabled,
      coloredSyllablesEnabled,
    }),
  );
}

function syncFavoriteButton() {
  const progress = loadProgressData();
  const normalizedSentence = input.value.trim().toLocaleUpperCase("pt-BR");
  const isFavorite = normalizedSentence && progress.favoritePhrases.includes(normalizedSentence);
  favoriteButton.classList.toggle("is-active", Boolean(isFavorite));
}

function renderLocalProgress() {
  const progress = loadProgressData();
  localPhrasesCount.textContent = String(progress.totals.phrasesProcessed);
  localSyllablesCount.textContent = String(progress.totals.syllableClicks);
  localFavoritesCount.textContent = String(progress.favoritePhrases.length);

  favoriteList.innerHTML = "";
  recentList.innerHTML = "";

  const favoriteItems = progress.favoritePhrases.length
    ? progress.favoritePhrases
    : ["Nenhuma frase favorita ainda."];
  const recentItems = progress.recentPhrases.length
    ? progress.recentPhrases
    : ["Nenhuma frase processada ainda."];

  favoriteItems.forEach((phrase) => {
    const item = document.createElement("li");
    item.textContent = phrase;
    favoriteList.append(item);
  });

  recentItems.forEach((phrase) => {
    const item = document.createElement("li");
    item.textContent = phrase;
    recentList.append(item);
  });

  syncFavoriteButton();
}

function applyVisualPreferences() {
  document.body.dataset.contrast = highContrastEnabled ? "high" : "normal";
  document.body.dataset.mode = selectedMode;
  document.body.dataset.dyslexiaFont = dyslexiaFontEnabled ? "on" : "off";
  document.documentElement.style.setProperty("--output-font-scale", fontScaleValues[selectedFontScale]);

  Object.entries(fontButtons).forEach(([fontScale, button]) => {
    button.classList.toggle("is-active", fontScale === selectedFontScale);
  });

  contrastToggle.classList.toggle("is-active", highContrastEnabled);
  contrastToggle.setAttribute("aria-pressed", String(highContrastEnabled));
  dyslexiaToggle.classList.toggle("is-active", dyslexiaFontEnabled);
  dyslexiaToggle.setAttribute("aria-pressed", String(dyslexiaFontEnabled));
  autoSpeakToggle.classList.toggle("is-active", autoSpeakEnabled);
  autoSpeakToggle.setAttribute("aria-pressed", String(autoSpeakEnabled));
  colorToggle.classList.toggle("is-active", coloredSyllablesEnabled);
  colorToggle.setAttribute("aria-pressed", String(coloredSyllablesEnabled));
  modeToggle.checked = selectedMode === "full";
  themeSelect.value = selectedTheme;
  summaryTheme.textContent = themeConfig[selectedTheme].label;
  themeDescription.textContent = themeConfig[selectedTheme].description;
  versionLabel.textContent = `Versão atual da interface: ${APP_VERSION}`;
}

function updateDifficultyButtons() {
  Object.entries(difficultyButtons).forEach(([difficulty, button]) => {
    button.classList.toggle("is-active", difficulty === selectedDifficulty);
  });
}

function buildEncouragement(totalWords, totalSyllables) {
  if (totalWords === 0) {
    return "Comece com frases curtas e toque sílaba por sílaba.";
  }

  if (selectedDifficulty === "easy") {
    return "Leia devagar e use o áudio para confirmar cada pedaço da palavra.";
  }

  if (selectedDifficulty === "medium") {
    return totalSyllables > 12
      ? "Boa prática de fluência: leia a frase inteira e depois volte nas sílabas."
      : "Experimente ler a frase e depois tocar apenas nas palavras mais difíceis.";
  }

  return totalWords > 7
    ? "Desafio forte: leia primeiro a frase toda e depois revise as palavras longas."
    : "Tente identificar as sílabas mais complexas antes de ouvir o áudio.";
}

function updateStudySummary(tokens) {
  const wordTokens = tokens.filter((token) => token.type === "word");
  const totalWords = wordTokens.length;
  const totalSyllables = wordTokens.reduce((sum, token) => sum + token.syllables.length, 0);
  const longestWord = wordTokens.reduce((largest, token) => {
    return token.value.length > largest.length ? token.value : largest;
  }, "");

  wordCount.textContent = String(totalWords);
  syllableCount.textContent = String(totalSyllables);
  focusWord.textContent = longestWord ? toDisplayUppercase(longestWord) : "-";
  encouragement.textContent = buildEncouragement(totalWords, totalSyllables);
}

function setDifficulty(difficulty) {
  selectedDifficulty = difficulty;
  updateDifficultyButtons();
  savePreferences();
  encouragement.textContent =
    `Nível ${difficultyNames[difficulty]} selecionado. Escolha uma frase curta ou maior.`;
  status.textContent = `Nível ${difficultyNames[difficulty]} selecionado. Escolha uma frase curta ou maior.`;
}

function getFilteredOptions(length) {
  if (selectedTheme === "all") {
    return Object.entries(sentenceBank[selectedDifficulty]).flatMap(([, groups]) => groups[length]);
  }

  return sentenceBank[selectedDifficulty][selectedTheme][length];
}

function pickRandomSentence(length) {
  const options = getFilteredOptions(length);
  if (options.length === 1) {
    return options[0];
  }

  let nextSentence = options[Math.floor(Math.random() * options.length)];
  while (nextSentence === lastSentenceByGroup[selectedDifficulty][selectedTheme][length]) {
    nextSentence = options[Math.floor(Math.random() * options.length)];
  }

  lastSentenceByGroup[selectedDifficulty][selectedTheme][length] = nextSentence;
  return toDisplayUppercase(nextSentence);
}

function activateSyllable(button) {
  output.querySelectorAll(".syllable.is-playing").forEach((syllableButton) => {
    syllableButton.classList.remove("is-playing");
  });
  button.classList.add("is-playing");
}

function renderSentence({ trackProgress = true } = {}) {
  const sentence = toDisplayUppercase(input.value).trim();
  input.value = sentence;
  output.innerHTML = "";

  if (!sentence) {
    updateStudySummary([]);
    status.textContent = "Digite uma frase em português para separar as sílabas.";
    output.innerHTML = '<p class="placeholder">A frase separada aparecerá aqui.</p>';
    syncFavoriteButton();
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
    wordWrapper.setAttribute("data-word", token.value);

    token.syllables.forEach((syllable, index) => {
      const syllableButton = document.createElement("button");
      syllableButton.type = "button";
      syllableButton.className = "syllable";
      if (coloredSyllablesEnabled) {
        syllableButton.classList.add(`syllable-tone-${index % 4}`);
      }
      syllableButton.textContent = syllable;
      syllableButton.setAttribute("aria-label", `Ouvir sílaba ${syllable}`);
      syllableButton.addEventListener("click", () => {
        activateSyllable(syllableButton);
        recordSyllableClick();
        renderLocalProgress();
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

    wordWrapper.addEventListener("dblclick", () => {
      status.textContent = `Reproduzindo a palavra "${toDisplayUppercase(token.value)}".`;
      speakText(token.value);
    });

    fragment.append(wordWrapper);
  }

  output.append(fragment);
  updateStudySummary(tokens);

  if (trackProgress) {
    recordPhraseProcessed(sentence, {
      theme: selectedTheme,
      difficulty: selectedDifficulty,
    });
    renderLocalProgress();
  } else {
    syncFavoriteButton();
  }

  status.textContent =
    'Frase processada. Toque em uma sílaba, ou dê dois cliques em uma palavra para ouvi-la inteira.';
}

function processRandomSentence(length) {
  recordRandomSentence(length);
  input.value = pickRandomSentence(length);
  renderSentence();
  const themeLabel = themeConfig[selectedTheme].label.toLocaleLowerCase("pt-BR");
  status.textContent =
    `Frase ${length === "short" ? "curta" : "maior"} de nível ${difficultyNames[selectedDifficulty]} sorteada no tema ${themeLabel}.`;

  if (autoSpeakEnabled) {
    speakText(input.value);
  }
}

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
    status.textContent = "Modo tela cheia ativado.";
    return;
  }

  await document.exitFullscreen();
  status.textContent = "Modo tela cheia desativado.";
}

processButton.addEventListener("click", () => {
  renderSentence();
});
randomShortButton.addEventListener("click", () => {
  processRandomSentence("short");
});
randomLongButton.addEventListener("click", () => {
  processRandomSentence("long");
});
speakButton.addEventListener("click", () => {
  status.textContent = "Reproduzindo a frase completa.";
  speakText(input.value);
});
favoriteButton.addEventListener("click", () => {
  const sentence = input.value.trim();
  if (!sentence) {
    status.textContent = "Digite ou sorteie uma frase antes de favoritar.";
    return;
  }

  const progress = toggleFavoritePhrase(sentence);
  renderLocalProgress();
  status.textContent = progress.favoritePhrases.includes(sentence.toLocaleUpperCase("pt-BR"))
    ? "Frase adicionada aos favoritos."
    : "Frase removida dos favoritos.";
});
fullscreenButton.addEventListener("click", () => {
  toggleFullscreen().catch(() => {
    status.textContent = "Seu navegador bloqueou a tela cheia.";
  });
});

themeSelect.addEventListener("change", () => {
  selectedTheme = themeSelect.value;
  applyVisualPreferences();
  savePreferences();
  encouragement.textContent = themeConfig[selectedTheme].description;
  status.textContent = `Tema ${themeConfig[selectedTheme].label.toLocaleLowerCase("pt-BR")} selecionado.`;
});

contrastToggle.addEventListener("click", () => {
  highContrastEnabled = !highContrastEnabled;
  applyVisualPreferences();
  savePreferences();
  status.textContent = highContrastEnabled
    ? "Contraste alto ativado."
    : "Contraste alto desativado.";
});

dyslexiaToggle.addEventListener("click", () => {
  dyslexiaFontEnabled = !dyslexiaFontEnabled;
  applyVisualPreferences();
  savePreferences();
  status.textContent = dyslexiaFontEnabled
    ? "Fonte amigável para leitura ativada."
    : "Fonte amigável para leitura desativada.";
});

autoSpeakToggle.addEventListener("click", () => {
  autoSpeakEnabled = !autoSpeakEnabled;
  applyVisualPreferences();
  savePreferences();
  status.textContent = autoSpeakEnabled
    ? "As frases sorteadas serão lidas automaticamente."
    : "As frases sorteadas não serão lidas automaticamente.";
});

colorToggle.addEventListener("click", () => {
  coloredSyllablesEnabled = !coloredSyllablesEnabled;
  applyVisualPreferences();
  savePreferences();
  renderSentence({ trackProgress: false });
  status.textContent = coloredSyllablesEnabled
    ? "Colorização das sílabas ativada."
    : "Colorização das sílabas desativada.";
});

modeToggle.addEventListener("change", () => {
  selectedMode = modeToggle.checked ? "full" : "child";
  if (selectedMode === "child") {
    selectedDifficulty = "easy";
    selectedTheme = "all";
    selectedFontScale = "large";
    autoSpeakEnabled = true;
    coloredSyllablesEnabled = true;
    updateDifficultyButtons();
  }
  applyVisualPreferences();
  savePreferences();
  status.textContent = selectedMode === "child"
    ? "Modo criança ativado."
    : "Modo completo ativado.";
});

Object.entries(fontButtons).forEach(([fontScale, button]) => {
  button.addEventListener("click", () => {
    selectedFontScale = fontScale;
    applyVisualPreferences();
    savePreferences();
    status.textContent = `Tamanho de leitura ${fontScale === "small" ? "menor" : fontScale === "medium" ? "médio" : "maior"} aplicado.`;
  });
});

difficultyButtons.easy.addEventListener("click", () => {
  setDifficulty("easy");
});
difficultyButtons.medium.addEventListener("click", () => {
  setDifficulty("medium");
});
difficultyButtons.hard.addEventListener("click", () => {
  setDifficulty("hard");
});

input.addEventListener("input", () => {
  input.value = toDisplayUppercase(input.value);
  syncFavoriteButton();
});

input.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    renderSentence();
  }
});

loadPreferences();
recordPageVisit("frases");
updateDifficultyButtons();
applyVisualPreferences();
input.value = toDisplayUppercase(input.value);
renderLocalProgress();
renderSentence({ trackProgress: false });
