export const APP_VERSION = "1.7.4";

const progressStorageKey = "silabas.progress.v1";

function normalizeSentence(text) {
  return text.trim().toLocaleUpperCase("pt-BR");
}

function createDefaultProgress() {
  return {
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
    visitedPages: [],
    recentSongs: [],
  };
}

export function loadProgressData() {
  try {
    const raw = localStorage.getItem(progressStorageKey);
    if (!raw) {
      return createDefaultProgress();
    }

    return { ...createDefaultProgress(), ...JSON.parse(raw) };
  } catch {
    localStorage.removeItem(progressStorageKey);
    return createDefaultProgress();
  }
}

export function saveProgressData(progress) {
  localStorage.setItem(progressStorageKey, JSON.stringify(progress));
}

export function updateProgressData(updater) {
  const current = loadProgressData();
  const next = updater(structuredClone(current));
  saveProgressData(next);
  return next;
}

export function recordPageVisit(pageName) {
  return updateProgressData((progress) => {
    progress.totals.pageVisits += 1;
    progress.visitedPages = [
      pageName,
      ...progress.visitedPages.filter((page) => page !== pageName),
    ].slice(0, 8);
    return progress;
  });
}

export function recordPhraseProcessed(sentence, metadata = {}) {
  const normalizedSentence = normalizeSentence(sentence);
  if (!normalizedSentence) {
    return loadProgressData();
  }

  return updateProgressData((progress) => {
    progress.totals.phrasesProcessed += 1;
    progress.lastTheme = metadata.theme ?? progress.lastTheme;
    progress.lastDifficulty = metadata.difficulty ?? progress.lastDifficulty;
    progress.recentPhrases = [
      normalizedSentence,
      ...progress.recentPhrases.filter((phrase) => phrase !== normalizedSentence),
    ].slice(0, 8);
    return progress;
  });
}

export function recordRandomSentence(length) {
  return updateProgressData((progress) => {
    if (length === "short") {
      progress.totals.randomShortUsed += 1;
    } else {
      progress.totals.randomLongUsed += 1;
    }
    return progress;
  });
}

export function recordSyllableClick() {
  return updateProgressData((progress) => {
    progress.totals.syllableClicks += 1;
    return progress;
  });
}

export function toggleFavoritePhrase(sentence) {
  const normalizedSentence = normalizeSentence(sentence);
  if (!normalizedSentence) {
    return loadProgressData();
  }

  return updateProgressData((progress) => {
    const alreadyFavorite = progress.favoritePhrases.includes(normalizedSentence);
    progress.favoritePhrases = alreadyFavorite
      ? progress.favoritePhrases.filter((phrase) => phrase !== normalizedSentence)
      : [normalizedSentence, ...progress.favoritePhrases].slice(0, 12);
    return progress;
  });
}

export function recordSongPlay(songTitle) {
  return updateProgressData((progress) => {
    progress.totals.songPlays += 1;
    progress.recentSongs = [
      songTitle,
      ...progress.recentSongs.filter((song) => song !== songTitle),
    ].slice(0, 6);
    return progress;
  });
}
