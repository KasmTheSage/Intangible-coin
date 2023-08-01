const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    coinBalance: {
        type: Number,
        required: true
    },
    transactionHistory: {
        type: [{}],
        required: true
    },
    feedback: {
        type: Boolean,
        required: true
    },
    visibleInfo: {
        name: Boolean,
        dateOfBirth: Boolean,
        totalBalance: Boolean,
        activityHistory: Boolean,
        dataForage: Boolean,
        experimental: Boolean
    },
    contacts: [{}]
});