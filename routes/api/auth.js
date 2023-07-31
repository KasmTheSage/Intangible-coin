const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "Server error." });
    }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", async (req, res) => {
    const {
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if(password !== user.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), { expiresIn: 360000 }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

        /*res.status(200).json({
            success: true,
            data: user
        });*/
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});


module.exports = router;