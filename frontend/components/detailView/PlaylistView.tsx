import { Playlist } from "@/scheme/Playlist";
import React from "react";

interface PlaylistViewProps {
  playlist: Playlist;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ playlist }) => {
  return <div>PlaylistView</div>;
};

export default PlaylistView;
