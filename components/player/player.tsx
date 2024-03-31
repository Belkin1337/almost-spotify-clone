"use client"

import { PlayerVolumeControls } from "./controls/volume";
import { PlayerControls } from "./controls/player-controls";
import { PlayerSongInfo } from "./info/player-info";
import { useVolume } from "@/lib/hooks/player/controls/use-volume";
import { useHowler } from "@/lib/hooks/player/use-howler";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { UserGeneric } from "@/types/entities/user";

export const Player = ({
  user
}: {
  user: UserGeneric
}) => {
  const { playerState } = usePlayer();
  const {
    volume,
    handleVolumeChange,
    mute,
    unmute
  } = useVolume();
  const {
    howlInstance,
    onPlayNext,
    onPlayPrev,
    playing,
    song,
    position,
    raw,
    handleTogglePlay,
    handleSliderChange
  } = useHowler();

  if (!user || !song) return;

  return (
    (howlInstance && playerState.active) && (
      <div className="fixed bottom-0 bg-black w-full py-1 md:py-2 min-h-[88px] max-h-[88px] px-4">
        <div className="flex justify-stretch items-center h-full w-full">
          <PlayerSongInfo
            song={song}
            list={playerState.ids}
          />
          <PlayerControls
            playing={playing}
            onTogglePlay={handleTogglePlay}
            onPlayNext={onPlayNext}
            onPlayPrev={onPlayPrev}
            currentPosition={position}
            maxDuration={raw}
            duration={raw}
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
    )
  )
}