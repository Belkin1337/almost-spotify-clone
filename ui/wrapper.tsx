import { VariantProps, cva } from "class-variance-authority";

const wrapperVariants = cva("flex flex-col rounded-md bg-DARK_SECONDARY_BACKGROUND", {
  variants: {
    variant: {
      page: "relative h-full overflow-y-auto w-full",
      library: "h-full"
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