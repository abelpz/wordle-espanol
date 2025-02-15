import "./styles.css";
import { setupGame } from "./gameLogic.mjs";
import {
  addLetterToBoard,
  removeLetterFromBoard,
  updateWordInBoard,
} from "./boardRender.mjs";
import {
  showBrokenRuleMessage,
  showWinMessage,
  showLoseMessage,
} from "./gameMessages.mjs";

const game = setupGame({
  onPushLetter: addLetterToBoard,
  onPopLetter: removeLetterFromBoard,
  onSubmitWord: updateWordInBoard,
  onBreakRule: showBrokenRuleMessage,
  onWinGame: showWinMessage,
  onLoseGame: showLoseMessage,
});

game.start();
