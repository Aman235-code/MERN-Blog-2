import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("db connected"));
    await mongoose.connect(`${process.env.MONGO_URI}/quickblog`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
