const express = require("express");
const { getTracks, uploadTrack, deleteTrack } = require("../controllers/track.controller");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'track'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-'+ file.originalname.split(' ').join('_'))
    }
})
const upload = multer({ storage })


router.get("/get", getTracks);
router.post("/post",upload.single('song') ,uploadTrack) ;
router.delete("/delete/:id", deleteTrack);
router.put("/update/:id",upload.single('song') , uploadTrack);

module.exports = router; 
