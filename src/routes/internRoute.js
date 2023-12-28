import express from "express";
const router = express.Router()
import { getInternById, postIntern, getAllIntern } from '../controllers/internController.js'
import verifyToken from "../middlewares/tokenVerify.js";

// token varify middlewares works all intern route.
// router.use(verifyToken);

router.route('/').post(postIntern).get(getAllIntern);
router.route('/:id').get(getInternById);

export default router;