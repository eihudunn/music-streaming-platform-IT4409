'use client';

import LikeButton from '@/components/musicBar/LikeButton';
import MediaItem from '@/components/MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/scheme/Song';
import { useRouter } from 'next/navigation';
import React from 'react';
import PlayButton from '@/components/PlayButton';

interface ArtistContentProps {
  songs: Song[];
}

const ArtistContent: React.FC<ArtistContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  //useUser hook

  //check is logged

  if (songs?.length === 0) {
    return (
      <div className="flex flex-col gap-2-y 2-full px-6 text-neutral-400">
        No song yet
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-y-2 w-full p-6">
      {songs
        ?.sort((a, b) => (b?.plays ?? 0) - (a?.plays ?? 0))
        .map((song, index) => {
          return (
            <div
              key={song.id}
              className="flex group items-center gap-x-4 w-full"
            >
              <p>{index + 1}</p>
              <div className="flex-1">
                <MediaItem
                  onClick={() => onPlay(song?.id)}
                  data={song}
                  isNotLibrary={true}
                />
              </div>
              <LikeButton songId={song.id} />
              <PlayButton id={song.id} onClick={(id: string) => onPlay(id)} />
            </div>
          );
        })}
    </div>
  );
};

export default ArtistContent;
