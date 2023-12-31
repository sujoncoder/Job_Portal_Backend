import express from "express";
import { postJob, getJobs, getJobById } from '../controllers/jobsController.js'
import verifyToken from "../middlewares/tokenVerify.js";
const router = express.Router();

// token varify middlewares works all intern route.
// router.use(verifyToken);

router.route('/').post(postJob).get(getJobs);
router.route('/:id').get(getJobById);

export default router;