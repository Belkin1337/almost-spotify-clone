import { SONG_TYPE_ALBUM, SONG_TYPE_SINGLE } from "@/lib/constants/preview";
import { cva, VariantProps } from "class-variance-authority";
import { useCallback } from "react";

const entityTypeVariants = cva("text-white font-medium truncate text-sm", {
  variants: {
    variant: {
      page: ""
    }
  }
})

interface EntityTypeProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof entityTypeVariants> {
    type: typeof SONG_TYPE_SINGLE | typeof SONG_TYPE_ALBUM
  }

export const EntityType = ({ 
  variant,
  className, 
  type, 
  ...props 
}: EntityTypeProps) => {
  const entityTypeFormatted = useCallback(() => {
    if (type === 'album') {
      return "Album"
    } else if (type === 'single') {
      return 'Single'
    }
  }, [type])

  return (
    <p className={entityTypeVariants(({ variant, className }))} {...props}>
      {entityTypeFormatted()}
    </p>
  )
}