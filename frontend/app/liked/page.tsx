'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LikedContent from './components/LikedContent';
import getLikedSongs from '@/actions/song/getLikedSongs';
import { useSession } from 'next-auth/react';
import { Song } from '@/scheme/Song';

const Liked = () => {
  const { data: session } = useSession();
  const [songs, setSongs] = useState<Song[]>([] as Song[]);

  useEffect(() => {
    const fetchSongs = async () => {
      const songsData = await getLikedSongs(session?.user?._doc._id);
      setSongs(songsData as Song[]);
    };

    fetchSongs();
  }, [session]);
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header
        style={{
          backgroundImage: `linear-gradient(to bottom, #50399C var(--tw-gradient-from-position), rgb(16 185 129 / 0) var(--tw-gradient-from-position) )`,
        }}
      >
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                fill
                src="/images/liked.png"
                alt="Playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;
