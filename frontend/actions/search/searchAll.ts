import axiosClient from '@/app/_utils/GlobalApi';
import Library from '@/components/Library';
import { LibraryType } from '@/const/libraryType';

const searchAll = async (query: string) => {
  try {
    const { data } = await axiosClient.get(
      `/search?q=${encodeURIComponent(query)}`,
    );
    console.log(data);
    data.tracks = data.tracks?.map((song: any) => {
      song.id = song._id;
      song.type = LibraryType.Song;
      delete song._id;
      return song;
    });
    data.albums = data.albums?.map((album: any) => {
      album.id = album._id;
      album.type = LibraryType.Album;
      delete album._id;
      return album;
    });
    data.artists = data.artists?.map((artist: any) => {
      artist.id = artist._id;
      artist.type = LibraryType.Artist;
      delete artist._id;
      return artist;
    });
    data.playlists = data.playlists?.map((playlist: any) => {
      playlist.id = playlist._id;
      playlist.type = LibraryType.Playlist;
      delete playlist._id;
      return playlist;
    });
    console.log(data);
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default searchAll;
