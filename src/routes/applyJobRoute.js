import express from "express";
import { applyJob, getAllApplication, getUserApplications } from "../controllers/applyJobController.js";
import { uploadPDF } from "../middlewares/uploadPdf.js";

const router = express.Router();

// import verifyToken from "../middlewares/tokenVerify.js";

// router.use(verifyToken)
// router.route.get(getUserApplications)
router
    .route('/')
    .post(uploadPDF, applyJob)
    .get(getUserApplications)
// .get(getAllApplication)


export default router;