'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import CloseRightSidebar from './rightSidebar_Logos/CloseRightSidebar';
import { twMerge } from 'tailwind-merge';
import { Song } from '@/scheme/Song';
import MediaItem from '../MediaItem';
import useGetSongById from '@/hooks/useGetSongById';
import usePlayer from '@/hooks/usePlayer';
import getSongs from '@/actions/song/getSongs';

interface RightSidebarProps {
  songs: Song[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ songs }) => {

  const [waitList, setWaitList] = useState<Song[]>([]);
  const { data: session } = useSession();

  const player = usePlayer();
  const { song } = useGetSongById(player.activeId as string);
  
  useEffect(() => {
    const fetchData = async () => {
      const waitListData = await getSongs();
      setWaitList(waitListData);
    };

    fetchData();
  }, [session]);

  const startIndex = waitList.findIndex((song) => song.id === player.activeId) ;
  const sliceWaitList = startIndex !== -1 ? waitList.slice(startIndex + 1) : waitList;

  // right sidebar
  const [closeRightSidebar, setCloseRightSidebar] = useState(false);
  const handleCloseRightSidebar = () => {
    setCloseRightSidebar(!closeRightSidebar);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={twMerge(
        'bg-neutral-900 rounded-lg h-full w-full min-w-[280px] max-w-[420px] ',
        closeRightSidebar && 'hidden',
      )}
      // "bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto min-w-[280px] max-w-[420px]"
    >
      <div className="flex flex-col h-full">
        <div 
        className="flex items-center justify-between px-5 py-5 sticky top-0 z-50 bg-neutral-900"
        style={{boxShadow: '0 6px 10px rgba(0, 0, 0, .6)',borderRadius: '8px 8px 0px 0px'}}
        >
          <div className="inline-flex items-center gap-x-2">
            <p className="text-white font-medium text-md">Queue</p>
          </div>
          <button
            className="w-8 h-8 rounded-full transparent hover:bg-[hsla(0,0%,100%,.1)] hover:scale-105 "
            style={{ color: isHovered ? 'white' : '#a7a7a7' }}
            onClick={handleCloseRightSidebar}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CloseRightSidebar className="pl-2 transition ease-in-out" />
          </button>
        </div>
        <div className="h-[calc(100%-72px)] overflow-hidden overflow-y-auto scrollbar-webkit">
        <div className="flex flex-col gap-y-2 px-5 py-2">
          <p className="text-white font-medium text-md">Now Playing</p>
          <div className="flex flex-col gap-y-2 mt-4">            
             
              <MediaItem 
                data={song}
              />
          </div>

        </div>
        <div className="flex flex-col gap-y-2 px-5">
          <p className="text-white font-medium text-md">Next up</p>
          <div className="flex flex-col gap-y-2 ">            
          {sliceWaitList.map((item) => (
          <MediaItem
            key={item.id}
            data={item}
          />
        ))}
              {/* <MediaItem
                data={nextSong}
              /> */}
          </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
