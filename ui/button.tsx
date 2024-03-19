import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/styles"

const buttonVariants = cva(`flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300`, {
    variants: {
      variant: {
        default: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90",
        follow: "",
        main_play: "transition opacity-0 items-center flex bg-jade-500 p-2 translate translate-y-1/3 group-hover:opacity-100 group-hover:translate-y-0 hover:scale:105",
        page_play: "bg-jade-500 p-4 translate hover:scale:105",
        action: "font-semibold p-4 bg-jade-300 text-md truncate"
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
        default: "w-full h-full p-1 md:p-2",
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

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, rounded, size, filter, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, filter, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
