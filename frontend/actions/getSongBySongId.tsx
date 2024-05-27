import axiosClient from "@/app/_utils/GlobalApi";
import { Song } from "@/scheme/Song";

const getSongBySongId = async (id: string): Promise<Song | null> => {
  try {
    const { data } = await axiosClient.get(`/song/get/${id}`);
    data.id = data._id;
    delete data._id;
    return data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getSongBySongId;
