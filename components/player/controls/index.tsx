"use client"

import { durationConverter } from "@/lib/tools/duration-converter"
import { SeekSlider } from "../sliders/seek-slider"
import { PlayerNextSong } from "./next-song"
import { PlayerPlayPause } from "./play-pause"
import { PlayerPrevSong } from "./prev-song"
import { Typography } from "@/ui/typography"

interface PlayerControlsGeneric {
  onTogglePlay: () => void,
  onPlayNext: () => void,
  onPlayPrev: () => void,
  currentPosition: number,
  duration: number,
  maxDuration: number,
  playing: boolean,
  onSliderChange: (value: number[]) => void
}

export const PlayerControls = ({
  duration,
  maxDuration,
  onPlayNext,
  onPlayPrev,
  onSliderChange,
  onTogglePlay,
  playing,
  currentPosition
}: PlayerControlsGeneric) => {
  const currentDuration = durationConverter(duration);
  const displayPosition = durationConverter(currentPosition)

  return (
    <>
      <PlayerPlayPause variant="mobile" state={playing} onClick={onTogglePlay} />
      <div className="hidden h-full md:flex flex-col justify-center gap-y-[8px] items-center w-[40%] max-h-[760px]">
        <div className="flex flex-row gap-x-6 w-full justify-center items-center">
          <PlayerPrevSong onClick={onPlayPrev} />
          <PlayerPlayPause state={playing} onClick={onTogglePlay} />
          <PlayerNextSong onClick={onPlayNext} />
        </div>
        <div className="flex items-center gap-x-2 w-full">
          <Typography variant="secondary">
            {displayPosition}
          </Typography>
          <SeekSlider 
            max={maxDuration} 
            value={currentPosition} 
            onValueChange={onSliderChange} 
          />
          <Typography variant="secondary">
            {currentDuration}
          </Typography>
        </div>
      </div>
    </>
  )
}