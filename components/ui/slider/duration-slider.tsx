"use client"

import { useState } from "react";

interface DurationSliderProps {
  songUrl: string
}

export const DurationSlider = ({ songUrl }: DurationSliderProps) => {
  const [duration, setDuration] = useState(0);

  return (
    <div className="bg-neutral-600 h-2 rounded-md w-full relative">
      <audio
        className="bg-white h-full"
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      >
        <source type="audio/mpeg" src={songUrl} />
      </audio>
    </div>
  )
}