const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    artist: {
        type: String,
        required: true,
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
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, {timestamps: true});

const Album = mongoose.model('Album', AlbumSchema);
