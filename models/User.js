const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add a first name."]
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, "Please add a last name"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Please add date of birth"]
    },
    coinBalance: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please add a valid email address."
        ],
        required: true
    },
    password: {
        type: String,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must be a minimum of 8 characters, contain no spaces, must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        ],
        required: true
    }
}, { timestamps: true});

module.exports = User = mongoose.model("user", UserSchema);