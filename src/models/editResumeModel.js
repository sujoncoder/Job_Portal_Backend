import mongoose from "mongoose";


// define a schema a education
const graduationSchema = new mongoose.Schema({
    CollageName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        min: 1900,
        max: 2100
    },
    GPA: {
        type: Number,
        min: 0,
        max: 5
    },
});


const diplomaSchema = new mongoose.Schema({
    CollageName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        min: 1900,
        max: 2100
    },
    GPA: {
        type: Number,
        min: 0,
        max: 5
    },
});


// Define a schema for work experience
const jobDetailsSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    location: String,
    isRemote: {
        type: Boolean,
        default: false
    },
    startDate: Date,
    endDate: Date,
    currentlyWorking: {
        type: Boolean,
        default: false
    },
    description: String,
    shortDescription: {
        type: String,
        maxlength: 250
    },
});

const internDetailsSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    location: String,
    isRemote: {
        type: Boolean,
        default: false
    },
    startDate: Date,
    endDate: Date,
    currentlyWorking: {
        type: Boolean,
        default: false
    },
    description: String,
    shortDescription: {
        type: String,
        maxlength: 250
    },
});


// Define a schema for position of responsibility
const positionOfResponseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        maxlength: 250
    },
});

// Define a schema for training details
const trainingDetailsSchema = new mongoose.Schema({
    trainingProgram: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    location: String,
    isOnline: {
        type: Boolean,
        default: false
    },
    startDate: Date,
    endDate: Date,
    currentlyOngoing: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        maxlength: 700
    },
});


// Define a schema for project details
const projectDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startMonth: Date,
    endMonth: Date,
    currentlyOngoing: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        maxlength: 1000
    },
    projectLink: String,
});


// Define a schema for skills
const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
});


// Define a schema for work examples
const workExampleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: String,
});


// Define a schema for accomplishments or additional details
const accomplishmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
});


// Define the main resume schema
const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    education: [graduationSchema, diplomaSchema],
    workExperience: [jobDetailsSchema, internDetailsSchema],
    positionsOfResponsibility: [positionOfResponseSchema],
    trainingsCourses: [trainingDetailsSchema],
    personalProjects: [projectDetailsSchema],
    skills: [skillsSchema],
    workSamples: [workExampleSchema],
    accomplishmentsDetails: [accomplishmentSchema],
});

// Create a model using the schema
const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;