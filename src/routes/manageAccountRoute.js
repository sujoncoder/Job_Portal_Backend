import express from "express";
import { updatePassword } from "../models/manageAccountController.js";

const router = express.Router();

router.route("/change-password/:id").put(updatePassword);

export default router;