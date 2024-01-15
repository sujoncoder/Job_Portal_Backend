import express from "express";
import { applyJob, getAllApplication, getUserApplications } from "../controllers/applyJobController.js";
import { uploadPDF } from "../middlewares/uploadPdf.js";

<<<<<<< HEAD
const router = express.Router()

// import verifyToken from "../middlewares/tokenVerify.js";
=======
const router = express.Router();

// import verifyToken from "../middlewares/tokenVerify.js";

>>>>>>> c18f3007245d7fd6980e2be74dfa23e5b5aeed1d
// router.use(verifyToken)
// router.route.get(getUserApplications)
router
    .route('/')
    .post(uploadPDF, applyJob)
    .get(getUserApplications)
// .get(getAllApplication)


export default router;