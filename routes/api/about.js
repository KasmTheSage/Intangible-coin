const express = require("express");
const router = express.Router();

// @route   GET api/about
// @desc    Test route
// @access  Public
router.get("/", (req, res) => {
    res.send("About route");
});

module.exports = router;