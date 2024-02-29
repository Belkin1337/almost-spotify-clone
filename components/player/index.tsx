"use client"

import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { memo } from "react";
import { PlayerVolumeControls } from "./controls/volume";
import { PlayerControls } from "./controls";
import { PlayerSongInfo } from "./info";
import { useVolume } from "@/lib/hooks/player/use-volume";
import { useAudio } from "../../lib/hooks/player/use-audio";
import { usePlayer } from "@/lib/hooks/player/use-player";

export const Player = memo(() => {
  const { playerState } = usePlayer(); 
  const { data: user } = useUser();
  const { volume, handleVolumeChange, mute, unmute } = useVolume();
  const { 
    howlInstance,
    onPlayNext,
    onPlayPrev, 
    playing, 
    song,
    position,
    duration,
    handleTogglePlay,
    handleSliderChange
  } = useAudio();

  if (!playerState.activeId || !user) {
    return null;
  }

  return (
    (howlInstance && playerState.activeId && user) ? (
      <div className="fixed bottom-0 bg-black w-full py-1 md:py-2 h-[100px] px-4">
        <div className="flex justify-between items-center  h-full">
          <PlayerSongInfo
            song={song!}
            songArr={playerState.ids}
          />
          <PlayerControls
            playing={playing}
            onTogglePlay={handleTogglePlay}
            onPlayNext={onPlayNext}
            onPlayPrev={onPlayPrev}
            currentPosition={position}
            maxDuration={duration}
            duration={duration}
            onSliderChange={(value: number[]) => {
              handleSliderChange(value[0])
            }}
          />
          <PlayerVolumeControls
            onValueChange={(value: number[]) => {
              handleVolumeChange(value[0])
            }}
            mute={mute}
            unmute={unmute}
            volume={volume}
          />
        </div>
      </div>
    ) : null
  )
})

Player.displayName = "Player";