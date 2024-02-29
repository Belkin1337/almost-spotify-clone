"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils/styles"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-[4px] group w-full grow overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
      <SliderPrimitive.Range className="absolute h-full bg-neutral-100 group-hover:dark:bg-jade-500 group-hover:dark:duration-300 duration-300 dark:bg-neutral-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={`hidden group-hover:block h-[10px] w-[10px] rounded-full 
    border-2 border-neutral-900 bg-white ring-offset-white 
    transition-colors focus-visible:outline-none focus-visible:ring-1 
    focus-visible:ring-neutral-950 focus-visible:ring-offset-2 
    disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-50
      dark:focus-visible:ring-neutral-300`} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }