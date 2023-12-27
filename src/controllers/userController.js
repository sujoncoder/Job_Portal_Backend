import User from "../models/userModel.js";
import bcrypt from 'bcrypt'



export const createUser = async (req, res) => {

  const { firstname, lastname, email, password, phone, gender, country, photo } = req.body


  try {

    //hashed password by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      gender,
      country,
      photo
    })

    res.status(201).json({
      status: 'success',
      token: await user.generateToken(),
      user
    })


  } catch (err) {
    res.status(401).send({
      message: err.message,
    })

  }
}

export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    const isExist = await User.find({ email })

    console.log(isExist)

    if (!isExist) {
      return res.status(400).send('user not exist')
    }
    //  check password
    const isValidPassword = await bcrypt.compare(password, isExist[0].password)
    // generateToken
    const token = await isExist[0].generateToken()

    if (!isValidPassword) {
      return res.status(400).send('authentication failed')
    }
    // res.cookie("jwt", token, {
    //   expires: new Date(),
    //   httpOnly: true,
    // })

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
}