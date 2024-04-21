const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const path = require('path');
const { model } = require('mongoose');

const searchAll = async (req, res) => {
    try {
        const query = req.query.q;
        query = query.toLowerCase();
        query = query.replace(/-/g, ' ');
        const tracks = await Track.find({ searchTitle: { $regex: query, $options: 'i' } });
        const albums = await Album.find({ searchTitle: { $regex: query, $options: 'i' } });
        const users = await User.find({ searchName: { $regex: query, $options: 'i' } });
        res.json({ tracks, albums, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { searchAll };