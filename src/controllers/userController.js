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
      user
    })


  } catch (err) {
    res.status(401).send({
      message: err.message,
    })

  }
}

export const loginUser = async (req, res) => {
  console.log('bodyyyyy', req.body.password)

  try {
    const { email, password } = req.body;




    const isExist = await User.find({ email })


    if (!isExist) {
      return res.status(400).send('user not exist')
    }

    const isValidPassword = await bcrypt.compare(password, isExist[0].password)

    if (!isValidPassword) {
      return res.status(400).send('authentication failed')
    }

    res.status(200).json({
      status: 'success',
      userId: isExist[0]._id
    })


  } catch (err) {

    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
}