import mongoose from "mongoose";
import validator from "validator";

const sourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a source name."],
    },
    color: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a category name."],
    },
    color: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
});

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Please provide your name."],
        validate: {
            validator: function (name) {
                return name.split(" ").length > 1;
            },
            message: "Please provide first name and last name.",
        },
    },
    email: {
        type: String,
        required: [true, "Please provide your email."],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minlength: 8,
        // select: false,
    },
    password_confirm: {
        type: String,
        required: [true, "Please provide a password."],
        select: false,
        validate: {
            validator: function (pass_confirm) {
                return pass_confirm === this.password;
            },
            message: "Passwords are not the same.",
        },
    },
    password_changed_at: {
        type: Date,
        default: Date.now(),
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/djdnlogf1/image/upload/v1734903112/users/6768848c6b4d393ea2c0df6b/1734903112769.png",
    },
    categories: {
        type: [categorySchema],
        default: [
            {
                name: "General",
                color: "#64f710",
                is_active: true,
            },
            {
                name: "Work",
                color: "#10f784",
                is_active: true,
            },
            {
                name: "Supermarket",
                color: "#f5880c",
                is_active: true,
            },
            {
                name: "Movie Platforms",
                color: "#f50c0c",
                is_active: true,
            },
        ],
    },
    sources: {
        type: [sourceSchema],
        default: [
            {
                name: "Cash",
                color: "#2a9e13",
                is_active: true,
            },
            {
                name: "Debit Card",
                color: "#b15f30",
                is_active: true,
            },
            {
                name: "Credit Card",
                color: "#FF0000",
                is_active: true,
            },
        ],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    is_active: {
        type: Boolean,
        default: true,
        // select: false,
    },
    verification_token: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model("User", userSchema);

export default User;
