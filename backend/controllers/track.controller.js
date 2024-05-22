const Track = require('../schemas/track.js');
const Album = require('../schemas/album.js');
const User = require('../schemas/user.js');
const path = require('path');
const fs = require('fs');
const { toLowerCaseNonAccentVietnamese } = require('../helper/vietnameseTextToLowerCase.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getTracks = async (req, res) => {
    try {
        const tracks = await Track.find();
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadTrack = async (req, res) => {
    try {
        let hrefLink = './services/temp/' + req.files.song[0].filename;
        let imgLink = './services/temp/' + req.files.img[0].filename;

        const uploadHrefResult = await cloudinary.uploader.upload(hrefLink, { resource_type: 'raw' });
        fs.unlink(hrefLink, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
        });

        const uploadImgResult = await cloudinary.uploader.upload(imgLink, { resource_type: 'image' });
        fs.unlink(imgLink, err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
        });
        let track = new Track({
            title: req.body.title,
            artist: req.body.artist,
            userId: req.body.userId,
            searchTitle: toLowerCaseNonAccentVietnamese(req.body.title),
            href: uploadHrefResult.secure_url,
            img: uploadImgResult.secure_url,
            album: req.body.album,
            genre: req.body.genre,
            plays: 0,
            likes: 0,
            comments: []
        });

        track.save(function (err) {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'Track uploaded successfully!', track: track });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateTrack = async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        const { title, artist, album, genre, song, img } = req.body;
        if (title) track.title = title;
        if (artist) track.artist = artist;
        if (album) track.album = album;
        if (genre) track.genre = genre;
        if (song) {
            const publicId = track.href.split('/').pop();
            const deletionResult = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
            if (deletionResult.result !== 'ok') {
                console.error('Error deleting track from Cloudinary:', deletionResult.error.message);
            }
            let hrefLink = './services/temp/' + req.files.song[0].filename;
            const uploadHrefResult = await cloudinary.uploader.upload(hrefLink, { resource_type: 'raw' });
            fs.unlink(hrefLink, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
            });
            track.href = uploadHrefResult.secure_url;
        }
        if (img) {
            const publicId = track.img.split('/').pop();
            const deletionResult = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
            if (deletionResult.result !== 'ok') {
                console.error('Error deleting image from Cloudinary:', deletionResult.error.message);
            }
            let imgLink = './services/temp/' + req.files.img[0].filename;
            const uploadImgResult = await cloudinary.uploader.upload(imgLink, { resource_type: 'image' });
            fs.unlink(imgLink, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
            });
            track.img = uploadImgResult.secure_url;
        }
        await track.save();
        res.json({ message: 'Track updated successfully!', track });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteTrack = async (req, res) => {
    try {
        const trackId = req.params.id;
        const track = await Track.findById(trackId);
        if (!track) {
            return res.status(404).json({ message: 'Track not found' });
        }
        await track.deleteOne();
        const publicTrackId = track.href.split('/').pop();
        const deletionTrackResult = await cloudinary.uploader.destroy(publicTrackId, { resource_type: 'raw' });
        console.log(deletionTrackResult);
        if (deletionTrackResult.result !== 'ok') {
            console.error('Error deleting track from Cloudinary:', deletionTrackResult.error.message);
        }
        const publicImgId = track.img.split('/').pop();
        const deletionImgResult = await cloudinary.uploader.destroy(publicImgId, { resource_type: 'image' });
        console.log(deletionImgResult);
        if (deletionImgResult.result !== 'ok') {
            console.error('Error deleting image from Cloudinary:', deletionImgResult.error.message);
        }

        // Respond with success message
        res.status(200).json({ message: 'Track deleted successfully', track });
    } catch (error) {
        console.error('Error deleting track:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const trackSuggestion = async (req, res) => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const id = req.params.id;
        const user = await User.findById(id);
        if (!id || !user) {
            const MostPopularTracks = await Track.find().sort({ plays: -1, likes: -1 }).limit(10);
            const HotTracks = await Track.find(
                {
                    createdAt: {
                        $gte: oneWeekAgo,
                    },
                }
            ).sort({ likes: -1, plays: -1 }).limit(10);
            return res.json({ MostPopularTracks, HotTracks });
        } else {
            
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { getTracks, uploadTrack, deleteTrack, updateTrack, trackSuggestion };