"use client"

import { useCallback, useEffect } from "react";
import { IBackgroundStateQuery, useBackgroundStateQuery } from "@/lib/query/ui/background-state-query";
import { useControlBackgroundState } from "@/lib/hooks/ui/use-control-background-state";

export const ColoredBackground = ({
  imageUrl,
  type
}: IBackgroundStateQuery) => {
  const { data: backgroundColor } = useBackgroundStateQuery();
  const { getBackgroundSampleImage } = useControlBackgroundState();

  const setBackgroungContent = useCallback(async () => {
    if (imageUrl) {
      await getBackgroundSampleImage({
        imageUrl: imageUrl
      })
    } else if (!imageUrl && type) {
      await getBackgroundSampleImage({
        type: type
      })
    }
  }, [type, imageUrl, getBackgroundSampleImage])

  useEffect(() => {
    setBackgroungContent()
  }, [setBackgroungContent]);

  return (
    <div className={`absolute w-full top-0 right-0 left-0 h-[600px] 
    ${
      imageUrl ? '' : 'bg-gradient-to-b from-violet-700/90 to-transparent'}`}
      style={imageUrl ? {
        backgroundImage: `linear-gradient(to bottom, ${backgroundColor.imageUrl || 'transparent'}, transparent)` } :
        {}
    }
    />
  )
}