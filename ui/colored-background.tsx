import { getColorAverage } from "@/lib/tools/image-color-sampling";
import { useCallback, useEffect, useState } from "react";

export const ColoredBackground = ({
  imageUrl
}: {
  imageUrl?: string | null
}) => {
  const [imgColor, setImgColor] = useState<string | null>(null);

  const setColorAverage = useCallback(async () => {
    if (imageUrl) {
      const output = await getColorAverage(imageUrl);
      setImgColor(output)
    }
  }, [imageUrl])

  useEffect(() => {
    setColorAverage();
  }, [setColorAverage])

  return (
    <div className={`absolute w-full top-0 right-0 left-0 h-[600px] ${!imageUrl ? 'bg-gradient-to-b from-violet-700/90 to-transparent' : ''}`}
      style={imageUrl ? { backgroundImage: `linear-gradient(to bottom, ${imgColor || 'transparent'}, transparent)` } : {}}
    />
  )
}