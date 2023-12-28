import mongoose from "mongoose";

const internSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        unique: true,
        minlength: [10, "title should be at least 8 character"],
        trim: true
    },
    aboutwork: {
        type: String,
        required: [true, "aboutwork is required"]
    },
    aboutcompany: {
        type: String,
        required: [true, "aboutcompany is required"]
    },
    skillrequired: {
        type: String,
        required: [true, "skillrequired is required"]
    },
    numberofopening: {
        type: String,
        required: [true, "number of opening is required"]
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        minlength: [3, "last name should be at least 8 character"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "type required"],
        enum: ["Internship", "Internship with job offer"]
    },
    duration: {
        type: String,
        required: [true, "duration required"],
    },
    location: {
        type: String,
        required: [true, "location is required"],
    }
}, { timestamps: true });

const Intern = mongoose.model("Intern", internSchema);

export default Intern;