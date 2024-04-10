const mongoose = require('mongoose');

const PlaylistSchema = mongoose.Schema({
    title: {
        type: String,
    },
    user: {
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