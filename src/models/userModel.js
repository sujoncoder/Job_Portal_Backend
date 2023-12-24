import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "user first name is required"],
        minlength: [8, "firstname should be at least 8 character"],
        maxlength: [12, "firstname should be at least 12 character"],
        trim: true
    },
    firstname: {
        type: String,
        required: [true, "user last name is required"],
        minlength: [8, "lirstname should be at least 8 character"],
        maxlength: [12, "lirstname should be at least 12 character"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "user email is required"],
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "user password is required"],
        minlength: [6, "password should be at least 6 character"],
        trim: true
    },
    phone: {
        type: String,
        required: [true, "user phone number is required"],
        trim: true
    },
    gender: {
        type: string,
        required: [true, "gender is required"],
        enum: ["Male", "Female"]
    },
    country: {
        type: string,
        required: [true, "country is required"]
    },
    photo: {
        type: String,
        default: avater.png
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;