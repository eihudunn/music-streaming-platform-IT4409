import { Song } from './Song';

const mongoose = require('mongoose');
const { search } = require('../routes/track');

export interface Playlist {
  id: string;
  title: string;
  img: string;
  searchTitle: string;
  userId: string;
  tracks: Song[];
  likes: number;
  comments: string[];
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userData?: any;
}
