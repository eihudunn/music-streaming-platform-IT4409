import axiosClient from '@/app/_utils/GlobalApi';
import { getDefaultSong } from '../api/getSong';
import { Song } from '@/scheme/Song';

const getSongBySongId = async (id: string): Promise<Song | null> => {
  try {
    const res = await axiosClient.get(`/song/get/${id}`);
    const data = res.data[0];
    data.id = data._id;
    delete data._id;
    console.log(data);
    return data || null;
  } catch (error) {
    console.log(error);

    // test music bar
    return getDefaultSong();
    // return null;
  }
};

export default getSongBySongId;
