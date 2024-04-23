"use client"

import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes } from "react";

// impl formate the data logic

const timeStampVariants = cva(" ", {
  variants: {
    variant: {
      page: ""
    }
  }
})

interface ITimeStamp
  extends HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof timeStampVariants> {
    date: string | number
  }

export const Timestamp = ({ 
  variant,
  className,
  date,
  ...props
}: ITimeStamp) => {
  return (
    <p className={timeStampVariants(({ variant, className }))} {...props}>
      {date || 'null'}
    </p>
  )
}