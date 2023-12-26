import express from "express";
const router = express.Router()
import {getInternById,postIntern,getAllIntern} from '../controllers/internController.js'

router
.route('/')
.post(postIntern)
.get(getAllIntern)


router.route('/:id').get(getInternById)

export default router;