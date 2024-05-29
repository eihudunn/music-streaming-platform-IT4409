const mongoose = require("mongoose");
const { search } = require("../routes/track");

export interface Playlist {
  id: string;
  title: string;
  img: string;
  searchTitle: string;
  userId: string;
  tracks: string[];
  likes: number;
  comments: string[];
  type?: string;
}
