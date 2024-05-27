const { reactionPlaylist } = require("../controllers/playlist.controller");
const { requireAuth } = require("../helper/requireAuth");

const router = express.Router();

router.put("/:playlistId/reaction", requireAuth, reactionPlaylist);
