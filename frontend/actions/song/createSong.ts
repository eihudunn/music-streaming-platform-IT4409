import axiosClient from '@/app/_utils/GlobalApi';
import { Song } from '@/scheme/Song';
import { Erica_One } from 'next/font/google';
import toast from 'react-hot-toast';

export interface SongRequest {
  songFile: File;
  imgFile: File;
  title: string;
  artist: string;
  userId: string | Blob;
}

const createSong = async (songRequest: SongRequest): Promise<Song[] | null> => {
  try {
    const formData = new FormData();
    formData.append('song', songRequest.songFile);
    formData.append('img', songRequest.imgFile);
    formData.append('title', songRequest.title);
    formData.append('artist', songRequest.artist);
    formData.append('userId', songRequest.userId);

    const { data } = await axiosClient.post('/song/post', formData);
    console.log(data);
    return data.track || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default createSong;
