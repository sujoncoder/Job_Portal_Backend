import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/tokenVerify.js";

const router = express.Router();
// router.use(verifyToken)
router.route("/").post(createUser);
router.route("/login").post(loginUser);

export default router;