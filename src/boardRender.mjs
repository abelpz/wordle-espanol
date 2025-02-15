export function addLetterToBoard(letter, gameState) {
  updateLetter(gameState.currentTry, gameState.currentWord.length - 1, letter);
}

export function removeLetterFromBoard(gameState) {
  updateLetter(gameState.currentTry, gameState.currentWord.length, "");
}

export function updateWordInBoard(word, gameState) {
  const currentRow = getCurrentRow(gameState.currentTry);

  const emojiElement = document.querySelector(".emoji");

  switch (gameState.currentTry) {
    case 0:
      emojiElement.innerHTML = "🤓";
      break;
    case 1:
      emojiElement.innerHTML = "🙄";
      break;
    case 2:
      emojiElement.innerHTML = "😎";
      break;
    case 3:
      emojiElement.innerHTML = "🤡";
      break;
    case 4:
      emojiElement.innerHTML = "🥶";
      break;
    default:
      emojiElement.innerHTML = "🤓";
  }

  word.letters.forEach((letter, pos) => {
    const currentLetterElement = currentRow.children[pos];
    currentLetterElement.classList.add(letter.state);
  });
}

function getCurrentRow(index) {
  const rows = document.querySelectorAll(".board .row");
  return rows[index];
}

function updateLetter(rowIndex, letterPos, newLetter) {
  const currentRow = getCurrentRow(rowIndex);
  const currentLetterElement = currentRow.children[letterPos];
  currentLetterElement.innerHTML = newLetter;
}
