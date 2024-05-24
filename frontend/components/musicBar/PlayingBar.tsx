"use client";

import usePlayer from "@/hooks/usePlayer";
import { Song } from '@/scheme/Song';
import PlayerBarContent from "./PlayingBarContent";

interface PlayingBarProp {
    children: React.ReactNode;
    songs: Song[];
}

const PlayingBar: React.FC<PlayingBarProp> = ({ children, songs }) => {
    const player = usePlayer();
    const song = songs.find((song) => song.id === player.activeId);
    const songUrl = song?.href;
    // const { song } = useGetSongById(player.activeId);
    // const songUrl = useLoadSongUrl(song!);
  
    if (!song || !songUrl || !player.activeId) {
      return null;
    }

    return (
        <div className="fixed bottom-0 bg-black w-full h-[72px] p-2">
            <PlayerBarContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
};

export default PlayingBar;