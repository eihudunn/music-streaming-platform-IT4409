import axiosClient from '@/app/_utils/GlobalApi';

const isFollowedArtist = async (
  userId: string,
  artistId: string,
): Promise<boolean> => {
  try {
    const { data } = await axiosClient.post('/user/is-followed/artist', {
      userId,
      artistId,
    });
    return data.isFollowed;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default isFollowedArtist;
