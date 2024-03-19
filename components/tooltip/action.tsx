"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/ui/tooltip"

export const UserTips = ({
  children,
  action
}: {
  children: React.ReactNode,
  action: string
}) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        {action}
      </TooltipContent>
    </Tooltip>
  )
}