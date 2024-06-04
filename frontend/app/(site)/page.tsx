'use client';

import Header from '@/components/Header';
import ListItem from '@/components/ListItem';
import PageContent from './components/PageContent';
import getSongs from '@/actions/song/getSongs';
import { useSession } from 'next-auth/react';
import getSuggestion from '@/actions/song/getSuggestion';
import { useEffect, useState } from 'react';
import { Song } from '@/scheme/Song';

export interface SuggestionData {
  MostPopularTracks: Song[];
  HotTracks: Song[];
  artistFollowedTracks: Song[];
  favouriteGenreTracks: Song[];
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestionData>(
    {} as SuggestionData,
  );
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const songsData = await getSongs();
      setSongs(songsData);

      if (session?.user?._doc._id) {
        const suggestionData = await getSuggestion(session.user._doc._id);
        setSuggestions(suggestionData);
      }
    };

    fetchData();
  }, [session]);

  console.log('p', suggestions?.MostPopularTracks);
  console.log('hot', suggestions?.HotTracks);
  console.log('fl', suggestions?.artistFollowedTracks);
  console.log('fav', suggestions?.favouriteGenreTracks);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header
        style={{
          backgroundImage: `linear-gradient(to bottom, #10b981 var(--tw-gradient-from-position), rgb(16 185 129 / 0) var(--tw-gradient-from-position) )`,
        }}
      >
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            {/* TODO: add get fav song and play immediate */}
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
        {suggestions?.MostPopularTracks?.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">
                Most popular
              </h1>
            </div>
            <div>
              <PageContent songs={suggestions?.MostPopularTracks} />
            </div>
          </>
        )}
        {suggestions?.HotTracks?.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">Hot track</h1>
            </div>
            <div>
              <PageContent songs={suggestions?.HotTracks} />
            </div>
          </>
        )}
        {suggestions?.artistFollowedTracks?.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">
                Artist followed
              </h1>
            </div>
            <div>
              <PageContent songs={suggestions?.artistFollowedTracks} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
