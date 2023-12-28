import User from "../models/userModel.js";


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
