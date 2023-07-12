const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
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
});

module.exports = User = mongoose.model("user", UserSchema);