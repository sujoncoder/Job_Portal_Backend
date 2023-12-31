import jwt from "jsonwebtoken";
import Intern from '../models/jobsModel.js';


const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send('Unauthorized')
        };

        const justToken = token.split(' ')[1];

        const accessToken = process.env.JWT_SECRET_KEY;

        jwt.verify(justToken, accessToken, async (err, decode) => {

            if (err) {
                return res.status(401).send('invalid token')
            }
            const userId = await Intern.findOne({ id: decode.userId })
            req.userId = userId
        });

        next();

    } catch (err) {
        return res.status(401).send('authentication failed', err.message)
    };
}

export default verifyToken;