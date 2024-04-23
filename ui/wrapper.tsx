import { VariantProps, cva } from "class-variance-authority";
import React, { HTMLAttributes } from "react";

const wrapperVariants = cva("flex flex-col overflow-y-auto rounded-lg bg-DARK_SECONDARY_BACKGROUND", {
  variants: {
    variant: {
      page: "relative pt-[64px] w-full",
      library: "pl-2 py-4 h-full",
      main_panel: "w-full",
      widget: "",
    }
  },
  defaultVariants: {
    variant: "library"
  }
})

interface IWrapper
  extends HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof wrapperVariants> {}

export const Wrapper = ({
  variant,
  className,
  ...props
}: IWrapper) => {
  return (
    <div className={wrapperVariants(({
      variant,
      className
    }))}
      {...props}
    />
  )
}