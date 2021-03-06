// npm install express

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

const testData = { a: 1, b: 2, c: 3 };
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server Response Success");
});
app.get("/test", (req, res) => {
  console.log("start");
  res.send(JSON.stringify(testData));
});
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
