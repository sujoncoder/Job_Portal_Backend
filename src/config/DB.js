import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const DB = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Database connection successfull".bgCyan.black)
    } catch (error) {
        console.log(error.message)
    }
};
export default connectDB;