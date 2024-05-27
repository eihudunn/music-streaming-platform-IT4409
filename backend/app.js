require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackRoutes = require("./routes/track.js");
const searchRoutes = require("./routes/search.js");
const userRoutes = require("./routes/user.js");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");
const { currentUser } = require("./helper/currentUser.js");

// Middleware
console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());
app.use(currentUser);
app.use("/tracks", express.static(path.join(__dirname, "track")));
app.use("/songs", trackRoutes);
app.use("/users", userRoutes);
app.use("/search", searchRoutes);

// Updated Mongoose connection with deprecation warnings fixed
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    })
  )
  .catch((error) => console.log(error));

// No change to app.listen

module.exports = app;
