"use client";

import { Library } from "@/components/library";
import { SidebarRoutes } from "./routes/sidebar-routes";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { UserGeneric } from "@/types/entities/user";

export const Sidebar = ({ user }: { user: UserGeneric }) => {
  const { playerState } = usePlayer()

  return (
    <div className={`flex flex-col gap-y-4 ${playerState.activeId ? 'h-[calc(100%-100px)]' : 'h-full'} bg-black rounded-md`}>
      <SidebarRoutes />
      <Library user={user}/>
    </div>
  );
}