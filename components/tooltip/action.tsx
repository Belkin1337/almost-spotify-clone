"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {action}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}