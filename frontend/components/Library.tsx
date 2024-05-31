import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/scheme/Song";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useEffect, useState } from "react";
import { Playlist } from "@/scheme/Playlist";
import { LibraryType } from "@/const/libraryType";
import { useRouter } from "next/navigation";

interface LibraryProps {
  data: (Song | Playlist)[];
}

const Library: React.FC<LibraryProps> = ({ data }) => {
  const uploadModal = useUploadModal();
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<(Song | Playlist)[]>([]);
  const router = useRouter();

  //const songs: Song[] = data.filter((item) => item.type === LibraryType.Song);

  useEffect(() => {
    if (selectedButton) {
      const filteredData = data.filter((item) => item.type === selectedButton);
      setSelectedData(filteredData);
    } else {
      setSelectedData(data);
    }
  }, [selectedButton, data]);

  useEffect(() => {
    const item = document.getElementById("library-button");
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) item!.scrollLeft += 15;
      else item!.scrollLeft -= 15;
    };

    item?.addEventListener("wheel", handleScroll);

    // Clean up
    return () => {
      item?.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const onClick = () => {
    return uploadModal.onOpen();
  };

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
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
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
              ? "bg-white text-[#232323]"
              : "bg-[#232323] text-white hover:bg-[#3c3c3c]"
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
              ? "bg-white text-[#232323]"
              : "bg-[#232323] text-white hover:bg-[#3c3c3c]"
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
              ? "bg-white text-[#232323]"
              : "bg-[#232323] text-white hover:bg-[#3c3c3c]"
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
              ? "bg-white text-[#232323]"
              : "bg-[#232323] text-white hover:bg-[#3c3c3c]"
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
