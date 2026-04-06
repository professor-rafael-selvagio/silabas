import "./letras.css";
import { APP_VERSION, recordPageVisit, recordSongPlay } from "./app-data.js";

const lessonGrid = document.querySelector("#lesson-grid");
const lessonTitle = document.querySelector("#lesson-title");
const lessonDescription = document.querySelector("#lesson-description");
const lettersButton = document.querySelector("#letters-btn");
const syllablesButton = document.querySelector("#syllables-btn");
const versionLabel = document.querySelector(".page-version");
const musicButtons = document.querySelectorAll("[data-song]");
const musicModal = document.querySelector("#music-modal");
const closeMusicModalButton = document.querySelector("#close-music-modal");
const musicModalTitle = document.querySelector("#music-modal-title");
const musicPlayer = document.querySelector("#music-player");
const musicLyrics = document.querySelector("#music-lyrics");

const letters = [
  "A", "B", "C", "D", "E", "F", "G",
  "H", "I", "J", "K", "L", "M", "N",
  "O", "P", "Q", "R", "S", "T", "U",
  "V", "W", "X", "Y", "Z",
];

const syllableRows = [
  ["BA", "BE", "BI", "BO", "BU"],
  ["CA", "CE", "CI", "CO", "CU"],
  ["DA", "DE", "DI", "DO", "DU"],
  ["FA", "FE", "FI", "FO", "FU"],
  ["GA", "GE", "GI", "GO", "GU"],
  ["HA", "HE", "HI", "HO", "HU"],
  ["JA", "JE", "JI", "JO", "JU"],
  ["KA", "KE", "KI", "KO", "KU"],
  ["LA", "LE", "LI", "LO", "LU"],
  ["MA", "ME", "MI", "MO", "MU"],
  ["NA", "NE", "NI", "NO", "NU"],
  ["PA", "PE", "PI", "PO", "PU"],
  ["QUA", "QUE", "QUI", "QUO", "QUU"],
  ["RA", "RE", "RI", "RO", "RU"],
  ["SA", "SE", "SI", "SO", "SU"],
  ["TA", "TE", "TI", "TO", "TU"],
  ["VA", "VE", "VI", "VO", "VU"],
  ["WA", "WE", "WI", "WO", "WU"],
  ["XA", "XE", "XI", "XO", "XU"],
  ["YA", "YE", "YI", "YO", "YU"],
  ["ZA", "ZE", "ZI", "ZO", "ZU"],
];

const lessonConfig = {
  letters: {
    title: "Letras maiúsculas e minúsculas",
    description: "Veja cada letra grande e pequena.",
    items: letters,
    layout: "grid",
  },
  syllables: {
    title: "Sílabas maiúsculas e minúsculas",
    description: "Veja as sílabas organizadas em linhas por família.",
    items: syllableRows,
    layout: "rows",
  },
};

const songCatalog = {
  alfabeto: {
    title: "Alfabeto",
    audioUrl: new URL("./audio/alfabeto.mp3", import.meta.url),
    lyricsUrl: new URL("./audio/alfabeto.txt", import.meta.url),
  },
  abelha: {
    title: "Abelha",
    audioUrl: new URL("./audio/abelha.mp3", import.meta.url),
    lyricsUrl: new URL("./audio/abelha.txt", import.meta.url),
  },
  trembabe: {
    title: "Trem Babê",
    audioUrl: new URL("./audio/trembabe.mp3", import.meta.url),
    lyricsUrl: new URL("./audio/trembabe.txt", import.meta.url),
  },
};

function speakText(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.text = text.toLocaleLowerCase("pt-BR");
  utterance.lang = "pt-BR";
  utterance.rate = 0.82;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

function createCard(text) {
  const card = document.createElement("button");
  card.className = "lesson-card";
  card.type = "button";
  card.setAttribute("aria-label", `Ouvir ${text}`);
  card.addEventListener("click", () => {
    speakText(text);
  });

  const uppercase = document.createElement("div");
  uppercase.className = "lesson-main";
  uppercase.textContent = text;

  const lowercase = document.createElement("div");
  lowercase.className = "lesson-sub";
  lowercase.textContent = text.toLocaleLowerCase("pt-BR");

  card.append(uppercase, lowercase);
  return card;
}

function renderGrid(items) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    fragment.append(createCard(item));
  });
  lessonGrid.append(fragment);
}

function renderRows(rows) {
  const fragment = document.createDocumentFragment();

  rows.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "lesson-row";

    row.forEach((item) => {
      rowElement.append(createCard(item));
    });

    fragment.append(rowElement);
  });

  lessonGrid.append(fragment);
}

function setActiveLesson(mode) {
  const config = lessonConfig[mode];

  lettersButton.classList.toggle("is-active", mode === "letters");
  syllablesButton.classList.toggle("is-active", mode === "syllables");

  lessonTitle.textContent = config.title;
  lessonDescription.textContent = config.description;
  lessonGrid.innerHTML = "";
  lessonGrid.classList.toggle("is-rows", config.layout === "rows");
  lessonGrid.classList.toggle("is-grid", config.layout !== "rows");

  if (config.layout === "rows") {
    renderRows(config.items);
    return;
  }

  renderGrid(config.items);
}

async function openSongModal(songKey) {
  const song = songCatalog[songKey];
  if (!song) {
    return;
  }

  recordSongPlay(song.title);
  musicModalTitle.textContent = song.title;
  musicPlayer.src = song.audioUrl.href;
  musicPlayer.load();
  musicLyrics.textContent = "Carregando letra...";
  musicModal.hidden = false;
  document.body.classList.add("is-modal-open");

  try {
    const response = await fetch(song.lyricsUrl.href);
    if (!response.ok) {
      throw new Error("Falha ao carregar a letra.");
    }

    musicLyrics.textContent = await response.text();
  } catch {
    musicLyrics.textContent = "Não foi possível carregar a letra desta música.";
  }
}

function closeSongModal() {
  musicModal.hidden = true;
  musicPlayer.pause();
  musicPlayer.currentTime = 0;
  musicPlayer.removeAttribute("src");
  musicPlayer.load();
  document.body.classList.remove("is-modal-open");
}

lettersButton.addEventListener("click", () => {
  setActiveLesson("letters");
});

syllablesButton.addEventListener("click", () => {
  setActiveLesson("syllables");
});

musicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openSongModal(button.dataset.song);
  });
});

closeMusicModalButton.addEventListener("click", closeSongModal);

musicModal.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.dataset.closeModal === "true") {
    closeSongModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !musicModal.hidden) {
    closeSongModal();
  }
});

setActiveLesson("letters");
recordPageVisit("letras");
versionLabel.textContent = `Versão atual da interface: ${APP_VERSION}`;
