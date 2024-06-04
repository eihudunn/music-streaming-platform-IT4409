import { Song } from './Song';

interface Album {
  id: string;
  title: string;
  searchTitle?: string;
  img: string;
  artist: string;
  artistId: string;
  genre: string;
  tracks: Song[];
  likes: number;
  comments: string[];
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  artistData?: any;
}

export default Album;
