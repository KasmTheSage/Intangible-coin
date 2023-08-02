const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id}).populate("user",
        ["firstName", "middleName", "lastName", "dateOfBirth", "email"]);

        if(!profile) {
            return res.status(400).json({ message: "There is no profile for this user" });
        }

        

        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", auth, async (req, res) => {

})

module.exports = router;