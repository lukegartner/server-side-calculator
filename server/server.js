const express = require("express");
const PORT = process.env.PORT || 8000;
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

  res.status(200).send(
    calculations.map((calculation) => {
      const result = evaluateExpression(calculation);
      const expression = `${calculation.join(" ")} = ${result}`;
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
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

// Delete History
app.delete("/calculations", (req, res) => {
  calculations = [];
  res.send(204);
});
