import mongoose from "mongoose";
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
    coverleter: {
        type: String,
        required: true
    }
})

const ApplyJob = mongoose.model("ApplyJob", applyJobSchema);

export default ApplyJob;