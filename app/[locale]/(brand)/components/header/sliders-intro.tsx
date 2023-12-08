"use client"

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const animation = { duration: 256000, easing: (t: number) => t }

const sliderItem = (
  <div className="keen-slider__slide bg-white">
    <div className="flex items-center overflow-hidden h-[220px] w-[440px]">
      <img src="/images/bg.png" className="object-cover" />
    </div>
  </div>
)

export const SlidersIntro = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider absolute right-0 left-0 -rotate-1">
      {sliderItem}
      {sliderItem}
      {sliderItem}
      {sliderItem}
      {sliderItem}
      {sliderItem}
      {sliderItem}
    </div>
  )
}
