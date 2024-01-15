import mongoose from "mongoose";
import { DB, DB_PASS, DB_USER } from "../secret/secret.js";


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.mieka.mongodb.net/jobPortal`);
        console.log("Database connection successfull".bgCyan.black)
    } catch (error) {
        console.log("Database connection failed", error.message)
    }
};
export default connectDB;