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
        const profile = await Profile.findOne({ user: req.user.id }).populate("user",
        ["firstName", "middleName", "lastName", "dateOfBirth", "coinBalance", "email"]);

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
    const  {
        feedback,
        visibleInfo: {
            name,
            dob,
            totalBalance,
            activityHistory,
            dataForage,
            experimental
        }
    } = req.body;
    
    const profileFields = { visibleInfo: {} };
    profileFields.user = req.user.id;
    profileFields.feedback = feedback;
    profileFields.visibleInfo.name = name;
    profileFields.visibleInfo.dob = dob;
    profileFields.visibleInfo.totalBalance = totalBalance;
    profileFields.visibleInfo.activityHistory = activityHistory;
    profileFields.visibleInfo.dataForage = dataForage;
    profileFields.visibleInfo.experimental = experimental;

    console.log(profileFields);

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile) {
            //Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields },
                { new: true }
            );

            return res.json(profile);
        }

        // Create
        profile = new Profile(profileFields);

        await profile.save();

        res.status(201).json({
            success: true,
            data: profile
        })
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
})

module.exports = router;