import axiosClient from '@/app/_utils/GlobalApi';

const unlikeSong = async (userId: string, trackId: string) => {
  try {
    const { data } = await axiosClient.post('/song/unlike', {
      userId,
      trackId,
    });
    return data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default unlikeSong;
