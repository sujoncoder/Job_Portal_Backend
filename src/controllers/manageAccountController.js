import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createJSONWebToken } from "../utils/Token.js";
import { CLIENT_URL, JWT_SECRET_KEY } from "../secret/secret.js";
import mailer from "../utils/Email.js";
import jwt, { decode } from "jsonwebtoken";


// update password
export const updatePassword = async (req, res) => {
    const { prePass, newPass, confirmPass } = req.body;
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        const comprPass = await bcrypt.compare(prePass, user.password);

        if (!comprPass) {
            return res.status(404).send("old does nt match")
        };


        if (!(newPass === confirmPass)) {
            return res.status(404).send("password does,nt match")
        };

        const hashPass = await bcrypt.hash(newPass, 10);

        const updatePass = await User.findByIdAndUpdate(id, { password: hashPass }, { new: true });

        res.status(200).json({
            message: "Password update usccessfull",
            updatePass
        });

    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};


// delete account
export const deleteAccount = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send("user not found")
        };

        res.status(200).json({
            message: "user delete successfull",
            user
        });
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};


// update email
export const updateEmail = async (req, res) => {
    const id = req.params.id;
    const { email } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send("user not found")
        };

        // create jwt
        const token = createJSONWebToken({ email, id }, JWT_SECRET_KEY, "5m");

        //prepare mail
        const maildata = {
            email: email,
            subject: 'Account Activation Mail',
            html: ` <h3>Hello ${user.firstname}</h3>
             <p> Cleack here to <a href="${CLIENT_URL}/api/v1/auth/activate/${token}" target="_blank">Activate your account</a? </p>
        `
        }

        mailer(maildata);

        // Generate token and respond with sanitized user
        res.status(201).json({
            status: 'success',
            message: 'Verify your email  first',
            token: token
        });

    } catch (error) {
        res.status(400).send(error.message)
    }
};


// verify email update email and save the user in database
export const updateMailVerify = async (req, res) => {
    const token = req.body.token;

    try {
        if (!token) {
            return res.status(404).send('Token not found')
        };

        const decodedtoken = jwt.verify(token, JWT_SECRET_KEY);

        if (!decodedtoken) {
            return res.status(400).send('user verification failed')
        };

        await User.findByIdAndUpdate({ _id: decodedtoken.id }, { email: decodedtoken.email });

        // token set into cokkie
        res.cookie("accessToken", token);

        res.status(201).send({
            status: "success",
            message: "user verification successful"
        });

    } catch (err) {
        res.status(400).send(err.message)
    }
};