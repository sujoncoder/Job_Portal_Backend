import mongoose from "mongoose";

const DB = process.env.DATABASE_URL
console.log(DB)

const connectDB = async () => {
    try {
        await mongoose.connect(DB);
        console.log("Database connect success".bgCyan.black)
    } catch (error) {
        console.log(error.message)
    }
};
export default connectDB;