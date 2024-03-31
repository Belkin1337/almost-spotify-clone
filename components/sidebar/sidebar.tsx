"use client";

import { SidebarRoutes } from "./routes/sidebar-routes";
import { UserGeneric } from "@/types/entities/user";
import { Wrapper } from "@/ui/wrapper";
import { WidgetList } from "../static/widget/widget-list";
import { HeightPlayerState } from "@/lib/constants/ui";
import dynamic from "next/dynamic";

const Library = dynamic(() => import("@/components/sidebar/library").then(mod => mod.Library))

export const Sidebar = ({
  user
}: {
  user: UserGeneric
}) => {
  const activePlayer = HeightPlayerState();

  return (
    <div className={`flex flex-col h-full overflow-y-auto gap-y-2 rounded-lg ${activePlayer}`}>
      <SidebarRoutes />
      <Wrapper variant="library">
        {!user ? <WidgetList /> : <Library user={user} />}
      </Wrapper>
    </div>
  );
}