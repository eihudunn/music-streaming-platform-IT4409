import axiosClient from "@/app/_utils/GlobalApi";
import { Playlist } from "@/scheme/Playlist";

const getPlaylists = async (): Promise<Playlist[]> => {
  try {
    const { data } = await axiosClient.get("/playlist/");
    const res = data.map((playlist: any) => {
      playlist.id = playlist._id;
      delete playlist._id;
      return playlist;
    });
    return res || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default getPlaylists;
