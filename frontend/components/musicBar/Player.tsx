'use client';

import useGetSongById from '@/hooks/useGetSongById';
import usePlayer from '@/hooks/usePlayer';
import React from 'react';
import PlayerContent from './PlayerContent';

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId as string);
  const songUrl = song?.href;

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full h-[72px] px-2">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;
