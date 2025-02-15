const messageElement = document.getElementById("message");
const messageContentElement = messageElement.querySelector("#message .content");
const reloadButton = messageElement.querySelector("button");

reloadButton.onclick = reloadPage;

function showMessage(message, type) {
  messageContentElement.innerHTML = message;
  if (type) {
    messageElement.setAttribute("class", "");
    messageElement.classList.add(type);
  }
}

export function showBrokenRuleMessage(rule) {
  if (rule === "WORD_TOO_SHORT") {
    alert("🙄 Esa palabra es muy corta.");
    return;
  }
  alert("📏 Aún no sabes las reglas?");
}

export function showWinMessage(gameState) {
  if (gameState.currentTry === 0) {
    showMessage(
      "⛳Hoyo en uno! 🎰 Qué suerte! No creo que puedas hacerlo otra vez.",
      "success"
    );
  } else if (gameState.currentTry === 3) {
    showMessage("Uff!🥶 Ganaste! Puedes hacerlo mejor.", "success");
  } else if (gameState.currentTry === 4) {
    showMessage("🐸 Ganaste por los pelos de una rana calva!!😅", "success");
  } else {
    showMessage("Ganaste!🥳 Podrás lograrlo otra vez?", "success");
  }
}

export function showLoseMessage(gameState) {
  showMessage("¡Perdiste! JA JA! 🤡, acepta para perder de nuevo.", "defeat");
}

function reloadPage() {
  window.location.reload();
}
