import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "user first name is required"],

        maxlength: [12, "firstname should be at least 12 character"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "user last name is required"],

        maxlength: [12, "lastname should be at least 12 character"],
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
    // phone: {
    //     type: String,
    //     required: [true, "user phone number is required"],
    //     trim: true
    // },
    // gender: {
    //     type: String,
    //     required: [true, "gender is required"],
    //     enum: ["Male", "Female"]
    // },
    // country: {
    //     type: String,
    //     required: [true, "country is required"]
    // },
    // photo: {
    //     type: String,
    //     required: [true, "photo is required"]

    // }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;