"use client"

import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      link: "hover:underline cursor-pointer",
      page_title: "text-3xl font-semibold",
      subtitle: "text-neutral-400 text-medium font-medium",
      song_table_list_attribute: "text-neutral-400 text-[0.9rem] font-medium"
    },
    text_color: {
      white: "text-white",
      gray: "text-neutral-400",
      black: "text-black",
      jade: "text-jade-500"
    },
    align: {
      left: "text-left",
      right: "text-right",
      centered: "text-center"
    },
    size: {
      default: "text-medium",
      super_small: "text-[12px]",
      small: "text-sm",
      medium: "text-sm md:text-medium",
      base: "text-base",
      large: "text-base md:text-lg",
      xl: "text-lg md:text-xl",
      attributes: "text-[0.9rem]"
    },
    font: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
  },
})

interface ITypographyVariants
  extends HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof typographyVariants> { }

export const Typography = ({
  variant,
  text_color,
  align,
  size,
  font,
  className,
  ...props
}: ITypographyVariants) => {
  return (
    <p className={typographyVariants(({
      variant,
      align,
      size,
      text_color,
      font,
      className
    }))}
      {...props}
    />
  )
}