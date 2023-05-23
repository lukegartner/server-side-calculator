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

    // Check for square root
    if (expressionToEvaluate[1] === "√") {
      let result = Math.sqrt(expressionToEvaluate[0]);
      expressionToEvaluate.splice(0, 2, result);
    }
  }

  return expressionToEvaluate[0];
};

module.exports = evaluateExpression;
