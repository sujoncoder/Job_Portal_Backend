import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import mailer from "../utils/Email.js";
import jwt from 'jsonwebtoken'
import { createJSONWebToken } from "../utils/Token.js";
import { EMAIL_REGEX, JWT_SECRET_KEY } from "../secret/secret.js";


export const signUp = async (req, res) => {
  const { firstname, lastname, email, password, phone, gender, country, photo, role } = req.body;

  try {
    // Check if the email is in a valid format
    if (!EMAIL_REGEX) {
      return res.status(400).send("Invalid email format");
    }

    const existEmail = await User.exists({ email });

    // email checked
    if (existEmail) {
      return res.status(400).send("user email already exist")
    };
    // Hashed password by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user without password in response
    const userWithoutPassword = {
      firstname,
      lastname,
      email,
      phone,
      gender,

    };

    // create jwt
    const token = createJSONWebToken({ firstname, lastname, email, password }, JWT_SECRET_KEY, "10m");
    const clientUrl = process.env.CLIENT_URL
    //prepare mail
    const maildata = {
      email: email,
      subject: 'Account Activation Mail',
      html: ` <h3>Hello ${firstname}</h3>
             <p> Cleack here to <a href="${clientUrl}/api/v1/auth/activate/${token}" target="_blank">Activate your account</a? </p>
        `
    }

    mailer(maildata)

    // Generate token and respond with sanitized user
    res.status(201).json({
      status: 'success',
      message: 'Verify your email  first',
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
    }

    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY)

    console.log('deee', decodedtoken)

    const userExist = await User.exists({ email: decodedtoken.email })

    if (userExist) {
      return res.status(409).send('user with this email  already exist please login')
    }
    if (!decodedtoken) {
      return res.status(400).send('user verification failed')
    }

    const user = await User.create(decodedtoken)
    // token set into cokkie
    res.cookie("accessToken", token);

    res.status(201).send({
      status: "success",
      message: "user verification successful"
    })

  } catch (err) {
  }
}
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
    res.cookie("accessToken", token);

    res.status(200).json({
      status: 'success',
      //generate token
      token: token,
      userId: isExist[0]._id
    })

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
};

// logout user
export const logout = async (req, res) => {
  res.clearCookie("accessToken").json({ message: "logout successful" });
};