import axiosClient from '@/app/_utils/GlobalApi';

interface unFollowAlbumReq {
  userId: string;
  albumId: string;
}

const unFollowAlbum = async (req: unFollowAlbumReq) => {
  try {
    const { data } = await axiosClient.post('/user/unfollow/album', req);
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default unFollowAlbum;
