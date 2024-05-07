const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const path = require('path');
const fs = require('fs');
const { model } = require('mongoose');
const { toLowerCaseNonAccentVietnamese } = require('../helper/vietnameseTextToLowerCase.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'degxdypyr',
    api_key: 376626565986285,
    api_secret: 'BIkyhrU0bwAVPMb0jONzz0mHx_8',
});

const getTracks = async (req, res) => {
    try {
        const tracks = await Track.find();
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadTrack = async (req, res) => {
    try {
        let hrefLink = './services/track/' + req.file.filename;
        console.log(hrefLink);
        const uploadResult = await cloudinary.uploader.upload(hrefLink, { resource_type: 'raw' });
        console.log(uploadResult);
        fs.unlink(hrefLink, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
        });
        let track = new Track({
            title: req.body.title,
            artist: req.body.artist,    
            searchTitle: toLowerCaseNonAccentVietnamese(req.body.title),
            href: uploadResult.secure_url,
            album: req.body.album,
            genre: req.body.genre,
            plays: 0,
            likes: 0,
            comments: []
        });
        

        track.save(function (err) {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'Track uploaded successfully!', track: track });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateTrack = async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const { title, artist, album, genre, song } = req.body;
        if (title) track.title = title;
        if (artist) track.artist = artist;
        if (album) track.album = album;
        if (genre) track.genre = genre;
        if (song) {
            const publicId = track.href.split('/').pop(); 
            const deletionResult = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
            if (deletionResult.result !== 'ok') {
                console.error('Error deleting track from Cloudinary:', deletionResult.error.message);
            }
            let hrefLink = './services/track/' + req.file.filename;
            console.log(hrefLink);
            const uploadResult = await cloudinary.uploader.upload(hrefLink, { resource_type: 'raw' });
            console.log(uploadResult);
            fs.unlink(hrefLink, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
            });
            track.href = uploadResult.secure_url;
        }
        await track.save();
        res.json({ message: 'Track updated successfully!', track });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteTrack = async (req, res) => {
    try {
      const trackId = req.params.id;  
      const track = await Track.findById(trackId);  
      if (!track) {
        return res.status(404).json({ message: 'Track not found' });
      }
      await track.deleteOne();  
      const publicId = track.href.split('/').pop(); 
      const deletionResult = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      console.log(deletionResult);
        if (deletionResult.result !== 'ok') {
        console.error('Error deleting track from Cloudinary:', deletionResult.error.message);
      }
  
      // Respond with success message
      res.status(200).json({ message: 'Track deleted successfully', track });
    } catch (error) {
      console.error('Error deleting track:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const trackSuggestion = async(req, res) => {

}
module.exports = { getTracks, uploadTrack, deleteTrack, updateTrack };