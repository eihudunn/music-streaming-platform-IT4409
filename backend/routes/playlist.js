const {
  reactionPlaylist,
  getAllPlaylists,
  createPlaylist,
  getPlaylistByUserId,
  getPlaylistById,
} = require("../controllers/playlist.controller");
const express = require("express");

const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "services/temp"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join("_"));
  },
});

const upload = multer({ storage });

router.put("/:playlistId/reaction", reactionPlaylist);
router.post("/", upload.fields([{ name: "img" }]), createPlaylist);
router.get("/", getAllPlaylists);
router.get("/:id", getPlaylistById);
router.get("/user/:userId", getPlaylistByUserId);

module.exports = router;
