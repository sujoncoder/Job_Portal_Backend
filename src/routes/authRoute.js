import express from "express";
import { emailVerify, login, logout, signUp } from "../controllers/authController.js";
import verifyToken from "../middlewares/tokenVerify.js";
import upload from "../middlewares/fileUpload.js";

const router = express.Router();
// router.use(verifyToken)

router.route("/sign-up").post(upload.single("photo"), signUp);
router.route("/verify").post(emailVerify);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;