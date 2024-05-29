'use client';

import { Song } from '@/scheme/Song';
import MediaItem from '../MediaItem';
import LikeButton from './LikeButton';

interface CurrentMusicInformationProps {
  song: Song;
}

const CurrentMusicInformation: React.FC<CurrentMusicInformationProps> = ({
  song,
}) => {
  const imgStyle = {
    width: '56px',
    height: '56px',
    borderRadius: '0px',
  };

  return (
    <div className="flex w-full justify-start">
      <div className="flex items-center gap-x-4">
        <MediaItem style={imgStyle} data={song} />
        <LikeButton songId={song.id} />
      </div>
    </div>
  );
};

export default CurrentMusicInformation;
