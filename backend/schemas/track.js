const mongoose = require('mongoose');
const { search } = require('../routes/track');

const TrackSchema = mongoose.Schema({
    title: {
        type: String,
    },
    searchTitle: {
        type: String,
    },
    artist: {
        type: String,
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    href: {
        type: String,
    },
    img: {
        type: String,
    },
    album: {
        type: String,
    },
    genre: {
        type: String,
    },
    plays: {
        type: Number,
    },
    likes: {
        type: Number,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});
const Track = mongoose.model('Track', TrackSchema);
module.exports = Track;
