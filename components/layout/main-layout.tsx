"use client"

import { UserGeneric } from "@/types/entities/user"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/ui/resizable"
import { MainPanel } from "./main-panel/main-panel"
import { Sidebar } from "../sidebar/sidebar"
import { useSongWidget } from "@/lib/hooks/actions/song/widget/use-song-widget"
import { usePlayer } from "@/lib/hooks/player/use-player"
import dynamic from "next/dynamic"

const Player = dynamic(() => import('@/components/player/player').then(mod => mod.Player));
const SongWidget = dynamic(() => import('@/components/song/widget/index').then(mod => mod.SongWidget))

export const MainLayout = ({
  user,
  children
}: {
  user: UserGeneric,
  children: React.ReactNode
}) => {
  const { isSongWidgetVisible } = useSongWidget();
  const { playerState } = usePlayer();

  const activeSong = playerState.active;

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex gap-1 p-1 bg-black">
        <ResizablePanel defaultSize={270} className={`hidden md:block relative min-w-[266px] max-w-[620px]`}>
          <Sidebar user={user as UserGeneric} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={1260} className={`relative md:w-[1280px] md:min-w-[980px]`}>
          <MainPanel user={user as UserGeneric} >
            {children}
          </MainPanel>
        </ResizablePanel>
        <ResizableHandle />
        {isSongWidgetVisible && activeSong && (
          <ResizablePanel defaultSize={462} className={`hidden md:block md:max-w-[462px] md:w-[462px] md:min-w-[342px]`}>
            <SongWidget user={user as UserGeneric} />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
      <Player user={user as UserGeneric} />
    </>
  )
}