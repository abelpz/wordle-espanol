import { words } from "./wordBank.js";

export function setupGame({
  onPushLetter,
  onPopLetter,
  onSubmitWord,
  onBreakRule,
  onWinGame,
  onLoseGame,
}) {
  const rightWord = getRandomWord().toUpperCase();
  console.log(rightWord);

  const gameSetup = {
    maxTries: 4,
  };

  let gameState = {
    currentWord: [],
    currentTry: 0,
    gameOver: false,
  };

  const onKeyPressed = (event) => {
    if (gameState.gameOver) return;

    const pressedKey = event.key;
    const validLetters = /^[A-Za-z]$/;

    const canInsertLetter = gameState.currentWord.length < rightWord.length;
    const userPressedValidLetter = validLetters.test(pressedKey);

    if (canInsertLetter && userPressedValidLetter) {
      const pressedLetter = pressedKey.toUpperCase();
      gameState.currentWord.push(pressedLetter);
      onPushLetter(pressedLetter, gameState);
    }

    const userPressedBackspace = pressedKey === "Backspace";
    const canDeleteLetter = gameState.currentWord.length > 0;

    if (canDeleteLetter && userPressedBackspace) {
      gameState.currentWord.pop();
      onPopLetter(gameState);
    }

    const userPressedEnter = pressedKey === "Enter";

    if (userPressedEnter) {
      if (canInsertLetter) {
        onBreakRule("WORD_TOO_SHORT");
        return;
      }
      if (gameState.currentWord.length === rightWord.length) {
        const currentWordString = gameState.currentWord.join("");
        gameState.currentWord.length = 0;

        const checkedWord = checkWord(currentWordString, rightWord);

        onSubmitWord(checkedWord, gameState);

        if (checkedWord.matched === true) {
          gameOver = true;
          onWinGame(gameState);
          stopGame();
          return;
        }

        const ranOutOfTries = gameState.currentTry === gameSetup.maxTries;

        if (ranOutOfTries && !checkedWord.matched) {
          gameOver = true;
          onLoseGame(gameState);
          stopGame();
          return;
        }

        gameState.currentTry++;
      }
    }
  };

  function startGame() {
    document.addEventListener("keyup", onKeyPressed);
  }

  function stopGame() {
    gameState = {
      currentWord: [],
      currentTry: 0,
      gameOver: false,
    };
    document.removeEventListener("keyup", onKeyPressed);
  }

  return {
    start: startGame,
    stop: stopGame,
  };
}

function getRandomWord() {
  const wordIndex = Math.round(Math.random() * words.length);
  return words[wordIndex];
}

function getState(letter, pos, rightWord) {
  if (rightWord[pos] === letter) {
    return "green";
  }
  if (rightWord.includes(letter)) {
    return "yellow";
  }
  return "gray";
}

function checkWord(userWord, rightWord) {
  if (userWord.length !== rightWord.length)
    throw new Error("La palabra no es suficientemente larga.", userWord);

  return {
    matched: userWord === rightWord,
    letters: userWord.split("").map((letter, pos) => ({
      letter,
      state: getState(letter, pos, rightWord),
    })),
  };
}
