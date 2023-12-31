const express = require("express");
const connectDB = require("./config/db");
const aboutRoute = require("./routes/api/about");
const authRoute = require("./routes/api/auth");
const profileRoute = require("./routes/api/profile");
const usersRoute = require("./routes/api/users");
const cron = require("node-cron");
const User = require("./models/User");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Body parser
app.use(express.json({ extended: false}));

// Mount Routes
app.use("/api/about", aboutRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/users", usersRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

   app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
};


// Cron job to update the coin balance every hour
cron.schedule('0 * * * *', async () => {
    try {
      // Use $inc to increment the field by 1
      await User.updateMany({}, { $inc: { coinBalance: 1 } });
  
      console.log('Field updated successfully for all documents.');
    } catch (error) {
      console.error('An error occurred while updating the field:', error);
    }
  });
  

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





