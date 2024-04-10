const mongoose = require('mongoose');

const TrackSchema = mongoose.Schema({
    title: {
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
