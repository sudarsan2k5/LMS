const app = require("./app");
const { config } = require("dotenv");
config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app is running PORT ${PORT}`);
});
