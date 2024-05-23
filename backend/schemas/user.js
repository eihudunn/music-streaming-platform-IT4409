const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    avatarImg: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg'
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    searchTitle: {
        type: String,
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
        ref: 'Playlist'
    }],
    albumsFollowed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    }],
    preferedGenre: [{
        genre: {
            type: String,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    }]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);  
module.exports = User;
