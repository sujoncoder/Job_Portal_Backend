import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const applyInternSchema = mongoose.Schema({
    internId: {
        type: ObjectId,
        ref: "Intern"

    },
    coverleter: {
        type: String,
        required: true
    }
})

const ApplyIntern = mongoose.model("ApplyIntern", applyInternSchema);

export default ApplyIntern;