const login = require("./api/login");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

const testData = { a: 1, b: 2, c: 3 };
app.use(cors());
app.use(express.json());
console.log(app.route("db.json"));
app.get("/", (req, res) => {
  res.send("Server Response Success");
});
app.get("/test", (req, res) => {
  console.log("start");
  res.send(JSON.stringify(testData));
});

app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
