'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import Box from '../Box';
import SidebarItem from './SidebarItem';
import Library from '../Library';
import { Song } from '@/scheme/Song';
import usePlayer from '@/hooks/usePlayer';
import { twMerge } from 'tailwind-merge';
import { useSession } from 'next-auth/react';
import getSongByUserId from '@/actions/song/getSongByUserId';
import 'react-resizable/css/styles.css';
import { Playlist } from '@/scheme/Playlist';
import getPlaylistByUserId from '@/actions/playlist/getPlaylistByUserId';
import Album from '@/scheme/Album';
import getAlbumByUserId from '@/actions/album/getAlbumByUserId';

interface SidebarProp {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProp> = ({ children }) => {
  const { data: session } = useSession();

  const [userSong, setUserSong] = useState<Song[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      const res = await getSongByUserId(session?.user?._doc._id);
      setUserSong(res || []);
    };
    if (session) {
      getSongs();
    }
  }, [session]);

  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const getPlaylists = async () => {
      const res = await getPlaylistByUserId(session?.user?._doc._id);
      setUserPlaylists(res || []);
    };
    if (session) {
      getPlaylists();
    }
  }, [session]);

  const [userAlbums, setUserAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const getAlbums = async () => {
      const res = await getAlbumByUserId(session?.user?._doc._id);
      setUserAlbums(res || []);
    };
    if (session) {
      getAlbums();
    }
  }, [session]);

  const [userContent, setUserContent] = useState<(Song | Playlist | Album)[]>(
    [],
  );

  useEffect(() => {
    setUserContent([...userSong, ...userPlaylists, ...userAlbums]);
  }, [userSong, userPlaylists, userAlbums]);

  const [sidebarWidth, setSidebarWidth] = useState(400); // initial sidebar width
  const resizerRef = useRef(null);

  useEffect(() => {
    let resizer = resizerRef.current;

    function initResizerFn(resizer) {
      // track current mouse position in x var
      let x: number, w: number;

      function rs_mousedownHandler(e) {
        e.preventDefault();
        x = e.clientX;

        w = sidebarWidth;

        document.addEventListener('mousemove', rs_mousemoveHandler);
        document.addEventListener('mouseup', rs_mouseupHandler);
      }

      function rs_mousemoveHandler(e) {
        e.preventDefault();
        const dx = e.clientX - x;

        const cw = w + dx; // complete width

        if (cw < 1500 && cw > 300) {
          setSidebarWidth(cw);
        }
      }

      function rs_mouseupHandler() {
        // remove event mousemove && mouseup
        document.removeEventListener('mouseup', rs_mouseupHandler);
        document.removeEventListener('mousemove', rs_mousemoveHandler);
      }

      if (resizer) {
        resizer.addEventListener('mousedown', rs_mousedownHandler);
      }
    }

    if (resizer) {
      initResizerFn(resizer);
    }
  }, [sidebarWidth]);

  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname],
  );

  return (
    <div
      className={twMerge(
        'flex h-full',
        player.activeId && 'h-[calc(100%-72px)]',
      )}
    >
      <div
        className={`hidden md:flex flex-col gap-y-2 bg-black h-full py-2 pl-2`}
        style={{ width: `${sidebarWidth}px` }}
      >
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library data={userContent} />
        </Box>
      </div>
      <div
        ref={resizerRef}
        className="resizer hidden md:flex w-[2px] mx-1 cursor-grab h-full hover:bg-[#727272]"
      ></div>
      <main className="h-full flex-1 overflow-y-auto py-2 rounded-lg">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
