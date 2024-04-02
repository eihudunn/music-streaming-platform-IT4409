const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();


//middleware
app.use(express.json());
app.use(cors());
// app.use("/api/blogs", blogRouter);

mongoose.connect(process.env.MONGODB_URI)
.then( () =>
    console.log("Connected to Mongo Successfully!")
)
.catch ((error) => {
      console.log(error);
})


app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
});
 
module.exports = app;
