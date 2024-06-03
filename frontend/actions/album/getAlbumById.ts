import axiosClient from '@/app/_utils/GlobalApi';
import { LibraryType } from '@/const/libraryType';
import Album from '@/scheme/Album';

const getAlbumById = async (id: string): Promise<Album | null> => {
  try {
    const res = await axiosClient.get(`/album/${id}`);
    const data = res.data[0];
    data.id = data._id;
    data.type = LibraryType.Album;
    data.tracks = data.tracks.map((track: any) => {
      track.id = track._id;
      delete track._id;
      return track;
    });
    delete data._id;
    console.log(data);
    return data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getAlbumById;
