import mongoose, { models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    searchTitle: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    artistFollowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Track",
      },
    ],
    albumsFollowed: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    preferedGenre: [
      {
        genre: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);
export default User;
