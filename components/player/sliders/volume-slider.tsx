"use client"

import { Slider } from "@/ui/slider"

interface VolumeSliderProps {
  defaultValue?: number;
  value: number,
  step?: number | 0.02,
  onValueChange: (value: number[]) => void;
}

export const VolumeSlider = ({ 
  defaultValue = 0, 
  value, 
  step, 
  onValueChange 
}: VolumeSliderProps) => {
  return (
    <Slider
      max={1}
      defaultValue={[defaultValue]}
      value={[value]}
      step={0.02}
      onValueChange={onValueChange}
    />
  )
}