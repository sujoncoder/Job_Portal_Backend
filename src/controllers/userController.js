import User from "../models/userModel.js";
import cloudinary from 'cloudinary'

// this eature only admin
export const getUsers = async (req, res) => {
  try {
    const search = req.query.search || "";

    // Use a regular expression to perform a case-insensitive search by firstname
    const users = await User.find({ firstname: { $regex: new RegExp(search, 'i') }, role: { $in: ['Student', 'Employer'] } }, { password: 0 });

    // role checked
    if (!(users === users.Admin)) {
      res.status(200).send(users);
    };

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
//getr
export const getUserbyId = async (req, res) => {
  const { id } = req.params

  try {

    const userdata = await User.find({ _id: id })
    res.status(200).json({
      status: 'Success',
      data: userdata
    })

  } catch (error) {

    res.status(400).send({
      status: "failed",
      message: error.message
    })
  }
}

export const updateUser = async (req, res) => {

  const { id } = req.query

  try {

    //cloudenary
    const file = req.file.path

    const cloud = await cloudinary.uploader.upload(file)
    console.log(cloud.url)
    const userInfo = {
      ...req.body,
      photo: cloud.url
    };

    const update = await User.findByIdAndUpdate({ _id: id }, userInfo)

    res.status(200).json({
      status: 'success',
      data: update
    })

  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
}

export const updateUserWithoutProfileImg = async (req, res) => {
  const { id } = req.query
  try {

    const updateUser = await User.findByIdAndUpdate({ _id: id }, req.body)
    res.status(200).json({
      status: 'success',
      data: updateUser
    })

  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}