import express from "express";
import { createResume, editResume } from "../controllers/resumeController.js";

const router = express.Router();

router.route("/").post(createResume);
router.route("/:id").put(editResume);

export default router;