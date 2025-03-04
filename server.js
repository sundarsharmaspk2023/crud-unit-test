import express from "express";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));