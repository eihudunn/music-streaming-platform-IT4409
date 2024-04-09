const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const path = require('path');
const fs = require('fs');
const { model } = require('mongoose');

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
        let track = new Track({
            title: req.body.title,
            artist: req.body.artist,
            href: '/track/' + req.file.filename,
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
        await Track.findByIdAndRemove(req.params.id);
        fs.unlink(path.join(__dirname, '..', 'track', path.basename(track.href)), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }

            res.json({ message: 'Track deleted successfully!' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getTracks, uploadTrack, deleteTrack };