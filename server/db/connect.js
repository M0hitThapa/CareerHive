import mongoose from "mongoose";

const connect = async () => {
  try {
    console.log("Attempting to connect to Database...");
    await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("Failed to connect to database", error.message);
  }
};

export default connect;
