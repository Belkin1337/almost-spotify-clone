"use client"

import { VolumeSlider } from "../../sliders/volume-slider"
import { PlayerFullscreenControls } from "../fullscreen"
import { PlayerToggleVolume } from "./toggle-volume"

interface PlayerVolumeControlsGeneric {
  mute: () => void,
  unmute: () => void,
  volume: number,
  onValueChange: (value: number[]) => void
}

export const PlayerVolumeControls = ({
  mute,
  unmute,
  onValueChange,
  volume
}: PlayerVolumeControlsGeneric) => {
  return (
    <div className="hidden md:flex items-center gap-x-4 w-[30%] h-full justify-end">
      <div className="flex items-center gap-x-4 w-[130px]">
        <PlayerToggleVolume
          mute={mute}
          unmute={unmute}
          volume={volume}
        />
        <VolumeSlider
          value={volume}
          onValueChange={onValueChange}
        />
      </div>
      <PlayerFullscreenControls />
    </div>
  )
}