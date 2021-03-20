const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

const login = require("./api/login");
const news = require("./api/news");

const testData = { a: 1, b: 2, c: 3 };

news.refreshNews();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Response Success");
});
app.get("/news", news.getNews);

app.post("/login", login);

app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
});
