import app from "../app.js";

const handleClientError = (req, res, next) => {
    res.status(404).send("Opps page or route not found!");
    next();
};
export default handleClientError;