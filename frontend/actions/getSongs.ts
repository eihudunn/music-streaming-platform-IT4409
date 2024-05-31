import axiosClient from '@/app/_utils/GlobalApi';
import { Song } from '@/scheme/Song';

const getSongs = async (): Promise<Song[]> => {
  try {
    const { data } = await axiosClient.get('/song/get');
    const res = data.map((song: any) => {
      song.id = song._id;
      delete song._id;
      return song;
    });
    return res || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getSongs;
