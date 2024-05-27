const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getUsers,
  updateUser,
  deleteUser,
  followArtist,
  unfollowArtist,
  followAlbum,
  unfollowAlbum,
} = require("../controllers/user.controller");
const { requireAuth } = require("../helper/requireAuth");
const { login, signup, logout } = require("../controllers/auth.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "services/temp"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join("_"));
  },
});
const upload = multer({ storage });

router.get("/", requireAuth, getUsers);
router.put("/", requireAuth, upload.single("img"), updateUser);
router.delete("/:id", requireAuth, deleteUser);
router.post("/follow/artist", requireAuth, followArtist);
router.post("/unfollow/artist", requireAuth, unfollowArtist);
router.post("/follow/album", requireAuth, followAlbum);
router.post("/unfollow/album", requireAuth, unfollowAlbum);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", requireAuth, logout);
module.exports = router;
