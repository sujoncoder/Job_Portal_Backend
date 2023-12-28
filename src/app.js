import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import internRouter from '../src/routes/internRoute.js'
import applyinternRouter from '../src/routes/applyInternRoute.js'
import userRouter from '../src/routes/userRoute.js'
dotenv.config();

// app initialize
const app = express();

// buildin middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// extrernal middlewares
app.use(cors());


// routing middlewares


// route
app.use('/api/v1/users', userRouter)
app.use('/api/v1/intern', internRouter)
app.use('/api/v1/applyintern', applyinternRouter)



export default app;