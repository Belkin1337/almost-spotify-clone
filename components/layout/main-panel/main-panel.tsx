"use client"

import { UserGeneric } from "@/types/entities/user";
import { HeightPlayerState } from "@/lib/constants/ui";
import { Wrapper } from "@/ui/wrapper";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/layout/main-panel/navbar/navbar").then(mod => mod.Navbar))

export const MainPanel = ({
  user,
  children
}: {
  user: UserGeneric,
  children: React.ReactNode
}) => {
  const activePlayer = HeightPlayerState();

  return (
    <Wrapper variant="main_panel" className={activePlayer}>
      <Navbar user={user} />
      {children}
    </Wrapper>
  );
}