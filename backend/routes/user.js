const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getUsers,
  postUser,
  updateUser,
  deleteUser,
  followArtist,
  unfollowArtist,
  followAlbum,
  unfollowAlbum,
  getNotify,
  getAllNotify,
  getUserById,
  checkArtistFollowed,
  checkAlbumFollowed,
  getLikedTracksByUserId,
} = require("../controllers/user.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "services/temp"));
  },
  filename: function (req, file, cb) {
    cb(null, "id_" + Date.now() + "-" + file.originalname.split(" ").join("_"));
  },
});
const upload = multer({ storage });

router.get("/get", getUsers);
router.get("/get/:id", getUserById);
router.get("/get/liked/:id", getLikedTracksByUserId);
router.post("/post", upload.single("img"), postUser);
router.post("/update/:id", upload.single("img"), updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/follow/artist", followArtist);
router.post("/unfollow/artist", unfollowArtist);
router.post("/is-followed/artist", checkArtistFollowed);
router.post("/is-followed/album", checkAlbumFollowed);
router.post("/follow/album", followAlbum);
router.post("/unfollow/album", unfollowAlbum);
router.get("/notify/:id", getNotify);
router.get("/debug/get/notify", getAllNotify);

module.exports = router;
