"use client"

import { cva, VariantProps } from "class-variance-authority"

// impl formate the data logic

const timeStampVariants = cva(" ", {
  variants: {
    variant: {
      page: ""
    }
  }
})

interface TimeStampProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof timeStampVariants> {
    date: string | number
  }

export const Timestamp = ({ 
  variant,
  className,
  date,
  ...props
}: TimeStampProps) => {
  return (
    <p className={timeStampVariants(({ variant, className }))} {...props}>
      {date || 'null'}
    </p>
  )
}