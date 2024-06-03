const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAlbums,
  uploadAlbum,
  updateAlbum,
  deleteAlbum,
  getAlbumById,
  getAlbumsByArtistId,
} = require("../controllers/album.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "services/temp"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join("_"));
  },
});
const upload = multer({ storage });

router.get("/get", getAlbums);
router.get("/:id", getAlbumById);
router.get("/user/:userId", getAlbumsByArtistId);
router.post("/post", upload.single("img"), uploadAlbum);
router.delete("/delete/:id", deleteAlbum);
router.post("/update/:id", upload.single("img"), updateAlbum);

module.exports = router;
