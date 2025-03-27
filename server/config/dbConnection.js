import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectionToBD = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection) {
      console.log(`connected to the DB ${connection.host}`);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectionToBD;
