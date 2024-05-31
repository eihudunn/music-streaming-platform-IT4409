const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const Notification = require('../schemas/notification.js');
const path = require('path');
const fs = require('fs');
const { toLowerCaseNonAccentVietnamese } = require('../helper/vietnameseTextToLowerCase.js');
const { newAlbumForm } = require('../helper/formHelper.js');
const { sendMail } = require('../helper/sendEmail.js');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const uploadAlbum = async (req, res) => {
    try {
        let imgLink = './services/temp/' + req.file.filename;
        const uploadImgResult = await cloudinary.uploader.upload(imgLink, { resource_type: 'image' });
        fs.unlink(imgLink, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
        });
        let album = new Album({
            title: req.body.title,
            searchTitle: toLowerCaseNonAccentVietnamese(req.body.title),
            img: uploadImgResult.secure_url,
            img: imgLink,
            artist: req.body.artist,
            artistId: req.body.artistId,
            genre: req.body.genre,
            year: req.body.year,
            tracks: req.body.tracks,
            sendNotify: req.body.sendNotify,
        });
        album.save(async function (err) {
            try {
                const artist = await User.findById(req.body.artistId);
                if (album.sendNotify) {
                    artist.following.forEach(async (followerId) => {
                        const follower = await User.findById(followerId);
                        let notify = new Notification({
                            userId: followerId.toString(),
                            content: 'New album ' + album.title + ' by ' + album.artist + ' has been uploaded!',
                            type: 'New',
                        })
                        if (follower.email) {
                            const contentTitle = `Your artist ${artist.username} has uploaded an album! `;
                            const htmlMail =  newAlbumForm(artist.username, req.body.title, 'https://www.google.com'); //album.href ở bên frontend
                            sendMail(follower.email, contentTitle, htmlMail);
                        }
                        notify.save();
                    });
                }
                res.status(200).json({ message: 'Album uploaded successfully!', album });
            } catch (err) {
                res.status(500).json({ message: err.message });
            } 
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const publicId = album.img.split('/').pop().split('.')[0];
        const deleteResult = await cloudinary.uploader.destroy(publicId);
        if (deleteResult.result !== 'ok' && deleteResult.result !== 'not found') {
            return res.status(500).json({ message: 'Failed to delete album image from cloudinary', deleteResult });
        }
        album.remove(async function (err) {
            try {
                const artist = await User.findById(album.artistId);
                if (album.sendNotify ) {
                    artist.following.forEach(followerId => {
                        let notify = new Notification({
                            userId: followerId.toString(),
                            content: 'Album ' + album.title + ' by ' + album.artist + ' has been deleted!',
                            type: 'Warning',
                        })
                        notify.save();
                    });
                }
                res.json({ message: 'Album deleted successfully!', album });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateAlbum = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const { title, artist, genre, year, tracks, sendNotify} = req.body;
        if (title) album.title = title;
        if (artist) album.artist = artist;
        if (genre) album.genre = genre;
        if (year) album.year = year;
        if (tracks) album.tracks = tracks;
        if (sendNotify) album.sendNotify = sendNotify;
        if (req.file) {
            const publicId = album.img.split('/').pop().split('.')[0];
            const deletionResult = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
            if (deletionResult.result !== 'ok' && deletionResult.result !== 'not found') {
                console.error('Error deleting image from Cloudinary:', deletionResult.error.message);
            }
            let imgLink = './services/temp/' + req.file.filename;
            const uploadImgResult = await cloudinary.uploader.upload(imgLink, { resource_type: 'image' });
            fs.unlink(imgLink, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
            });
            album.img = uploadImgResult.secure_url;
        }
        album.save(
            async function (err) {
                try {
                    const artist = await User.findById(album.artistId);
                    if (album.sendNotify) {
                        artist.following.forEach(async (followerId) => {
                            const follower = await User.findById(followerId);
                            let notify = new Notification({
                                userId: followerId.toString(),
                                content: 'Album ' + album.title + ' by ' + album.artist + ' has been updated!',
                                type: 'Updated',
                            })
                            if (follower.email) {
                                const contentTitle = `Your artist ${artist.username} has updated an album! `;
                                const htmlMail =  newAlbumForm(artist.username, album.title, 'google.com'); //album.href ở bên frontend
                                sendMail(follower.email, contentTitle, htmlMail);
                            }
                            notify.save();
                        });
                    }
                } catch (err) {
                    res.status(500).json({ message: err.message });
                }
            }
        );
        res.json({ message: 'Album updated successfully!', album: album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAlbums, uploadAlbum, deleteAlbum, updateAlbum };