document.addEventListener("DOMContentLoaded", function () {
  // Calculator functionality
  let currentInput = "";
  let currentOperation = null;
  let previousInput = "";
  let calculationResult = "";

  // Get all number buttons
  const numberButtons = document.querySelectorAll(
    ".zero, .number-1, .number-2, .number-3, .number-4, .number-5, .number-6, .number-7, .number-8, .number-9"
  );

  // Get operation buttons
  const divideButton = document.querySelector(".divide");
  const multiplyButton = document.querySelector(".x");
  const minusButton = document.querySelector(".minus");
  const plusButton = document.querySelector(".plus");
  const dotButton = document.querySelector(".dot");
  const clearButton = document.querySelector(".clear");
  const equalButton = document.querySelector(".equal");

  // Add event listeners to number buttons
  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appendNumber(button.textContent);
    });
  });

  // Add event listeners to operation buttons
  if (divideButton)
    divideButton.addEventListener("click", () => setOperation("/"));
  if (multiplyButton)
    multiplyButton.addEventListener("click", () => setOperation("*"));
  if (minusButton)
    minusButton.addEventListener("click", () => setOperation("-"));
  if (plusButton) plusButton.addEventListener("click", () => setOperation("+"));
  if (dotButton) dotButton.addEventListener("click", appendDecimal);
  if (clearButton) clearButton.addEventListener("click", clear);
  if (equalButton) equalButton.addEventListener("click", calculate);

  // Add event listener for keyboard input
  document.addEventListener("keydown", (event) => {
    if (event.key >= "0" && event.key <= "9") {
      appendNumber(event.key);
    } else if (event.key === ".") {
      appendDecimal();
    } else if (
      event.key === "+" ||
      event.key === "-" ||
      event.key === "*" ||
      event.key === "/"
    ) {
      setOperation(event.key);
    } else if (event.key === "Enter") {
      calculate();
    } else if (event.key === "Escape") {
      clear();
    }
  });

  // Functions
  function appendNumber(number) {
    if (calculationResult !== "") {
      currentInput = number;
      calculationResult = "";
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function appendDecimal() {
    if (currentInput.includes(".")) return;
    currentInput = currentInput === "" ? "0." : currentInput + ".";
    updateDisplay();
  }

  function setOperation(operation) {
    if (currentInput === "") return;

    if (previousInput !== "") {
      calculate();
    }

    currentOperation = operation;
    previousInput = currentInput;
    currentInput = "";
  }

  function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    currentInput = computation.toString();
    calculationResult = currentInput;
    currentOperation = null;
    previousInput = "";

    updateDisplay();
  }

  function clear() {
    currentInput = "";
    previousInput = "";
    currentOperation = null;
    calculationResult = "";
    updateDisplay();
  }
  function updateDisplay() {
    // Update the display with the current input
    // and limit the length to 10 characters
    const display = document.querySelector(".display");
    if (display) {
      display.value = currentInput;
    }
    if (currentInput.length > 10) {
      currentInput = currentInput.slice(0, 10);
      alert("Maximum input length reached.");
    }
    if (currentInput === "") {
      display.value = "0";
    } else {
      display.value = currentInput;
    }

    console.log("Current input:", currentInput);
  }
});
