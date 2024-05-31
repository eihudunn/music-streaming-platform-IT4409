import axiosClient from '@/app/_utils/GlobalApi';
import { getDefaultSong } from './api/getSong';
import { Song } from '@/scheme/Song';

const getSongBySongId = async (id: string): Promise<Song | null> => {
  try {
    const { data } = await axiosClient.get(`/song/get/${id}`);
    data.id = data._id;
    delete data._id;
    console.log('data', data.song);
    const song = data.song ? data : getDefaultSong();
    return song || null;
  } catch (error) {
    console.log(error);

    // test music bar
    return getDefaultSong();
    // return null;
  }
};

export default getSongBySongId;
