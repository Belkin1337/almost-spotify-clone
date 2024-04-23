"use client"

import { useImageBackgroundColor } from "@/lib/hooks/image/use-image-background-color";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { backgroundColorSampleQueryKey } from "@/lib/querykeys/file";

export interface ColoredBackgroundType {
  imageUrl?: string | null;
  color?: string | null;
}

export const ColoredBackground = ({
  imageUrl,
  color
}: ColoredBackgroundType) => {
  const { data: backgroundColor } = useQuery({
    queryKey: backgroundColorSampleQueryKey
  });

  const { handleBackgroundColor } = useImageBackgroundColor();

  useEffect(() => {
    if (imageUrl) {
      handleBackgroundColor({ imageUrl })
    } else if (color && !imageUrl) {
      handleBackgroundColor({ color });
    } else if (!color && !imageUrl) {
      handleBackgroundColor({
        color: '#262626'
      })
    }
  }, [handleBackgroundColor, imageUrl, color]);

  return (
    <div className={`absolute w-full top-0 right-0 left-0 h-[600px] 
    ${!imageUrl ? 'bg-gradient-to-b from-violet-700/90 to-transparent' : ''}`}
      style={imageUrl ? { backgroundImage: `linear-gradient(to bottom, 
      ${backgroundColor || 'transparent'}, transparent)` } :
        {}}
    />
  )
}