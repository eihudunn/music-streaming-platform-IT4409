import axiosClient from "@/app/_utils/GlobalApi";
import { LibraryType } from "@/const/libraryType";
import { Playlist } from "@/scheme/Playlist";
import { Song } from "@/scheme/Song";

const getPlaylistByUserId = async (id: string): Promise<Playlist[] | null> => {
  try {
    const { data } = await axiosClient.get(`/playlist/user/${id}`);
    const res = data.map((playlist: any) => {
      playlist.id = playlist._id;
      playlist.type = LibraryType.Playlist;
      delete playlist._id;
      return playlist;
    });
    return res || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getPlaylistByUserId;
