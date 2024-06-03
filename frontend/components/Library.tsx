import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/scheme/Song';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylist } from 'react-icons/tb';
import MediaItem from './MediaItem';
import { useEffect, useState } from 'react';
import { makeStyles, Menu, MenuItem } from '@material-ui/core';
import { Playlist } from '@/scheme/Playlist';
import { LibraryType } from '@/const/libraryType';
import { useRouter } from 'next/navigation';
import { IoMdAdd, IoMdAlbums } from 'react-icons/io';
import { RiPlayListAddLine } from 'react-icons/ri';
import useCreateAlbumModal from '@/hooks/useCreateAlbumModal';
import Album from '@/scheme/Album';

interface LibraryProps {
  data: (Song | Playlist | Album)[];
}

const useStyles = makeStyles({
  menuItem: {
    color: 'white',
    '&:hover': {
      backgroundColor: '#3E3E3E',
    },
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
  },
  Menu: {
    backgroundColor: '#282828',
    padding: '0 !important',
    borderRadius: '5%',
    marginTop: '10px',
  },
});

const Library: React.FC<LibraryProps> = ({ data }) => {
  const uploadModal = useUploadModal();
  const createAlbumModal = useCreateAlbumModal();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<(Song | Playlist | Album)[]>([]);
  const router = useRouter();
  const classes = useStyles();

  //const songs: Song[] = data.filter((item) => item.type === LibraryType.Song);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpload = () => {
    uploadModal.onOpen();
    setAnchorEl(null);
  };

  const handleCreateAlbum = () => {
    createAlbumModal.onOpen();
    console.log('create album');
    setAnchorEl(null);
  };

  useEffect(() => {
    if (selectedButton) {
      const filteredData = data.filter((item) => item.type === selectedButton);
      setSelectedData(filteredData);
    } else {
      setSelectedData(data);
    }
  }, [selectedButton, data]);

  useEffect(() => {
    const item = document.getElementById('library-button');
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) item!.scrollLeft += 15;
      else item!.scrollLeft -= 15;
    };

    item?.addEventListener('wheel', handleScroll);

    // Clean up
    return () => {
      item?.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const onDetailClick = (data: any) => {
    console.log(data);
    router.push(`/${data.type.toLowerCase()}/${data.id}`);
  };

  // const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26}></TbPlaylist>
          <p className="text-neutral-400 font-medium text-md">Your library</p>
        </div>
        <AiOutlinePlus
          onClick={handleClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <Menu
          id="upload-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          classes={{ paper: classes.Menu }}
        >
          <MenuItem onClick={handleClose} className={classes.menuItem}>
            <RiPlayListAddLine className="mr-2" /> Create a new playlist
          </MenuItem>
          <MenuItem onClick={handleUpload} className={classes.menuItem}>
            <IoMdAdd className="mr-2" /> Upload new song
          </MenuItem>
          <MenuItem onClick={handleCreateAlbum} className={classes.menuItem}>
            <IoMdAlbums className="mr-2" /> Create an album
          </MenuItem>
        </Menu>
      </div>
      <div id="library-button" className="flex px-5 space-x-2 overflow-hidden">
        <button
          onClick={() =>
            selectedButton !== LibraryType.Song
              ? setSelectedButton(LibraryType.Song)
              : setSelectedButton(null)
          }
          className={`px-4 py-2 rounded-full font-semibold flex items-center ${
            selectedButton === LibraryType.Song
              ? 'bg-white text-[#232323]'
              : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
          }`}
        >
          Songs
        </button>
        <button
          onClick={() =>
            selectedButton !== LibraryType.Playlist
              ? setSelectedButton(LibraryType.Playlist)
              : setSelectedButton(null)
          }
          className={`px-4 py-2 rounded-full font-semibold flex items-center ${
            selectedButton === LibraryType.Playlist
              ? 'bg-white text-[#232323]'
              : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
          }`}
        >
          Playlists
        </button>
        <button
          onClick={() =>
            selectedButton !== LibraryType.Artist
              ? setSelectedButton(LibraryType.Artist)
              : setSelectedButton(null)
          }
          className={`px-4 py-2 rounded-full font-semibold flex items-center ${
            selectedButton === LibraryType.Artist
              ? 'bg-white text-[#232323]'
              : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
          }`}
        >
          Artists
        </button>
        <button
          onClick={() =>
            selectedButton !== LibraryType.Album
              ? setSelectedButton(LibraryType.Album)
              : setSelectedButton(null)
          }
          className={`px-4 py-2 rounded-full font-semibold flex items-center ${
            selectedButton === LibraryType.Album
              ? 'bg-white text-[#232323]'
              : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
          }`}
        >
          Albums
        </button>
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {selectedData.map((datum) => (
          <MediaItem
            onClick={() => onDetailClick(datum)}
            key={datum.id}
            data={datum}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
