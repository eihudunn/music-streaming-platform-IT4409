const Playlist = require("../schemas/playlist");

const reactionPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $inc: { likes: 1 },
      },
      { new: true, useFindAndModify: false }
    );
    if (!playlist)
      return res.status(400).json({ message: "Playlist not found!" });
    return res
      .status(200)
      .json({ message: "Playlist liked successfully", playlist });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { reactionPlaylist };
