const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credential: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Routes of 3 modules

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! ERROR NOT FOUND");
});

module.exports = app;
