import { cva, VariantProps } from "class-variance-authority"

const artistCardVariants = cva("", {
  variants: {
    variant: {
      default: ""
    }
  }
})

interface ArtistCardProps  
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof artistCardVariants> {}

export const ArtistCard = ({
  variant,
  className,
  ...props
}: ArtistCardProps) => {
  return (
    <div className={artistCardVariants(({ variant, className }))} {...props}>
    
    </div>
  )
}