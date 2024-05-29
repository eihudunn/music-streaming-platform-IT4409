const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    searchTitle: {
        type: String,
    },
    img: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    genre: {
        type: String,
        required: true,
    },
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    sendNotify: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;
