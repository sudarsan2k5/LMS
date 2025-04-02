import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
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

app.use("/api/v1/user", userRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! ERROR NOT FOUND");
});

app.use(errorMiddleware)

export default app;
