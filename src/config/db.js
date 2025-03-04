import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//mongodb+srv://sundarsharmaspk2023:sundarsharmaspk2023@cluster0.k8zqvvn.mongodb.net/crudTest
//mongodb://localhost:27017/crudTest
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sundarsharmaspk2023:sundarsharmaspk2023@cluster0.k8zqvvn.mongodb.net/crudTest", {});
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
