import express from "express";
import cors from "cors";
import colors from "colors";
import jobRoute from './routes/jobRoute.js';
import applyJobRoute from '../src/routes/applyJobRoute.js';
import resumeRoute from '../src/routes/resumeRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import manageAccountRoute from './routes/manageAccountRoute.js';
import cookieParser from 'cookie-parser'
import morgan from "morgan";
import rateLimit from 'express-rate-limit'
// import handleClientError from "./middlewares/clientSiteError.js";
import handleServerError from "./middlewares/serverSiteError.js";
import cloudinary from 'cloudinary'
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "./secret/secret.js";


// app initialize
const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes).
    message: "Too many request please try again later."
});


// buildin middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// extrernal middlewares
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));


app.use(morgan("dev"));
app.use(limiter);
app.use(cookieParser());

// customes middlewares
app.use(handleServerError);

// Cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});


// routing middlewares
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', jobRoute);
app.use('/api/v1/applyjob', applyJobRoute);
app.use('/api/v1/user/resume', resumeRoute);
app.use('/api/v1/user/manage-account/', manageAccountRoute);

export default app;