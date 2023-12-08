"use client"

import { useEffect, useState } from 'react'
import useSound from 'use-sound';

import { usePlayer } from '@/hooks/use-player';

import { Song } from "@/types"
import { LikeButton } from '../song/like-button';
import MediaItem from '../song/library-song-item';
import { Volume1, VolumeX } from 'lucide-react';
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { VolumeSlider } from '../slider/volume-slider';
import { UserTips } from '../tooltip/user-tips';
import { useScopedI18n } from '@/locales/client';
// import { DurationSlider } from './slider/duration-slider';

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

export const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  // const [duration, setDuration] = useState(0);
  const playerLocale = useScopedI18n('main-service.main-part.config')

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

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
  }

  const onPlayPrevious = () => {
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (player.ids.length === 0) {
      return;
    }

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(
    songUrl,
    {
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false)
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3']
    },
  );

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload()
    }
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
      setVolume(1);
    } else {
      setVolume(0)
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem isPlayerComponent data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div onClick={handlePlay} className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer">
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex flex-col justify-center gap-y-[10px] items-center w-full max-h-[760px]">
        <div className="flex flex-row gap-x-6 w-full justify-center items-center">
          <UserTips content={playerLocale('prev-page')}>
            <AiFillStepBackward onClick={onPlayPrevious} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" />
          </UserTips>
          <div onClick={handlePlay} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
            <Icon size={30} className="text-black" />
          </div>
          <UserTips content={playerLocale('next-page')}>
            <AiFillStepForward onClick={onPlayNext} size={30} className="text-neutral-400 cursor-pointer hover:text-white transition" />
          </UserTips>
        </div>
        {/* <DurationSlider songUrl={songUrl} /> */}
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          {volume === 0 ? (
            <UserTips content={playerLocale('player.unmute')}>
              <VolumeX onClick={toggleMute} className="cursor-pointer" color="white" size={32} />
            </UserTips>
          ) : (
            <UserTips content={playerLocale('player.mute')}>
              <Volume1 onClick={toggleMute} className="cursor-pointer" color="white" size={32} />
            </UserTips>
          )}
          <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}