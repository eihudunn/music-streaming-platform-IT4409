'use client';

//@ts-ignore
import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';

import { Song } from '@/scheme/Song';
import MediaItem from '../MediaItem';
import LikeButton from './LikeButton';
import Slider from './Slider';
import usePlayer from '@/hooks/usePlayer';
import SoundLogo from './SoundLogo';
import ConfigButton from './ConfigButton';
import IconWrapper from '@/components/musicBar/musicBar_logos/Icon_wrapper';
import NowPlayIngView from '@/components/musicBar/musicBar_logos/Now_playing_view';
import WaitList from '@/components/musicBar/musicBar_logos/Wait_list';
import Microphone from '@/components/musicBar/musicBar_logos/Microphone';
import Speaker from '@/components/musicBar/musicBar_logos/Speaker';
interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaitList, setIsWaitList] = useState(false);
  const handleWaitList = (active: boolean) => {
    setIsWaitList(active);
  };
  

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  // const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(prevSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => {
      setIsPlaying(true);
    },
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      const newVolume = prevVolume === 0 ? 0.5 : prevVolume;
      setVolume(newVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center ">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="
          flex 
          items-center 
          justify-center 
          h-10 
          rounded-full
          bg-white 
          p-1 
          cursor-pointer
          hover:scale-105
          "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end items-center ">
        <div className="flex items-center justify-center col-span-3 ">
          {/* config button */}
          <ConfigButton>
            <NowPlayIngView className="pl-2" />
          </ConfigButton>
          <ConfigButton>
            <Microphone className="pl-2" />
          </ConfigButton>
          <ConfigButton sendActive={handleWaitList}>
            <WaitList className="pl-2" />
          </ConfigButton>
          <ConfigButton>
            <Speaker className="pl-2" />
          </ConfigButton>
          <div className="flex items-center justify-center w-[125px]">
            <div className="flex" onClick={toggleMute}>
              <SoundLogo volume={volume} />
            </div>
            {/* <VolumeIcon
                onClick={toggleMute}
                size={34}
                className="cursor-pointer"
              /> */}
            {/* <VolumeSlider  changeVolume={(value) => setVolume(value)} /> */}
            <Slider value={volume} onChange={(value) => setVolume(value)} />
          </div>
          <ConfigButton>
            <IconWrapper className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </ConfigButton>
        </div>
        {/* <div className="flex items-center justify-center gap-x-2 w-[120px]">
          <div className="inline-flex" onClick={toggleMute}>
            <SoundLogo volume={volume} />
          </div>
          {/* <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          /> 
          <Slider value={volume} onChange={(value) => setVolume(value)} />
          <ConfigButton>
            <IconWrapper className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"/>
          </ConfigButton>
        </div> */}
      </div>
    </div>
  );
};

export default PlayerContent;
