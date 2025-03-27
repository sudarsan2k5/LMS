import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

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

export default app;
