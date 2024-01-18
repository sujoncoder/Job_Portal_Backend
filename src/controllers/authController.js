import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import mailer from "../utils/Email.js";
import jwt from 'jsonwebtoken'
import { createJSONWebToken } from "../utils/Token.js";
import { EMAIL_REGEX, JWT_SECRET_KEY } from "../secret/secret.js";


// user register
export const signUp = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
  } = req.body;

  try {
    // Check if the email is in a valid format
    if (!EMAIL_REGEX) {
      return res.status(400).send("Invalid email format");
    };

    const existEmail = await User.exists({ email });
    console.log(existEmail);

    // email checked
    if (existEmail) {
      return res.status(400).send("user email already exist")
    };

    // Hashed password by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create jwt
    const token = createJSONWebToken({ firstname, lastname, email, password: hashedPassword }, JWT_SECRET_KEY, "10m");

    //prepare mail
    const maildata = {
      email: email,
      subject: 'Account Activation Mail',
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #f8f8f8;">
              <h2 style="color: #333; text-align: center;">Account Activation</h2>
              <p>Hello ${firstname},</p>
              <p>Welcome to our platform! To activate your account, please click the link below:</p>
              <p style="text-align: center; margin-top: 20px;">
                  <a href="http://localhost:3000/verify/${token}" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #fff; text-decoration: none; border-radius: 5px;" target="_blank">Activate your account</a>
              </p>
              
              <p style="font-size: 12px; color: #777;">Note: This activation link will expire in 5 minutes.</p> <br/>
              <span>Thanks</span>
              <p> from team 👨‍💻 </p>
          </div>
      `,

      // ${clientUrl}/api/v1/auth/verify/${token}
    };

    await mailer(maildata);

    // Generate token and respond with sanitized user
    res.status(201).json({
      status: 'success',
      message: 'An email with a verification link has been sent to your email id. Please click on that link to confirm your registration. Check your spam folder or promotions tab too.',
      token: token
    });

  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};


//verify email  and save the user in database
export const emailVerify = async (req, res) => {
  try {
    const token = req.body.token
    if (!token) {
      return res.status(404).send('Token not found')
    };

    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userExist = await User.exists({ email: decodedtoken.email });

    if (userExist) {
      return res.status(409).send('user with this email already exist please login')
    };

    if (!decodedtoken) {
      return res.status(400).send('user verification failed')
    };

    await User.create(decodedtoken);

    // token set into cokkie
    res.cookie("accessToken", token);

    res.status(201).send({
      status: "success",
      message: "user verification successful"
    });

    setTimeout(() => {

    }, 2000)

  } catch (err) {
    res.status(400).send({
      message: err.message
    });
  }
};


// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await User.find({ email });
    const useridneed = isExist[0]._id

    if (!isExist[0]) {
      return res.status(400).send('user not exist ! please sign up.')
    };

    //  check password
    const isValidPassword = await bcrypt.compare(password, isExist[0].password);

    // generateToken
    const token = createJSONWebToken({ email, useridneed }, JWT_SECRET_KEY, "1d");

    if (!isValidPassword) {
      return res.status(400).send('authentication failed')
    };

    // token set into cokkie
    res.cookie('accessToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Expiration time in milliseconds (7 days in this example)
      httpOnly: true,
      sameSite: 'Strict',
    });


    res.status(200).json({
      status: 'success',
      token: token,
      userId: isExist[0]._id
    });

  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }
};

// logout user
export const logout = async (req, res) => {
  res.clearCookie("accessToken").json({ message: "logout successful" });
};