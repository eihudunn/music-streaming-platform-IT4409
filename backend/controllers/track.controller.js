const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const path = require('path');
const fs = require('fs');
const { model } = require('mongoose');
const { toLowerCaseNonAccentVietnamese } = require('../helper/vietnameseTextToLowerCase.js');
const { search } = require('../app.js');
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
        let hrefLink = '/track/' + req.file.filename;
        console.log(hrefLink);
        const uploadResult = await cloudinary.uploader.upload(hrefLink, { resource_type: 'raw' });
        console.log(uploadResult);
        let track = new Track({
            title: req.body.title,
            searchTitle: toLowerCaseNonAccentVietnamese(req.body.title),
            artist: req.body.artist,
            href: uploadResult.secure_url,
            album: req.body.album,
            genre: req.body.genre,
            plays: 0,
            likes: 0,
            comments: [],
        });
        console.log(track);
        track.save(function (err) {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Track uploaded successfully!', track });
        });
    } catch (error) {
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
            fs.unlink(path.join(__dirname, '..', 'track', path.basename(track.href)), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
            });
            track.href = '/track/' + req.file.filename;
        }
        await track.save();
        res.json({ message: 'Track updated successfully!', track });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTrack = async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const publicId = track.href.split('/').pop();
        await cloudinary.uploader.destroy(publicId);
        await Track.findByIdAndRemove(req.params.id);
        res.json({ message: 'Track deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getTracks, uploadTrack, deleteTrack, updateTrack };