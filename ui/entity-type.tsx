import { SONG_TYPE_ALBUM, SONG_TYPE_DEFAULT, SONG_TYPE_SINGLE } from "@/types/form";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const entityTypeVariants = cva("text-white font-medium capitalize truncate text-small", {
  variants: {
    variant: {
      page: ""
    }
  }
})

interface IEntityType
  extends HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof entityTypeVariants> {
    type: typeof SONG_TYPE_SINGLE | typeof SONG_TYPE_ALBUM | typeof SONG_TYPE_DEFAULT
  }

export const EntityType = ({ 
  variant,
  className, 
  type, 
  ...props 
}: IEntityType) => {
  return (
    <p className={entityTypeVariants(({ variant, className }))} {...props}>
      {type}
    </p>
  )
}