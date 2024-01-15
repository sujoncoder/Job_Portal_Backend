import mongoose from "mongoose";
import { PDF_PATH } from "../secret/secret.js";
const { ObjectId } = mongoose.Schema.Types;

const applyJobSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User"

    },
    jobId: {
        type: ObjectId,
        ref: "Job"

    },
    userEmail: {
        type: String,
        required: true

    },
    coverleter: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true

    },
    available: {
        type: String,
        required: true

    }

})

const ApplyJob = mongoose.model("ApplyJob", applyJobSchema);

export default ApplyJob;