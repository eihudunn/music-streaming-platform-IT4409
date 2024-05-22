const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const Playlist = require('../schemas/playlist.js');
const path = require('path');
const fs = require('fs');
const { model } = require('mongoose');
const { toLowerCaseNonAccentVietnamese } = require('../helper/vietnameseTextToLowerCase.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const postUser = async (req, res) => {
    try {
        let avatarLink = './services/temp/' + req.file.filename;
        const uploadImgResult = await cloudinary.uploader.upload(avatarLink, { resource_type: 'image' });
        fs.unlink(avatarLink, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
        });

        let user = new User({
            username: req.body.username,
            searchTitle: toLowerCaseNonAccentVietnamese(req.body.username),
            avatarImg: uploadImgResult.secure_url,
            email: req.body.email,
            password: req.body.password,
            following: [],
            artistFollowed: [],
            playlists: [],
            albumsFollowed: [],
            preferedGenre: []
        });
        user.save(function (err) {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json({ message: 'User created successfully', user });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (req.body.username) {
            user.username = req.body.username;
            user.searchTitle = toLowerCaseNonAccentVietnamese(req.body.username);
        }
        if (req.file) {
            let avatarLink = './services/temp/' + req.file.filename;
            const uploadImgResult = await cloudinary.uploader.upload(avatarLink, { resource_type: 'image' });
            fs.unlink(avatarLink, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
            });
            user.avatarImg = uploadImgResult.secure_url;
        }
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;
        user.save(function (err) {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json({ message: 'User updated successfully', user });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let avatarImg = user.avatarImg;
        let publicId = avatarImg.split('/');
        publicId = publicId[publicId.length - 1].split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        if (user.playlists.length > 0) {
            user.playlists.forEach(async playlist => {
                const userPlaylist = await Playlist.findById(playlist);
                if (!userPlaylist) {
                    return res.status(404).json({ message: 'Playlist not found' });
                }
                let img = userPlaylist.img;
                let publicId = img.split('/');
                publicId = publicId[publicId.length - 1].split('.')[0];
                await cloudinary.uploader.destroy(publicId);
                userPlaylist.remove();
            });
        }
        user.remove(function (err) {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json({ message: 'User deleted successfully' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getUsers, postUser, updateUser, deleteUser };