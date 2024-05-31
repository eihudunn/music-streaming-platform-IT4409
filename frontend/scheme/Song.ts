export interface Song {
  id: string;
  title: string;
  artist: string;
  searchTitle: string;
  href: string;
  img: string;
  album?: string;
  genre?: string;
  plays?: number;
  likes?: number;
  comments?: string[];
}
