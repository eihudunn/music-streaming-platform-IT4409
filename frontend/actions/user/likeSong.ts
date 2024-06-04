import axiosClient from '@/app/_utils/GlobalApi';

const likeSong = async (userId: string, trackId: string) => {
  try {
    console.log('likeSong', userId, trackId);
    const { data } = await axiosClient.post('/song/like', { userId, trackId });
    return data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default likeSong;
