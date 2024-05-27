const User = require("../schemas/user.js");
const Playlist = require("../schemas/playlist.js");
const path = require("path");
const fs = require("fs");
const { model } = require("mongoose");
const bcrypt = require("bcryptjs");
const {
  toLowerCaseNonAccentVietnamese,
} = require("../helper/vietnameseTextToLowerCase.js");
const Album = require("../schemas/album.js");
const { cloudinary } = require("../config/cloudinary.js");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    let { userId } = req.currentUser;
    let user = await User.findById(userId);
    if (req.body.username) {
      user.username = req.body.username;
      user.searchTitle = toLowerCaseNonAccentVietnamese(req.body.username);
    }
    if (req.file) {
      if (
        user.avatarImg !==
        "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
      ) {
        let publicId = user.avatarImg.split("/").pop();
        await cloudinary.uploader.destroy(publicId);
      }
      console.log(cloud_name, api_key, api_secret);
      const uploadImgResult = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
      });
      console.log("hello dcm");
      fs.unlink(avatarLink, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: err.message });
        }
      });
      user.avatarImg = uploadImgResult;
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(4);
      user.password = bcrypt.hashSync(req.body.password, salt);
    }
    user.save(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "User updated successfully", user });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let publicId = user.avatarImg.split("/").pop();
    await cloudinary.uploader.destroy(publicId);
    if (user.playlists.length > 0) {
      user.playlists.forEach(async (playlist) => {
        const userPlaylist = await Playlist.findById(playlist);
        if (!userPlaylist) {
          return res.status(404).json({ message: "Playlist not found" });
        }
        let img = userPlaylist.img.split("/").pop();
        await cloudinary.uploader.destroy(publicId);
        userPlaylist.remove();
      });
    }
    user.remove(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "User deleted successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followArtist = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    let artist = await User.findById(req.body.artistId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    user.artistFollowed.push(artist._id);
    user.save(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Artist followed successfully", user, artist });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowArtist = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    let artist = await User.findById(req.body.artistId);
    user.artistFollowed = user.artistFollowed.filter(
      (artistId) => artistId !== artist._id
    );
    user.save(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Artist unfollowed successfully", user, artist });
      }
    });
  } catch {
    res.status(500).json({ message: error.message });
  }
};

const followAlbum = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    let album = await Album.findById(req.body.albumId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    user.albumsFollowed.push(album._id);
    user.save(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Album followed successfully", user, album });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unfollowAlbum = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    let album = await Album.findById(req.body.albumId);
    user.albumsFollowed = user.albumsFollowed.filter(
      (albumId) => albumId !== album._id
    );
    user.save(function (err) {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        res.json({ message: "Album unfollowed successfully", user, album });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  followArtist,
  unfollowArtist,
  followAlbum,
  unfollowAlbum,
};
