import express from "express";
const router = express.Router()

// import verifyToken from "../middlewares/tokenVerify.js";
import { applyIntern } from "../controllers/applyInternController.js";
// router.use(verifyToken)
router
    .route('/')
    .post(applyIntern)
// .get(getAllIntern)


// router.route('/:id').get(getInternById)

export default router;