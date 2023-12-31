import express from "express";
import cors from "cors";
import colors from "colors";
import jobRouter from './routes/jobRoute.js';
import applyInternRouter from '../src/routes/applyInternRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser'
import morgan from "morgan";
import rateLimit from 'express-rate-limit'
import handleClientError from "./middlewares/clientSiteError.js";
import handleServerError from "./middlewares/serverSiteError.js";

// app initialize
const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 10, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
    message: "Too many request please try again later."
});

// buildin middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// extrernal middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(limiter);
app.use(cookieParser());

// customes middlewares
// app.use(handleClientError);
app.use(handleServerError);

// routing middlewares
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applyintern', applyInternRouter);

export default app;