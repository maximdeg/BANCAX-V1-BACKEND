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
    validate: {
      validator: function (el) {
        return el === this.password;
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
    default: "default.png",
  },
  categories: [categorySchema],
  sources: [sourceSchema],
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

// userSchema.pre(/^find/, function (next) {
//   this.start = Date.now();
//   next();
// });

// Duration of post actions on mongoose
// userSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

const User = mongoose.model("User", userSchema);

export default User;
