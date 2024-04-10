const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const path = require('path');
const fs = require('fs');
const { model } = require('mongoose');

const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const uploadAlbum = async (req, res) => {
    try {
        let album = new Album({
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            year: req.body.year,
            tracks: req.body.tracks,
        });
        album.save(function (err) {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'Album uploaded successfully!', album: album });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        album.remove();
        res.json({ message: 'Album deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const { title, artist, genre, year, tracks } = req.body;
        if (title) album.title = title;
        if (artist) album.artist = artist;
        if (genre) album.genre = genre;
        if (year) album.year = year;
        if (tracks) album.tracks = tracks;
        album.save();
        res.json({ message: 'Album updated successfully!', album: album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}