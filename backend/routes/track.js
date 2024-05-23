const express = require("express");
const { getTracks, uploadTrack, deleteTrack, updateTrack, trackSuggestion } = require("../controllers/track.controller");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'services/temp'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-'+ file.originalname.split(' ').join('_'))
    }
})  
const upload = multer({ storage });

router.get("/get", getTracks);
router.post("/post", upload.fields([{ name: 'song'}, {name: 'img' }]) ,uploadTrack);
router.delete("/delete/:id", deleteTrack);
router.put("/update/:id", upload.fields([{ name: 'song'}, {name: 'img' }])  , updateTrack);
router.get("/suggestion/&userid=:id", trackSuggestion);

module.exports = router; 
