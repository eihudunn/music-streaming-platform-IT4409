'use client';

import LikeButton from '@/components/musicBar/LikeButton';
import MediaItem from '@/components/MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/scheme/Song';
import { useRouter } from 'next/navigation';
import React from 'react';
import PlayButton from '@/components/PlayButton';
import { AiOutlineDelete } from 'react-icons/ai';
import axiosClient from '@/app/_utils/GlobalApi';

interface ArtistContentProps {
  songs: Song[];
  limit?: number;
  isEdit?: boolean;
  userId?: string;
}

const ArtistContent: React.FC<ArtistContentProps> = ({
  songs,
  limit,
  isEdit,
  userId,
}) => {
  const onPlay = useOnPlay(songs);
  const router = useRouter();
  //useUser hook
  //check is logged

  const handleDelete = async (songId: string) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this song?',
    );
    if (!userConfirmed) {
      return;
    }
    try {
      const response = await axiosClient.delete(`/song/delete/${songId}`);
      console.log('response', response);
      router.push(`/user/${userId}`);
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

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
          if (limit && index >= limit) return null;
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
              {/* <PlayButton id={song.id} onClick={(id: string) => onPlay(id)} /> */}
              {isEdit && (
                <AiOutlineDelete
                  className="h-6 w-6 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(song.id)}
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ArtistContent;
