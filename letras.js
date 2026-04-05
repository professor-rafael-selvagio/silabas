import "./letras.css";

const lessonGrid = document.querySelector("#lesson-grid");
const lessonTitle = document.querySelector("#lesson-title");
const lessonDescription = document.querySelector("#lesson-description");
const lettersButton = document.querySelector("#letters-btn");
const syllablesButton = document.querySelector("#syllables-btn");

const letters = [
  "A", "B", "C", "D", "E", "F", "G",
  "H", "I", "J", "L", "M", "N", "O",
  "P", "Q", "R", "S", "T", "U", "V",
  "X", "Z",
];

const syllables = [
  "BA", "BE", "BI", "BO", "BU",
  "CA", "CE", "CI", "CO", "CU",
  "DA", "DE", "DI", "DO", "DU",
  "FA", "FE", "FI", "FO", "FU",
  "LA", "LE", "LI", "LO", "LU",
  "MA", "ME", "MI", "MO", "MU",
  "NA", "NE", "NI", "NO", "NU",
  "PA", "PE", "PI", "PO", "PU",
  "SA", "SE", "SI", "SO", "SU",
  "TA", "TE", "TI", "TO", "TU",
  "VA", "VE", "VI", "VO", "VU",
];

const lessonConfig = {
  letters: {
    title: "Letras maiúsculas e minúsculas",
    description: "Veja cada letra grande e pequena.",
    items: letters,
  },
  syllables: {
    title: "Sílabas maiúsculas e minúsculas",
    description: "Veja sílabas em letra grande e letra pequena.",
    items: syllables,
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

function setActiveLesson(mode) {
  const config = lessonConfig[mode];

  lettersButton.classList.toggle("is-active", mode === "letters");
  syllablesButton.classList.toggle("is-active", mode === "syllables");

  lessonTitle.textContent = config.title;
  lessonDescription.textContent = config.description;
  lessonGrid.innerHTML = "";

  const fragment = document.createDocumentFragment();
  config.items.forEach((item) => {
    fragment.append(createCard(item));
  });

  lessonGrid.append(fragment);
}

lettersButton.addEventListener("click", () => {
  setActiveLesson("letters");
});

syllablesButton.addEventListener("click", () => {
  setActiveLesson("syllables");
});

setActiveLesson("letters");
