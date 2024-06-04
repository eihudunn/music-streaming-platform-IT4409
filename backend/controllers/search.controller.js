const Track = require("../schemas/track.js");
const Album = require("../schemas/album.js");
const User = require("../schemas/user.js");
const Playlist = require("../schemas/playlist.js");
const path = require("path");
const { model } = require("mongoose");

const searchAll = async (req, res) => {
  try {
    let query = req.query.q;
    console.log(query);
    query = query.toLowerCase();
    query = query.replace(/-/g, " ");
    const tracks = await Track.find({
      searchTitle: { $regex: query, $options: "i" },
    });
    const albums = await Album.find({
      searchTitle: { $regex: query, $options: "i" },
    });
    const users = await User.find({
      searchTitle: { $regex: query, $options: "i" },
    });
    const playlists = await Playlist.find({
      searchTitle: { $regex: query, $options: "i" },
    });
    res.json({ tracks, albums, artists: users, playlists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchAll };
