import axiosClient from "@/app/_utils/GlobalApi";
import { LibraryType } from "@/const/libraryType";
import { Playlist } from "@/scheme/Playlist";

const getPlaylistById = async (id: string): Promise<Playlist | null> => {
  try {
    const res = await axiosClient.get(`/playlist/${id}`);
    const data = res.data[0];
    data.id = data._id;
    data.type = LibraryType.Playlist;
    data.tracks = data.tracks.map((track: any) => {
      track.id = track._id;
      delete track._id;
      return track;
    });
    delete data._id;
    return data || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getPlaylistById;
