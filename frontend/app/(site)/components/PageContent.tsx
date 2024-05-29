'use client';

import { useSession } from 'next-auth/react';

import fakeGetSong from '@/actions/api/getSong';
import SongItem from '@/components/SongItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/scheme/Song';

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const { data: session } = useSession();
  console.log(session);

  if (songs?.length === 0) {
    // return <div className="mt-4 text-neutral-400">No songs available.</div>;

    // return default songs
    songs = fakeGetSong().map((song) => ({
      ...song,
      searchTitle: '',
    })) as Song[]; // Cast the return value of fakeGetSong to Song[]
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((item) => {
        return (
          <SongItem
            key={item.id}
            onClick={(id: string) => onPlay(id)}
            data={item}
          />
        );
      })}
    </div>
  );
};

export default PageContent;
