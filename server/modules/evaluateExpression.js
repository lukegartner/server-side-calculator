// Evaluate Math Expression

const evaluateExpression = (expression) => {
  const expressionToEvaluate = expression.slice();
  while (expressionToEvaluate.length > 1) {
    // Two loops to separate order of operations
    // Multiplication and Division
    while (
      expressionToEvaluate.includes("*") ||
      expressionToEvaluate.includes("/")
    ) {
      for (let i = 0; i < expressionToEvaluate.length; i++) {
        if (expressionToEvaluate[i] === "*") {
          let result =
            Number(expressionToEvaluate[i - 1]) *
            Number(expressionToEvaluate[i + 1]);
          expressionToEvaluate.splice(i - 1, 3, result);
          console.log("exp: /", expressionToEvaluate);
        }
        if (expressionToEvaluate[i] === "/") {
          let result =
            Number(expressionToEvaluate[i - 1]) /
            Number(expressionToEvaluate[i + 1]);
          expressionToEvaluate.splice(i - 1, 3, result);
          console.log("exp: *", expressionToEvaluate);
        }
      }
    }
    // Addition and Subtraction
    for (let i = 0; i < expressionToEvaluate.length; i++) {
      if (expressionToEvaluate[i] === "+") {
        let result =
          Number(expressionToEvaluate[i - 1]) +
          Number(expressionToEvaluate[i + 1]);
        expressionToEvaluate.splice(i - 1, 3, result);
        console.log("exp: +", expressionToEvaluate);
      }
      if (expressionToEvaluate[i] === "-") {
        let result =
          Number(expressionToEvaluate[i - 1]) -
          Number(expressionToEvaluate[i + 1]);
        expressionToEvaluate.splice(i - 1, 3, result);
        console.log("exp: -", expressionToEvaluate);
      }
    }
  }

  return expressionToEvaluate[0];

  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      return num1 / num2;
    case "*":
      return num1 * num2;
    default:
      break;
  }
};

module.exports = evaluateExpression;
