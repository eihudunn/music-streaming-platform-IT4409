import axiosClient from '@/app/_utils/GlobalApi';

const isFollowedAlbum = async (
  userId: string,
  albumId: string,
): Promise<boolean> => {
  try {
    const { data } = await axiosClient.post('/user/is-followed/album', {
      userId,
      albumId,
    });
    return data.isFollowed;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default isFollowedAlbum;
