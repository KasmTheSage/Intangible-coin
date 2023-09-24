const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ message: "A user with this email already exists" });
        }

        user = new User({
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            email,
            password
        });

        user.coinBalance = 0;

        const now = new Date();
        const birthDate = new Date(user.dateOfBirth);
        const timeDifferenceInMilliseconds = now - birthDate;

        // Calculate the number of hours lived
        const hoursLived = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));

        // Add the hours lived to the coin value
        user.coinBalance += hoursLived;

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token, data: user });
        });

    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// @route   GET api/users
// @desc    Find user
// @access  Private

router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;