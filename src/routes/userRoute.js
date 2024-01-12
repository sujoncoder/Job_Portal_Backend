import express from "express";
import { getUserbyId, getUsers, updateUser, updateUserWithoutProfileImg } from "../controllers/userController.js";
import upload from "../middlewares/fileUpload.js";

const router = express.Router();
router.route('/:id').get(getUserbyId);
router.put('/update', upload.single('photo'), updateUser);
router.put('/updateWithoutProfileImg', updateUserWithoutProfileImg);
router.route("/").get(getUsers);

export default router;