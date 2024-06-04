import axiosClient from '@/app/_utils/GlobalApi';
import { LibraryType } from '@/const/libraryType';
import { UserDto } from '@/scheme/User';

const getUserById = async (id: string): Promise<UserDto | null> => {
  console.log('getUserById:', id);
  try {
    const res = await axiosClient.get(`/user/get/${id}`);
    const data = res.data[0];
    data.id = data._id;
    data.type = LibraryType.Artist;
    data.artistFollowed?.map((item: any) => {
      item.id = item._id;
      item.type = LibraryType.Artist;
      return item;
    });
    data.albumsFollowed?.map((item: any) => {
      item.id = item._id;
      item.type = LibraryType.Album;
      return item;
    });
    data.playlists?.map((item: any) => {
      item.id = item._id;
      item.type = LibraryType.Playlist;
      return item;
    });
    data.likedTracks?.map((item: any) => {
      item.id = item._id;
      item.type = LibraryType.Song;
      return item;
    });
    console.log(data);
    return data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getUserById;
