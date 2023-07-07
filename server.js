const express = require("express");
const connectDB = require("./config/db");
const aboutRoute = require("./routes/api/about");
const authRoute = require("./routes/api/auth");
const profileRoute = require("./routes/api/profile");
const usersRoute = require("./routes/api/users");

const app = express();

// Connect Database
connectDB();

app.get("/", (req, res) => {
    res.send("API is running");
});

// Mount Routes
app.use("/api/about", aboutRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/users", usersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});