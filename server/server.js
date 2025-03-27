import app from "./app.js";
import { config } from "dotenv";
import connectionToBD from "./config/dbConnection.js";
config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectionToBD();
  console.log(`app is running PORT ${PORT}`);
});
