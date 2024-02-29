"use client"

import { VolumeSlider } from "../../sliders/volume-slider"
import { PlayerToggleVolume } from "../toggle-volume"

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
    <div className="hidden md:flex w-1/6 justify-end">
      <div className="flex items-center gap-x-2 w-[120px]">
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
    </div>
  )
}