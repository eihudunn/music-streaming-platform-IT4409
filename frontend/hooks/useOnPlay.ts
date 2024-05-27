import { Song } from "@/scheme/Song";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  //get user auth

  const onPlay = (id: string) => {
    //make non-login cant play
    //redirect to login

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
