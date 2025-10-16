import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("connected to db successfully")
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/pkchatgpt`);
  } catch (e) {
    console.error(e.message);
  }
};
export default connectDB;
