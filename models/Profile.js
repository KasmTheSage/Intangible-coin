const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    transactionHistory: [{}],
    feedback: {
        type: Boolean,
        required: true
    },
    visibleInfo: {
        name: Boolean,
        dob: Boolean,
        totalBalance: Boolean,
        activityHistory: Boolean,
        dataForage: Boolean,
        experimental: Boolean
    },
    contacts: [{}]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);