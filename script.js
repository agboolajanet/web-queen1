document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".calculator-buttons button");
    const clearButton = document.getElementById("clear");

    let currentInput = "";

    const validButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
                          '+', '-', '*', '/', '.', '='];

    buttons.forEach(button => {
      const value = button.textContent;

      if (!validButtons.includes(value)) return;

      button.addEventListener("click", () => {
        if (value === "=") {
          try {
            if (/[\+\-\*\/]$/.test(currentInput)) return; // avoid trailing operators
            currentInput = eval(currentInput).toString();
          } catch {
            currentInput = "Error";
          }
        }
        else {
          const operators = ['+', '-', '*', '/'];
        
          // Prevent multiple operators in a row
          const lastChar = currentInput.slice(-1);
          if (operators.includes(lastChar) && operators.includes(value)) {
            return;
          }
        
          // Prevent multiple decimal points in a number
          if (value === ".") {
            const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
            if (lastNumber.includes(".")) return;
          }
        
          currentInput += value;
        }
        display.value = currentInput;
      });
    });

    clearButton.addEventListener("click", () => {
      currentInput = "";
      display.value = "";
    });
  });
  
// Custom expression evaluator to replace eval()
function evaluateExpression(expression) {
  const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
  if (!tokens) return "Error";

  let result = parseFloat(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNum = parseFloat(tokens[i + 1]);

    if (isNaN(nextNum)) return "Error";

    switch (operator) {
      case "+": result += nextNum; break;
      case "-": result -= nextNum; break;
      case "*": result *= nextNum; break;
      case "/":
        if (nextNum === 0) return "Error";
        result /= nextNum;
        break;
    }
  }

  return result.toString();
}