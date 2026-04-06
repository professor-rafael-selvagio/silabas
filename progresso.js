import { APP_VERSION, loadProgressData, recordPageVisit, saveProgressData } from "./app-data.js";

const versionLabel = document.querySelector(".page-version");
const statPhrases = document.querySelector("#stat-phrases");
const statSyllables = document.querySelector("#stat-syllables");
const statSongs = document.querySelector("#stat-songs");
const statFavorites = document.querySelector("#stat-favorites");
const recentPhrases = document.querySelector("#recent-phrases");
const favoritePhrases = document.querySelector("#favorite-phrases");
const visitedPages = document.querySelector("#visited-pages");
const recentSongs = document.querySelector("#recent-songs");
const resetProgressButton = document.querySelector("#reset-progress-btn");

function fillList(element, items, emptyText) {
  element.innerHTML = "";
  const values = items.length ? items : [emptyText];
  values.forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    element.append(item);
  });
}

function renderProgress() {
  const progress = loadProgressData();
  statPhrases.textContent = String(progress.totals.phrasesProcessed);
  statSyllables.textContent = String(progress.totals.syllableClicks);
  statSongs.textContent = String(progress.totals.songPlays);
  statFavorites.textContent = String(progress.favoritePhrases.length);

  fillList(recentPhrases, progress.recentPhrases, "Nenhuma frase registrada ainda.");
  fillList(favoritePhrases, progress.favoritePhrases, "Nenhuma frase favorita ainda.");
  fillList(visitedPages, progress.visitedPages, "Nenhuma página registrada ainda.");
  fillList(recentSongs, progress.recentSongs, "Nenhuma música aberta ainda.");
}

resetProgressButton.addEventListener("click", () => {
  saveProgressData({
    totals: {
      phrasesProcessed: 0,
      randomShortUsed: 0,
      randomLongUsed: 0,
      syllableClicks: 0,
      songPlays: 0,
      pageVisits: 0,
    },
    lastTheme: "all",
    lastDifficulty: "easy",
    recentPhrases: [],
    favoritePhrases: [],
    visitedPages: ["progresso"],
    recentSongs: [],
  });
  renderProgress();
});

recordPageVisit("progresso");
versionLabel.textContent = `Versão atual da interface: ${APP_VERSION}`;
renderProgress();
