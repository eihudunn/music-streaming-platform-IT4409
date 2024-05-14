import axiosClient from "@/app/_utils/GlobalApi";

const getSongs = async () => {
    try {
      const { data } = await axiosClient.get('/song/get');
      return data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

export default getSongs;