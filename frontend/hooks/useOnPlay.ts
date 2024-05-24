import { Song } from "@/scheme/Song";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();

  const onPlay = (id: string) => {
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  }

  return onPlay;
}

export default useOnPlay;