import express from "express";
import { deleteAccount, updateEmail, updateMailVerify, updatePassword } from "../controllers/manageAccountController.js";

const router = express.Router();

router.route("/change-password/:id").put(updatePassword);
router.route("/delete-account/:id").delete(deleteAccount);
router.route("/email-update/:id").put(updateEmail);
router.route("/activate-mail").put(updateMailVerify);

export default router;