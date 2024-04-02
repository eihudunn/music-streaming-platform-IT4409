const mongoose = require('mongoose');

const TrackSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    plays: {
        type: Number,
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});
const Track = mongoose.model('Track', TrackSchema);
export default Track;