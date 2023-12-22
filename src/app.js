import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
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
app.get('/', (req, res) => {
    res.status(200).send("Wellcome to my server.")
});

export default app;