import * as React from "react"
import { InputHTMLAttributes } from "react"

import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(`flex w-full border border-transparent file:border-0 file:bg-transparent 
  file:text-sm file:font-normal focus-within:border-neutral-400 placeholder:text-neutral-400 disabled:cursor-not-allowed
  disabled:opacity-50 focus:outline-none`, {
  variants: {
    variant: {
      default: "p-4 text-md bg-neutral-800",
      global_search: "p-3",
      local_search: "px-2 py-1 text-sm"
    },
    rounded: {
      none: "rounded-none",
      full: "rounded-full",
      medium: "rounded-md"
    },
    background: {
      none: "bg-transparent",
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
    background,
    ...props
  }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants(({ variant, background, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }