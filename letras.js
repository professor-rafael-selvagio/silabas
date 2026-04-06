import "./letras.css";

const lessonGrid = document.querySelector("#lesson-grid");
const lessonTitle = document.querySelector("#lesson-title");
const lessonDescription = document.querySelector("#lesson-description");
const lettersButton = document.querySelector("#letters-btn");
const syllablesButton = document.querySelector("#syllables-btn");

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

lettersButton.addEventListener("click", () => {
  setActiveLesson("letters");
});

syllablesButton.addEventListener("click", () => {
  setActiveLesson("syllables");
});

setActiveLesson("letters");
