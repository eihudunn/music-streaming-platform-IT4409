import axiosClient from '@/app/_utils/GlobalApi';

const playSong = async (trackId: string, userId: string) => {
  try {
    const { data } = await axiosClient.post('/song/play', { trackId, userId });
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default playSong;
