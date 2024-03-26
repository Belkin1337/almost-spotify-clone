import { ArtistEntity } from "@/types/entities/artist"
import { Typography } from "@/ui/typography"
import { cva, VariantProps } from "class-variance-authority"
import React from "react"

const artistListenersVariants = cva("text-white", {
  variants: {
    variant: {
      default: "!font-semibold text-md",
      page: "text-2xl !font-bold"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface ArtistListenersProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof artistListenersVariants> {
  artist: ArtistEntity
}

export const ArtistListeners = ({
  variant,
  className,
  artist,
  ...props
}: ArtistListenersProps) => {
  return (
    <div className={`flex gap-1
      ${variant === 'default' ? 'flex-col' :
        variant === 'page' && 'flex-row items-center'}`}
      {...props}
    >
      <Typography className={artistListenersVariants(({
        variant,
        className
      }))}>
        {artist?.listeners || 0}
      </Typography>
      <Typography className="text-sm">
        monthly listeners
      </Typography>
    </div>
  )
}