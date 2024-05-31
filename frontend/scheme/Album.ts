interface Album {
  title: string;
  searchTitle?: string;
  img: string;
  artist: string;
  uploadId: string;
  genre: string;
  tracks: string[];
  likes: number;
  comments: string[];
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Album;
