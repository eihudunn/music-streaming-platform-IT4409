import axiosClient from '@/app/_utils/GlobalApi';

interface unFollowArtistReq {
  userId: string;
  artistId: string;
}

const unFollowArtist = async (req: unFollowArtistReq) => {
  try {
    const { data } = await axiosClient.post('/user/unfollow/artist', req);
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default unFollowArtist;
