import * as React from "react"

import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const inputVariants = cva(`flex w-full bg-neutral-800 border border-transparent text-md file:border-0 file:bg-transparent 
  file:text-sm file:font-medium focus-within:border-neutral-300 placeholder:text-neutral-400 disabled:cursor-not-allowed
  disabled:opacity-50 focus:outline-none`, {
  variants: {
    variant: {
      default: "p-4",
      search: "p-3"
    },
    rounded: {
      none: "rounded-none",
      full: "rounded-full",
      medium: "rounded-md"
    }
  },
  defaultVariants: {
    variant: "default",
    rounded: "medium"
  }
})

export interface IInput
  extends InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, IInput>(
  ({
    className,
    variant,
    rounded,
    type,
    ...props
  }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants(({ variant, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }