import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { EMAIL_REGEX } from "../secret/secret.js";



export const signUp = async (req, res) => {
  const { firstname, lastname, email, password, phone, gender, country, photo, role } = req.body;


  try {
    // Check if the email is in a valid format
    if (!EMAIL_REGEX.test(email)) {
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
      country,
      photo,
      role
    };

    const user = await User.create({
      ...userWithoutPassword,
      password: hashedPassword,
    });

    // Generate token and respond with sanitized user
    res.status(201).json({
      status: 'success',
      token: await user.generateToken(),
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};


// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isExist = await User.find({ email });

    if (!isExist[0]) {
      return res.status(400).send('user not exist ! please sign up.')
    };

    //  check password
    const isValidPassword = await bcrypt.compare(password, isExist[0].password);

    // generateToken
    const token = await isExist[0].generateToken();

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