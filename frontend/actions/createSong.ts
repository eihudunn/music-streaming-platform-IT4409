import axiosClient from '@/app/_utils/GlobalApi';
import { Song } from '@/scheme/Song';

export interface SongRequest {
  songFile: File;
  imgFile: File;
  title: string;
  artist: string;
  userId: string | Blob;
}

const createSong = async (songRequest: SongRequest): Promise<Song[]> => {
  try {
    const formData = new FormData();
    formData.append('song', songRequest.songFile);
    formData.append('img', songRequest.imgFile);
    formData.append('title', songRequest.title);
    formData.append('artist', songRequest.artist);
    formData.append('userId', songRequest.userId);

    const { data } = await axiosClient.post('/song/post', formData);
    console.log(data);
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

export default createSong;
