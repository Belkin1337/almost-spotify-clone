import { getColorAverage } from "@/lib/tools/image-color-sampling";
import { useEffect, useState } from "react";

export const ColoredBackground = ({
  imageUrl
}: {
  imageUrl: string | null
}) => {
  const [imgColor, setImgColor] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageColor = async () => {
      const output = await getColorAverage(imageUrl || "/images/liked.png");

      setImgColor(output);
    };

    fetchImageColor();
  }, [imageUrl])

  return (
    <div className="absolute w-full top-0 right-0 left-0  h-[600px]"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${imgColor || 'transparent'}, transparent)`
      }}
    />
  )
}