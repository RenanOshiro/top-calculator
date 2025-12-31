function operate(n1, n2, op) {
  let result = 0;
  switch (op) {
    case "+":
      result = n1 + n2;
      displayTop.textContent = `${number1} ${op} ${number2} =`;
      displayBottom.textContent = result;
      break;

    case "-":
      result = n1 - n2;
      displayTop.textContent = `${number1} ${op} ${number2} =`;
      displayBottom.textContent = result;
      break;

    case "/":
      result = n1 / n2;
      displayTop.textContent = `${number1} ${op} ${number2} =`;
      displayBottom.textContent = result;
      break;

    case "x":
      result = n1 * n2;
      displayTop.textContent = `${number1} ${op} ${number2} =`;
      displayBottom.textContent = result;
      break;

    default:
      result = n1;
      displayTop.textContent = `${number1} ${op}`;
      displayBottom.textContent = result;
      break;
  }
  displayB = result;
  number2 = null;
}

let displayB = "0",
  displayT = "",
  number1 = 0,
  number2 = null,
  op = "";
const keyboard = document.querySelector(".keyboard");
const displayBottom = document.querySelector(".display-bottom");
const displayTop = document.querySelector(".display-top");

keyboard.addEventListener("click", (event) => {
  // Verifica se o que foi clicado foi realmente um botão
  const target = event.target;
  const type = target.dataset.type;
  const btnValue = target.innerText;

  if (target.tagName !== "BUTTON") return;

  switch (type) {
    case "number":
      if (displayB == "0") displayB = "";
      if (number2 == null && op !== "") {
        number2 = 0;
        displayB = "";
      }
      displayB += btnValue;
      displayBottom.textContent = displayB;
      break;

    case "operator":
      number1 = parseFloat(displayB);
      op = btnValue;
      if (number2 !== null) {
        operate(number1, number2, op);
      } else {
        displayTop.textContent = `${number1} ${btnValue}`;
      }
      break;

    case "clear":
      displayB = "0";
      displayBottom.textContent = displayB;
      displayT = "";
      displayTop.textContent = displayT;
      number1 = 0;
      number2 = null;
      op = "";
      break;

    case "equal":
      if (op == "") {
        number1 = parseFloat(displayB);
        displayTop.textContent = `${number1} ${btnValue}`;
      } else {
        number2 = parseFloat(displayB);
      }
      operate(number1, number2, op);
      break;
  }
});
