import app from "./app.js";



// port assign
const port = process.env.PORT || 8000;


// app listen
app.listen(port, () => {
    console.log(`Server is running ${port}`.bgBlue.black)
});