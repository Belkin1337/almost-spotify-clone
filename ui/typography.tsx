"use client"

import { VariantProps, cva } from "class-variance-authority"

const typographyVariants = cva("", {
  variants: {
    variant: {
      default: "text-white font-medium",
      secondary: "text-neutral-400",
      link: "text-neutral-400 hover:underline cursor-pointer"
    },
    size: {
      default: "text-md",
      sm: "text-sm",
      md: "text-sm md:text-md",
      large: "text-base md:text-lg",
      xl: "text-lg md:text-xl"
    },
    font: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
})

interface TypographyVariantsProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof typographyVariants> { }

export const Typography = ({
  variant,
  className,
  ...props
}: TypographyVariantsProps) => {
  return (
    <p className={typographyVariants(({
      variant,
      className
    }))}
      {...props}
    />
  )
}