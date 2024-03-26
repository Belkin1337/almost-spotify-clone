"use client"

import { useHowlerContext } from "@/lib/hooks/player/use-howler";
import { Slider } from "@/ui/slider";

interface SeekSliderProps {
  value: number,
  step?: number | 1;
  defaultValue?: number,
  max: number;
  onValueChange: (value: number[]) => void;
}

export const SeekSlider = ({ 
  value, 
  max, 
  defaultValue = 0, 
  step, 
  onValueChange 
}: SeekSliderProps) => {
  const { isLoaded } = useHowlerContext()
  
  return (
    <Slider
      defaultValue={[defaultValue]}
      value={[value]}
      step={step}
      max={max}
      onValueChange={onValueChange}
      className={`${!isLoaded && 'cursor-not-allowed'}`}
    />
  )
}