import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/styles"

const buttonVariants = cva(`flex items-center 
  justify-center whitespace-nowrap ring-offset-white 
  transition-colors focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-neutral-950 focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50 
  dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300`, {
  variants: {
    variant: {
      default: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90",
      follow: "",
      single_medium: `transition opacity-0 bg-jade-500 p-2 h-[36px] w-[36px] 
      translate translate-y-1/3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale:105`,
      single_page: "bg-jade-500 p-4 translate hover:scale:105 h-[56px] w-[56px]",
      action: "font-semibold p-4 bg-jade-300 text-md truncate",
      form: `rounded-full relative bg-neutral-700 text-white text-sm 
      hover:shadow-2xl hover:shadow-jade-400/[0.1] transition duration-200
      hover:bg-neutral-800 transition border-transparent w-full border hover:border-neutral-600`,
      album_playlist: ""
    },
    filter: {
      blurred: "backdrop-filter backdrop-blue-md"
    },
    rounded: {
      none: "rounded-none",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },
    size: {
      default: "p-1 md:p-2",
      fixed_medium: "h-[42px] w-[42px] p-1",
      sm: "h-9 rounded-md px-3",
      md: "h-[36px] w-[36px]",
      lg: "h-[56px] w-[56px]",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
    rounded: "none"
  },
}
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant,
  rounded,
  size,
  filter,
  asChild = false,
  ...props },
  ref
) => {
  const Comp = asChild ? Slot : "button";
  
  return (
    <>
      <Comp
        ref={ref}
        className={cn(buttonVariants({
          variant,
          size,
          filter,
          rounded,
          className
        }))}
        {...props}
      />
    </>
  )
}
)
Button.displayName = "Button"

export { Button, buttonVariants }
