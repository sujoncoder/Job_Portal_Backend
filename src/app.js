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




// buildin middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// extrernal middlewares
app.use(cors({
    origin: ["http://localhost:3000"],

    credentials: true,
}));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://job-portal-kohl-six.vercel.app');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });


app.use(morgan("dev"))


// customes middlewares
app.use(handleServerError);

// Cloudinary
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});


// root route
app.get("/", (req, res) => {
    res.status(200).send("Wellcome to job-portal server")
});


// routing middlewares
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', jobRoute);
app.use('/api/v1/applyjob', applyJobRoute);
app.use('/api/v1/user/resume', resumeRoute);
app.use('/api/v1/user/manage-account/', manageAccountRoute);

export default app;