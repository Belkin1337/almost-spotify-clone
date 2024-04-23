import { FullscreenExpand } from "@/ui/icons/fullscreen-expand";
import { UserTips } from "@/components/tooltip/components/action";

export const PlayerFullscreenControls = () => {
  return (
    <UserTips action="Full screen">
      <FullscreenExpand />
    </UserTips>
  )
}