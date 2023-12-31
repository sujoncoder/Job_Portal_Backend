import mongoose from "mongoose";
import { DB } from "../secret/secret.js";


const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Database connect success".bgCyan.black)
    } catch (error) {
        console.log("Database connection failed", error.message)
    }
};
export default connectDB;