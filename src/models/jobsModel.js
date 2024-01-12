import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
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
    skills: {
        type: String,
        required: [true, "skill is required"]
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
    jobtype: {
        type: String,
        required: [true, " type required"],
        enum: ["Internship", "Job"]
    },
    locationtype: {
        type: String,
        required: [true, " interntype required"],
        enum: ["Remote", "Onside"]
    },
    jobtimetype: {
        type: String,
        required: [true, " interntype required"],
        enum: ["Full-Time", "Part-Time"]
    },
    duration: {
        type: String,
        required: [true, "duration required"],
    },
    location: {
        type: String,
        required: [true, "location is required"],
    },
    salary: {
        type: Number,
        required: [true, "salary is required"],

    }
}, { timestamps: true });


const Job = mongoose.model("Job", jobSchema);

export default Job;