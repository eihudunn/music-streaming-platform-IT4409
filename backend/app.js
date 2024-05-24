const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const trackRoutes = require("./routes/track.js");
const searchRoutes = require("./routes/search.js");
const userRoutes = require("./routes/user.js");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const path = require("path");

// Middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
app.use('/track', express.static(path.join(__dirname, 'track')));
app.use("/song", trackRoutes);
app.use("/user", userRoutes);
app.use('/search', searchRoutes);

// Updated Mongoose connection with deprecation warnings fixed
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
}))
.catch((error) => console.log(error));

// No change to app.listen

module.exports = app;