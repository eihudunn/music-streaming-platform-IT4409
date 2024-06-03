interface Album {
  title: string;
  searchTitle?: string;
  img: string;
  artist: string;
  artistId: string;
  genre: string;
  tracks: string[];
  likes: number;
  comments: string[];
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
  artistData?: any;
}

export default Album;
