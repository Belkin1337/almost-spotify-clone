import { Slider } from "@/ui/slider";
import { useSeek } from "@/components/player/controls/hooks/use-seek";
import { usePlayerStateQuery } from "@/lib/query/player/player-state-query";

interface ISeekSlider {
  value: number,
  step?: number | 1;
  defaultValue?: number,
  max: number;
}

export const SeekSlider = ({
  value, max, defaultValue = 0, step,
}: ISeekSlider) => {
  const { handleSliderChange } = useSeek()
  const { playerAttributes } = usePlayerStateQuery()

  return (
    <Slider
      defaultValue={[defaultValue]}
      value={[value]}
      step={step}
      max={max}
      onValueChange={(value: number[]) => handleSliderChange(value[0])}
      className={`${!playerAttributes?.isLoaded && 'cursor-not-allowed'}`}
    />
  )
}