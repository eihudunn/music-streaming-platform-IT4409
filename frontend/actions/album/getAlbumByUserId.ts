import axiosClient from '@/app/_utils/GlobalApi';
import { LibraryType } from '@/const/libraryType';
import Album from '@/scheme/Album';

const getAlbumByUserId = async (id: string): Promise<Album[] | null> => {
  try {
    const { data } = await axiosClient.get(`/album/user/${id}`);
    const res = data.map((album: any) => {
      album.id = album._id;
      album.type = LibraryType.Album;
      delete album._id;
      return album;
    });
    return res || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getAlbumByUserId;
