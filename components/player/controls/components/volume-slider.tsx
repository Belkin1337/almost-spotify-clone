import { Slider } from "@/ui/slider"

interface IVolumeSlider {
  defaultValue?: number;
  value: number,
  onValueChange: (value: number[]) => void;
}

export const VolumeSlider = ({ 
  defaultValue = 0, 
  value,
  onValueChange 
}: IVolumeSlider) => {
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