"use client"

import { Slider } from "@/components/ui/slider"

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

export const VolumeSlider = ({ value = 1, onChange }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  return (
    <Slider
      max={1}
      defaultValue={[1]}
      value={[value]}
      step={0.1}
      onValueChange={handleChange}
    />
  )
}