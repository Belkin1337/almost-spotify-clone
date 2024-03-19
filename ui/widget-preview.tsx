"use client"

import { Card, CardContent } from "@/ui/card"
import { VariantProps, cva } from "class-variance-authority";
import { Typography } from "./typography";

const widgetVariants = cva("flex flex-col text-neutral-50 items-center font-semibold justify-center gap-y-4 bg-neutral-800 rounded-lg p-4", {
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
      <CardContent className={widgetVariants(({
        variant,
        className
      }))}>
        {title!}
        <Typography className="text-md md:text-lg">
          {description}
        </Typography>
        <div className="flex items-center justify-center bg-neutral-50 w-full p-2 rounded-xl">
          {children!}
        </div>
      </CardContent>
    </Card>
  )
}