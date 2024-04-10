const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    artistFollowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    albumsFollowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);  
module.exports = User;
