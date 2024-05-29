"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/scheme/Song";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

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
        const columnWidth = 250; // adjust this value as needed
        setNumColumns(
          Math.max(2, Math.min(6, Math.floor(gridWidth / columnWidth)))
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
      resizeObserver.unobserve(grid!);
    };
  }, []);

  if (songs?.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div
      ref={gridRef}
      className="grid gap-4 mt-4"
      style={{ gridTemplateColumns: `repeat(${numColumns}, 1fr)` }}
    >
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
