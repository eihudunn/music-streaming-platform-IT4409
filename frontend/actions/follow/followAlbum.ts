import axiosClient from '@/app/_utils/GlobalApi';

interface followAlbumReq {
  userId: string;
  albumId: string;
}

const followAlbum = async (req: followAlbumReq) => {
  try {
    const { data } = await axiosClient.post('/user/follow/album', req);
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default followAlbum;
