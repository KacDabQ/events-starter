import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");

    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection error");
  }
};

export default connect;
