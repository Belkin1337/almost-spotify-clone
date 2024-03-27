"use client";

import { Library } from "@/components/sidebar/library";
import { SidebarRoutes } from "./routes/sidebar-routes";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { UserGeneric } from "@/types/entities/user";
import { Wrapper } from "@/ui/wrapper";
import { WidgetList } from "../static/widget/widget-list";

export const Sidebar = ({
  user
}: {
  user: UserGeneric
}) => {
  const { playerState } = usePlayer()

  return (
    <div className={`flex flex-col gap-y-4 rounded-md ${playerState.active && user ? 'h-[calc(100%-84px)]' : 'h-full'}`}>
      <SidebarRoutes />
      <Wrapper variant="library">
        {!user ? <WidgetList /> : <Library user={user} />}
      </Wrapper>
    </div>
  );
}