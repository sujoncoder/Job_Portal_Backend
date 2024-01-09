import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { PHOTO_PATH, EMAIL_REGEX, JWT_SECRET_KEY } from "../secret/secret.js";


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "user first name is required"],
        maxlength: [12, "firstname should be at least 12 character"],
        trim: true
    },
    lastname: {
        type: String,
        maxlength: [12, "lastname should be at least 12 character"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        lowercase: true,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => EMAIL_REGEX.test(value),
            message: 'Invalid email format',
        }
    },
    password: {
        type: String,
        required: [true, "user password is required"],
        minlength: [6, "password should be at least 6 character"],
        trim: true
    },
    phone: {
        type: String,

        trim: true
    },
    gender: {
        type: String,

        enum: ["Male", "Female"]
    },
    country: {
        type: String,

    },
    photo: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Admin", "Employer", "Student"],
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;