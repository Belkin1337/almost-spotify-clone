import { VariantProps, cva } from "class-variance-authority";

const wrapperVariants = cva("flex flex-col rounded-lg bg-DARK_SECONDARY_BACKGROUND", {
  variants: {
    variant: {
      page: "relative w-full",
      library: "px-2 py-4 h-full overflow-y-auto",
      main_panel: "w-full overflow-y-auto h-full",
      widget: "h-full overflow-y-auto"
    }
  },
  defaultVariants: {
    variant: "library"
  }
})

interface WrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof wrapperVariants> {
  children: React.ReactNode
}

export const Wrapper = ({
  variant,
  className,
  children,
  ...props
}: WrapperProps) => {
  return (
    <div className={wrapperVariants(({
      variant,
      className
    }))}
      {...props}
    >
      {children}
    </div>
  )
}