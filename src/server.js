import app from "./app.js";
import connectDB from "./config/DB.js";
import { PORT } from "./secret/secret.js";


// app listening
app.listen(PORT, async () => {
    console.log(`Server is running ${PORT}`.bgBlue.black)
    await connectDB();
});