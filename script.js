// Global variables
let displayB = "0",
  number1 = 0,
  number2 = null,
  isWaitingNumber2 = true, // Aux variable to check number input
  operator = "",
  finished = 0; // Aux variable to check if operation was done by equal btn
const keyboard = document.querySelector(".keyboard");
const displayBottom = document.querySelector(".display-bottom");
const displayTop = document.querySelector(".display-top");
const formatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 10, // Limiting decimals to not cause errors such as 0.00000002
  minimumFractionDigits: 0, // Limiting to not show decimals if there is none
});

// Format display when using ',' / '.'
function formatDisplay(value) {
  // Verify if there is a number
  if (value === "" || value === "-") return "0";

  let localNumber = parseFloat(value);
  let formattedResult = formatter.format(localNumber);

  // Verify if the number includes '.' but the formatted number doesn`t includes ','
  // Condition to show ',' when input zeros after
  if (value.includes(".")) {
    const parts = value.split(".");
    return formatter.format(parseFloat(parts[0])) + "," + parts[1];
  }

  return formattedResult;
}

// Display operation at displayTop and result at displayBottom, both formatted in pt-BR
function displayOperation(n1, n2, op, result) {
  const n1Formatted = formatter.format(n1);
  const n2Formatted = formatter.format(n2);
  const resultFormatted = formatter.format(result);

  // Check if was operated by equal btn
  if (finished == 1)
    displayTop.textContent = `${n1Formatted} ${op} ${n2Formatted} =`;
  displayBottom.textContent = resultFormatted;
}

// Clear display and data
function clear() {
  displayB = "0";
  displayBottom.textContent = displayB;
  displayTop.textContent = "";
  number1 = 0;
  number2 = null;
  isWaitingNumber2 = true;
  operator = "";
}

function operate(n1, n2, op) {
  let result = 0;
  switch (op) {
    case "+":
      result = n1 + n2;
      displayOperation(number1, number2, op, result);
      break;

    case "-":
      result = n1 - n2;
      displayOperation(number1, number2, op, result);
      break;

    case "/":
      // Division by 0
      if (n2 == 0) {
        displayBottom.textContent = `Result Undefined`;
        result = 0;
      } else {
        result = n1 / n2;
        displayOperation(number1, number2, op, result);
      }
      break;

    case "x":
      result = n1 * n2;
      displayOperation(number1, number2, op, result);
      break;

    // If there is no number2, result equals number1
    default:
      result = formatter.format(number1);
      displayTop.textContent = `${result} =`;
      displayBottom.textContent = result;
      break;
  }

  displayB = result;
}

// Calculator keyboard event listener
keyboard.addEventListener("click", (event) => {
  const target = event.target;
  const type = target.dataset.type;
  const btnValue = target.innerText;

  // Verify if what was clicked is a button
  if (target.tagName !== "BUTTON") return;

  switch (type) {
    case "number":
      // Verify if an operation has finished to clear displayTop and start a new operation
      if (finished == 1 && displayTop.textContent !== "") {
        displayB = "";
        operator = "";
        number2 = null;
        displayTop.textContent = "";
      }

      // Verify first value to not keep adding 0
      if (displayB == "0") displayB = "";

      // Verify if is number2 input
      if ((number2 == null || isWaitingNumber2) && operator !== "") {
        number2 = 0;
        isWaitingNumber2 = false;
        displayB = "";
      }

      // Concat button value and show formatted on displayBottom
      displayB += btnValue;
      displayBottom.textContent = formatDisplay(displayB);
      break;

    case "operator":
      // Check if there is two numbers and an operator to operate
      if (
        number2 !== null &&
        operator !== "" &&
        finished == 0 &&
        !isWaitingNumber2
      ) {
        number2 = parseFloat(displayB);
        operate(number1, number2, operator);
        isWaitingNumber2 = true;
      }

      // Get number1 and operator values, display and reset finished aux variable
      number1 = parseFloat(displayB);
      operator = btnValue;
      displayTop.textContent = `${formatter.format(number1)} ${btnValue}`;
      finished = 0;
      break;

    case "clear":
      clear();
      break;

    case "delete":
      // Delete last character
      displayB = displayB.slice(0, -1);

      // Verify if there is no more character
      if (displayB === "" || displayB === "-") displayB = "0";
      displayBottom.textContent = formatDisplay(displayB);
      break;

    case "dot":
      // Verify if there is a dot
      if (toString(displayB).includes(".")) break;

      // Verify if an operation has finished to clear displayTop and start a new operation
      if (operator == "" && displayTop.textContent !== "") {
        displayB = "0";
        operator = "";
        number2 = null;
        displayTop.textContent = "";
      }

      // Verify if it is input number2
      if ((number2 == null || isWaitingNumber2) && operator !== "") {
        isWaitingNumber2 = 0;
        displayB = "0";
      }
      displayB += btnValue;
      displayBottom.textContent = formatDisplay(displayB);
      break;

    case "equal":
      // Check if there is no number2 or user keeps pressing equal btn multiple times in sequence
      if (operator == "" || finished == 1) number1 = parseFloat(displayB);
      else number2 = parseFloat(displayB);
      finished = 1;
      operate(number1, number2, operator);
      isWaitingNumber2 = true;
      break;
  }
});
