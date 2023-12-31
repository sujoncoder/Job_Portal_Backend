import express from "express";
const router = express.Router()

// import verifyToken from "../middlewares/tokenVerify.js";
import { applyJob, getAllApplication, getUserApplications } from "../controllers/applyJobController.js";
// router.use(verifyToken)
router.route('/:id').get(getUserApplications)
router
    .route('/')
    .post(applyJob)
    .get(getAllApplication)




export default router;