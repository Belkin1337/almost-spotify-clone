import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

export const songTitleVariants = cva("", {
  variants: {
    variant: {
      default: "",
      library: "text-medium font-medium",
      card: "font-bold text-lg",
      page: "font-bold text-6xl",
      player: "hover:underline hover:cursor-pointer text-sm font-medium",
      widget: "hover:underline text-xl cursor-pointer font-bold",
      select: "truncate font-medium text-sm"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface ISongTitle
  extends HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof songTitleVariants> {
    title: string
  }

export const SongTitle = ({ 
  variant, 
  className, 
  title,
  ...props 
}: ISongTitle) => {
  return (
    <p className={songTitleVariants(({ variant, className }))} {...props}>
      {title}
    </p>
  )
}