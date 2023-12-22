import express from "express";

const router = express.Router();

router.route('/text').get(test);

export default router;