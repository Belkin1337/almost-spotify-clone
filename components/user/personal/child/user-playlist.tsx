"use client"

import { Typography } from "@/ui/typography";
import { UserToolsBar } from "./user-tools-bar";
import Image from "next/image"

export const UserPlaylist = () => {
  return (
    <div className="relative flex flex-col gap-y-4 p-6">
      <UserToolsBar/>
      <div className="flex relative  flex-col gap-y-4">
        <div className="flex flex-col">
          <Typography className="text-white text-2xl font-semibold">
            Недавно прослушано
          </Typography>
          <Typography className="!text-neutral-400 text-sm">
            Видны только тебе
          </Typography>
        </div>
        <div className="w-full flex flex-items-start flex-wrap gap-2">
          <div className="flex flex-col gap-2 rounded-md p-4 bg-neutral-900 hover:bg-neutral-800 cursor-pointer">
            <Image
              src="/images/liked.png"
              alt="Song or playlist"
              width={400}
              height={400}
              className="w-[160px] h-[160px] object-cover rounded-full"
            />
            <div className="flex flex-col">
              <Typography className="text-white font-semibold">
                Тест
              </Typography>
              <Typography className="!text-neutral-400 text-sm">
                Исполнитель
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}