import axiosClient from '@/app/_utils/GlobalApi';
import Album from '@/scheme/Album';

export interface AlbumRequest {
  tracks: string[];
  imgFile: File;
  title: string;
  artist: string;
  artistId: string | Blob;
}

const createAlbum = async (
  albumRequest: AlbumRequest,
): Promise<Album[] | null> => {
  try {
    const formData = new FormData();
    albumRequest.tracks.forEach((track, index) => {
      formData.append(`tracks[${index}]`, track);
    });
    formData.append('img', albumRequest.imgFile);
    formData.append('title', albumRequest.title);
    formData.append('artist', albumRequest.artist);
    formData.append('artistId', albumRequest.artistId);

    const { data } = await axiosClient.post('/album/post', formData);
    console.log(data);
    return data || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default createAlbum;
