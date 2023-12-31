import express from "express";
import { applyIntern } from "../controllers/applyInternController.js";

const router = express.Router();

// import verifyToken from "../middlewares/tokenVerify.js";
// router.use(verifyToken)
router.route('/').post(applyIntern);
// .get(getAllIntern)


// router.route('/:id').get(getInternById)

export default router;