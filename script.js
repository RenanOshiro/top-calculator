function operate(n1, n2, op) {}

let number = "";
const keyboard = document.querySelector(".keyboard");
const displayBottom = document.querySelector(".display-bottom");

keyboard.addEventListener("click", (event) => {
  // Verifica se o que foi clicado foi realmente um botão
  const target = event.target;
  const type = target.dataset.type;

  if (target.tagName !== "BUTTON") return;

  switch (type) {
    case "number":
      const valor = target.innerText;

      if (number == "0") number = "";
      number += valor;
      displayBottom.textContent = number;
      break;

    case "clear":
      number = "0";
      displayBottom.textContent = number;
  }
});
