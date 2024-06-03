const { search } = require("../routes/track");
const Playlist = require("../schemas/playlist");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const {
  toLowerCaseNonAccentVietnamese,
} = require("../helper/vietnameseTextToLowerCase.js");
const mongoose = require("mongoose");
const User = require("../schemas/user.js");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllPlaylists = async (req, res) => {
  try {
    const playlist = await Playlist.find();
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Function to get a playlist by its ID
const getPlaylistById = async (req, res) => {
  const { id } = req.params;
  try {
    const playlist = await Playlist.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "tracks",
          localField: "tracks",
          foreignField: "_id",
          as: "tracks",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
    ]);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    return res.json(playlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getPlaylistByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const playlist = await Playlist.find({ userId });
    if (!playlist) {
      return res.status(404).json({ message: "No playlist found" });
    }
    return res.json(playlist);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const createPlaylist = async (req, res) => {
  try {
    const { title, songs, userId } = req.body;
    let imgLink = "./services/temp/" + req.files.img[0].filename;

    // Upload the image to Cloudinary
    const uploadImgResult = await cloudinary.uploader.upload(imgLink, {
      resource_type: "image",
    });
    fs.unlink(imgLink, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
      }
    });

    const newPlaylist = new Playlist({
      title,
      img: uploadImgResult.secure_url, // save the URL of the uploaded image
      tracks: songs,
      likes: 0,
      comments: [],
      searchTitle: toLowerCaseNonAccentVietnamese(title),
      userId,
    });
    await newPlaylist.save();
    await User.findByIdAndUpdate(
      userId,
      { $push: { playlists: newPlaylist._id } },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).json({ message: "Playlist created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const reactionPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $inc: { likes: 1 },
      },
      { new: true, useFindAndModify: false }
    );
    if (!playlist)
      return res.status(400).json({ message: "Playlist not found!" });
    return res
      .status(200)
      .json({ message: "Playlist liked successfully", playlist });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  reactionPlaylist,
  createPlaylist,
  getAllPlaylists,
  getPlaylistById,
  getPlaylistByUserId,
};
