import { cva, VariantProps } from "class-variance-authority";

export const songTitleVariants = cva("", {
  variants: {
    variant: {
      default: "",
      library: "text-md font-medium",
      card: "font-bold text-lg",
      page: "font-bold text-6xl",
      player: "hover:underline hover:cursor-pointer text-sm font-medium",
      widget: "hover:underline text-xl cursor-pointer font-bold"
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

interface SongTitleProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof songTitleVariants> {
    title: string
  }

export const SongTitle = ({ 
  variant, 
  className, 
  title,
  ...props 
}: SongTitleProps) => {
  return (
    <p className={songTitleVariants(({ variant, className }))} {...props}>
      {title}
    </p>
  )
}