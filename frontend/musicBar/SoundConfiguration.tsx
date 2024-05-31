'use client';

import { Song } from '@/scheme/Song';

interface SoundConfigurationProps {
    song: Song;
}

const SoundConfiguration: React.FC<SoundConfigurationProps> = ({ song }) => {
      const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };
    return (
        <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    );
};

export default SoundConfiguration;