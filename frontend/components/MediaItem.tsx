'use client';

import { LibraryType } from "@/const/libraryType";
import { Playlist } from "@/scheme/Playlist";
import { Song } from "@/scheme/Song";
import Image from "next/image";

interface MediaItemProps {
  onClick?: any
  data: Song;
  style?: React.CSSProperties;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, style, onClick }) => {
  const imageUrl = data.img;

  // const handleClick = () => {
  //   if (onClick && data.type === LibraryType.Song) {
  //     return onClick(data.id);
  //   }
  //   //turn on player
  // };
  
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md "
    >
      <div
        style={style}
        className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden"
      >
        <Image
          fill
          src={imageUrl || '/images/default.png'}
          alt="media item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.type}</p>
      </div>
    </div>
  );
};

export default MediaItem;
