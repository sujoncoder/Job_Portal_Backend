import app from "./app.js";
import connectDB from "./config/DB.js";

// port assign
const port = process.env.PORT || 8000;

// app listening
app.listen(port, async () => {
    console.log(`Server is running ${port}`.bgBlue.black)
    await connectDB();
});