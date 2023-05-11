const express = require("express");
const PORT = 8000;
let app = express();

// Static page
app.use(express.static("server/public/"));
// json middleware
app.use(express.json());

// GET calculations
app.get("/calculations", (req, res) => {
  console.log(`Handling ${req.method}, ${req.url}`);
  res.send(calculations);
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
