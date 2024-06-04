import axiosClient from '@/app/_utils/GlobalApi';

const isTrackLiked = async (
  userId: string,
  trackId: string,
): Promise<boolean> => {
  try {
    const { data } = await axiosClient.post('/song/is-liked', {
      userId,
      trackId,
    });
    return data.isLiked;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default isTrackLiked;
