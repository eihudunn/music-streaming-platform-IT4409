const mongoose = require("mongoose");

const TrackSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    searchTitle: {
      type: String,
    },
    artist: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    href: {
      type: String,
    },
    img: {
      type: String,
    },
    album: {
      type: String,
    },
    genre: {
      type: String,
    },
    plays: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);
const Track = mongoose.model("Track", TrackSchema);
module.exports = Track;
