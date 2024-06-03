'use client';

import { useEffect, useRef, useState } from 'react';
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

  const gridRef = useRef(null);
  const [numColumns, setNumColumns] = useState(6);

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        const gridWidth = entry.contentRect.width;
        const columnWidth = 205; // adjust this value as needed
        setNumColumns(
          Math.max(2, Math.min(9, Math.floor(gridWidth / columnWidth))),
        );
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    let grid = gridRef.current;
    if (gridRef.current) {
      grid = gridRef.current;
      resizeObserver.observe(gridRef.current);
    }
    // Clean up
    return () => {
      resizeObserver.unobserve(grid);
    };
  }, []);

  if (songs?.length === 0) {
    // return <div className="mt-4 text-neutral-400">No songs available.</div>;

    // return default songs
    songs = fakeGetSong().map((song) => ({
      ...song,
      searchTitle: '',
    })) as Song[]; // Cast the return value of fakeGetSong to Song[]
  }

  return (
    <div
      ref={gridRef}
      className="grid gap-4 mt-4 max-w-[1885px]"
      style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
    >
      {songs.map((item, index) => {
        if (index < numColumns) {
          return (
            <SongItem
              key={item.id}
              onClick={(id: string) => onPlay(id)}
              data={item}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default PageContent;
