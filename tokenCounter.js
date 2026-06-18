function cleanText(text) {
  return text.trim();
}

function splitIntoWords(text) {
  return text.split(" ");
}

function removeEmptyWords(words) {
  return words.filter(function(word) {
    return word !== "";
  });
}

function estimateTokens(words) {
  return Math.ceil(words.length * 0.75);
}

function countTokens(text) {
  const cleaned = cleanText(text);
  const words = splitIntoWords(cleaned);
  const filtered = removeEmptyWords(words);
  return estimateTokens(filtered);
}

function analyzeText(text) {
  const cleaned = cleanText(text);
  const words = splitIntoWords(cleaned);
  const filtered = removeEmptyWords(words);

  return {
    characters: cleaned.length,
    words: filtered.length,
    tokens: estimateTokens(filtered)
  };
}

// Part 1: Connect to the DOM
const textarea = document.querySelector('#inputText');
const statChars  = document.querySelector('#stat-chars');
const statWords  = document.querySelector('#stat-words');
const statTokens = document.querySelector('#stat-tokens');

textarea.addEventListener('input', function() {
  const analysis = analyzeText(textarea.value);
  statChars.textContent  = 'Characters: ' + analysis.characters;
  statWords.textContent  = 'Words: '      + analysis.words;
  statTokens.textContent = 'Estimated tokens: ' + analysis.tokens;
});

// Part 3: Arrays
const history = [];
const saveBtn     = document.querySelector('#save-btn');
const historyList = document.querySelector('#history-list');

saveBtn.addEventListener('click', function() {
  const analysis = analyzeText(textarea.value);
  analysis.label = 'Snapshot ' + (history.length + 1);
  history.push(analysis);
  renderHistory();
});

function renderHistory() {
  historyList.innerHTML = '';

  history.forEach(function(entry) {
    const li = document.createElement('li');
    li.textContent = entry.label + ' ' + entry.tokens + ' tokens, ' + entry.words + ' words, ' + entry.characters + ' characters';
    historyList.appendChild(li);
  });
}

