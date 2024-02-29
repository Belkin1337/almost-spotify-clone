"use client"

import { Card, CardContent } from "@/ui/card"
import { VariantProps, cva } from "class-variance-authority";

const widgetVariants = cva("flex flex-col items-center font-semibold justify-center gap-y-4 bg-neutral-800 rounded-lg text-neutral-50 p-4", {
  variants: {
    variant: {
      default: ""
    }
  },
  defaultVariants: {
    variant: "default"
  }
})

export interface WidgetProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof widgetVariants> {
  title?: string,
  description?: string,
  children?: React.ReactNode,
}

export const WidgetPreview = ({
  className,
  title,
  description,
  children,
  variant
}: WidgetProps) => {
  return (
    <Card>
      <CardContent className={widgetVariants(({ variant, className }))}>
        {title!}
        <p className="text-neutral-50 text-md md:text-lg truncate">
          {description}
        </p>
        {children!}
      </CardContent>
    </Card>
  )
}