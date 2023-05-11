const express = require("express");
const PORT = 8000;
let app = express();

// require modules
const evaluateExpression = require("./modules/evaluateExpression.js");

// Static page
app.use(express.static("server/public/"));
// json middleware
app.use(express.json());

// GET calculations
app.get("/calculations", (req, res) => {
  console.log(`Handling ${req.method}, ${req.url}`);

  res.send(
    calculations.map(({ num1, num2, operation }) => {
      const result = evaluateExpression(num1, num2, operation);
      const expression = `${num1} ${operation} ${num2} = ${result}`;
      return { result, expression };
    })
  );
});

// POST calculation
let calculations = [];
app.post("/calculations", (req, res) => {
  console.log("new calculation", req.body);
  calculations.push(req.body);
  console.log("calculations", calculations);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
