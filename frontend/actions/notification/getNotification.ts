import axiosClient from '@/app/_utils/GlobalApi';
import Notification from '@/scheme/Notification';

const getNotification = async (id: string): Promise<Notification[]> => {
  try {
    const { data } = await axiosClient.get(`/user/notify/${id}`);
    return data || null;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getNotification;
