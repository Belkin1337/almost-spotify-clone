import { Tooltip, TooltipContent, TooltipTrigger, } from "@/ui/tooltip"
import { UserTipsType } from "@/components/tooltip/types/tooltip-types";

export const UserTips = ({
  children,
  action
}: UserTipsType) => {
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