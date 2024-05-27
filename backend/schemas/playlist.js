const mongoose = require('mongoose');
const { search } = require('../routes/track');

const PlaylistSchema = mongoose.Schema({
    title: {
        type: String,
    },
    img: {
        type: String,
    },
    searchTitle: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    likes: {
        type: Number,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}); 

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = Playlist;