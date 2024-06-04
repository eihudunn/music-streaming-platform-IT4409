import React from 'react';
import PlayButton from './PlayButton';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/scheme/Song';
import { LibraryType } from '@/const/libraryType';
import LikeButton from './musicBar/LikeButton';
import { BsThreeDots } from 'react-icons/bs';
import FollowButton from './FollowButton';

interface PageBreakProps {
  style?: React.CSSProperties;
  songs?: Song[];
  song?: Song;
  id?: string;
  type?: string;
  isProfile?: boolean;
}

const PageBreak: React.FC<PageBreakProps> = ({
  style,
  songs,
  song,
  type,
  id,
  isProfile,
}) => {
  const onPlay = useOnPlay(songs ? (songs as Song[]) : [song as Song]);

  return (
    <>
      {type === LibraryType.Playlist && (
        <div className="h-20 p-8 my-4 flex flex-row items-center" style={style}>
          <PlayButton
            id={songs?.[0]?.id as string}
            onClick={(id: string) => onPlay(id)}
            isNotHidden={true}
          />
        </div>
      )}
      {type === LibraryType.Album && (
        <div className="h-20 p-8 my-4 flex flex-row items-center" style={style}>
          <PlayButton
            id={songs?.[0]?.id as string}
            onClick={(id: string) => onPlay(id)}
            isNotHidden={true}
          />
          <div className="h-20 w-20 ml-2 text-gray-500 cursor-pointer flex items-center justify-center">
            <FollowButton id={id as string} type={LibraryType.Album} />
          </div>
          <div className="h-20 w-20 cursor-pointer flex items-center justify-center">
            <BsThreeDots size={30} />
          </div>
        </div>
      )}
      {type === LibraryType.Artist && (
        <div className="h-20 p-8 my-4 flex flex-row items-center" style={style}>
          <PlayButton
            id={songs?.[0]?.id as string}
            onClick={(id: string) => onPlay(id)}
            isNotHidden={true}
          />
          {!isProfile && (
            <div className="h-20 w-20 ml-2 text-gray-500 cursor-pointer flex items-center justify-center">
              <FollowButton id={id as string} type={LibraryType.Artist} />
            </div>
          )}
          <div className="h-20 w-20 cursor-pointer flex items-center justify-center">
            <BsThreeDots size={30} />
          </div>
        </div>
      )}
      {type === LibraryType.Song && (
        <div
          className="h-20 p-8 my-4 flex flex-row items-center justify-start"
          style={style}
        >
          <div className=" text-center">
            <PlayButton
              id={song?.id as string}
              onClick={(id: string) => onPlay(id)}
              isNotHidden={true}
            />
          </div>
          <div className="h-20 w-20 mx-2 text-gray-500 cursor-pointer flex items-center justify-center">
            <LikeButton songId={song?.id as string} size={40} />
          </div>
          <div className="h-20 w-20 cursor-pointer flex items-center justify-center">
            <BsThreeDots size={30} />
          </div>
        </div>
      )}
    </>
  );
};

export default PageBreak;
