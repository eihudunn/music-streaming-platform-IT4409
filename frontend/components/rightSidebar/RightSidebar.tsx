'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import CloseRightSidebar from './rightSidebar_Logos/CloseRightSidebar';
import { twMerge } from 'tailwind-merge';
import { Song } from '@/scheme/Song';
import MediaItem from '../MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import useGetSongById from '@/hooks/useGetSongById';
import usePlayer from '@/hooks/usePlayer';
interface RightSidebarProps {
  songs: Song[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const { data: session } = useSession();

  const player = usePlayer();
  const { song } = useGetSongById(player.activeId as string);
  const nextSong = player.ids[player.ids.findIndex((id) => id === player.activeId) + 1];
  const songUrl = song?.href;

  
  // right sidebar
  const [closeRightSidebar, setCloseRightSidebar] = useState(false);
  const handleCloseRightSidebar = () => {
    setCloseRightSidebar(!closeRightSidebar);
  };



  return (
    <div
      className={twMerge(
        'bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto min-w-[280px] max-w-[420px] ',
        closeRightSidebar && 'hidden',
      )}
      // "bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto min-w-[280px] max-w-[420px]"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 py-5">
          <div className="inline-flex items-center gap-x-2">
            <p className="text-neutral-400 font-medium text-md">Queue</p>
          </div>
          <button
            className="w-8 h-8 rounded-full transparent hover:bg-[hsla(0,0%,100%,.1)] hover:scale-105 "
            style={{ color: '#a7a7a7' }}
            onClick={handleCloseRightSidebar}
          >
            <CloseRightSidebar className="pl-2 transition ease-in-out" />
          </button>
        </div>
        <div className="flex flex-col gap-y-2 px-5">
          <p className="text-white font-medium text-md">Now Playing</p>
          <div className="flex flex-col gap-y-2 mt-4 px-3">            
             
              <MediaItem
                data={song}
              />
          </div>

        </div>
        <div className="flex flex-col gap-y-2 px-5">
          <p className="text-white font-medium text-md">Next up</p>
          <div className="flex flex-col gap-y-2 mt-4 px-3">            
             
              <MediaItem
                data={nextSong}
              />
          </div>

        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
