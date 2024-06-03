import axiosClient from '@/app/_utils/GlobalApi';

interface followArtistReq {
  userId: string;
  artistId: string;
}

const followArtist = async (req: followArtistReq) => {
  try {
    const { data } = await axiosClient.post('/user/follow/artist', req);
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default followArtist;
