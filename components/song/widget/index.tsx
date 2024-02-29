"use client"

import { useLoadImage } from "@/lib/hooks/image/use-load-image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react"
import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useCallback } from "react";
import { ResizableHandle, ResizablePanel } from "@/ui/resizable";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { useSongWidget } from "@/lib/hooks/actions/song/use-song-widget";
import Image from "next/image";
import { Typography } from "@/ui/typography";

export const SongWidget = () => {
  const { isSongWidgetVisible, toggleSongWidget } = useSongWidget()
  const { push } = useRouter();
  const { getActiveSong } = usePlayer();
  const { data: user } = useUser();
  const { playerState } = usePlayer();
  const activeSong = getActiveSong();
  const songimagePath = useLoadImage(activeSong!);

  const toggleDisplay = useCallback(() => {
    toggleSongWidget();
  }, [toggleSongWidget]);

  if (!user || !playerState.activeId) {
    return null
  }

  return (
    isSongWidgetVisible && (
      <>
        <ResizableHandle />
        <ResizablePanel defaultSize={462} className={`hidden md:block md:max-w-[462px] md:w-[462px] md:min-w-[342px] p-1`}>
          <div className={`${playerState.activeId ? 'h-[calc(100%-100px)]' : 'h-full'} bg-DARK_SECONDARY_BACKGROUND overflow-y-auto p-4 rounded-md`}>
            <div className="flex flex-col gap-y-4 w-full">
              <div className="flex items-center justify-between">
                <Typography onClick={() => push(`/home/artist/${activeSong?.author}`)} font="bold" variant="link">
                  {activeSong?.author}
                </Typography>
                <div onClick={toggleDisplay} className="relative cursor-pointer rounded-sm opacity-70 transition hover:opacity-100 focus:outline-none 
                disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-500 dark:ring-offset-neutral-950 
                dark:focus:ring-neutral-300 dark:data-[state=open]:bg-neutral-800 dark:data-[state=open]:text-neutral-400">
                  <X className="h-6 w-6" />
                </div>
              </div>
              <div className="relative aspect-square w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={songimagePath || "/images/liked.png"}
                  width={660}
                  height={660}
                  alt={activeSong?.title || ''}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p onClick={() => push(`/home/track/${activeSong?.id}`)} className="hover:underline text-xl cursor-pointer font-bold truncate">
                  {activeSong?.title}
                </p>
                <p onClick={() => push(`/home/artist/${activeSong?.author}`)} className="hover:underline text-xl cursor-pointer text-neutral-400 font-bold truncate">
                  {activeSong?.author}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-col h-[240px] overflow-hidden p-4 rounded-lg bg-cover bg-center" style={{
                  backgroundImage: `url("/images/ob.jpg")`
                }}>
                  <div className="flex flex-col">
                    <p className="text-white text-lg font-bold">
                      Об исполнителе
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 bg-neutral-700 rounded-b-lg p-4">
                  <p onClick={() => push(`/home/artist/${activeSong?.author}`)} className="hover:underline text-md cursor-pointer text-white font-bold truncate">
                    {activeSong?.author}
                  </p>
                  <p className="text-sm text-neutral-400 font-bold whitespace-pre-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse iure magnam aspernatur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </>
    )
  )
}