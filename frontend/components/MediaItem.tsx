'use client';

import { LibraryType } from '@/const/libraryType';
import { Song } from '@/scheme/Song';
import Image from 'next/image';
import { BiDownload } from 'react-icons/bi';

interface MediaItemProps {
  onClick?: any;
  data: any;
  style?: React.CSSProperties;
  isNotLibrary?: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  style,
  onClick,
  isNotLibrary,
}) => {
  const imageUrl = data?.img;

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md "
    >
      <div className="flex items-center gap-x-3">
        <div
          style={style}
          className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden"
        >
          <Image
            fill
            src={
              (data?.type === LibraryType.Artist
                ? data?.avatarImg
                : imageUrl) || '/images/default.png'
            }
            alt="media item"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">
            {data?.type === LibraryType.Artist ? data?.username : data?.title}
          </p>
          <p className="text-neutral-400 text-sm truncate">{data?.type}</p>
        </div>
      </div>
      {isNotLibrary && (
        <div className="pr-32 hidden md:flex ">
          <p className="text-white">{data.plays?.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default MediaItem;
