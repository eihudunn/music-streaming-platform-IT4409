import axiosClient from "@/app/_utils/GlobalApi";
import Library from "@/components/Library";
import { LibraryType } from "@/const/libraryType";
import { Song } from "@/scheme/Song";

const getSongByUserId = async (id: string): Promise<Song[] | null> => {
  try {
    const { data } = await axiosClient.get(`/song/get/user/${id}`);
    const res = data.map((song: any) => {
      song.id = song._id;
      song.type = LibraryType.Song;
      delete song._id;
      return song;
    });
    return res || [];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getSongByUserId;
