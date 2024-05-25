import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "code-compiler",
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(`failed to connect to mongodb ${error}`);
  }
};
