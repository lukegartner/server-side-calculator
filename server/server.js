const express = require("express");
const PORT = 8000;
let app = express();

// Static page
app.use(express.static("server/public/"));
// json middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
