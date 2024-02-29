"use client"

import { useScopedI18n } from "@/locales/client"
import { CiClock2 } from "react-icons/ci";

export const SongListTableHead = () => {
  const configLocale = useScopedI18n('main-service.main-part.config')

  return (
    <div className="flex flex-col gap-y-2 w-full h-[44px] px-10 py-6">
      <div className="grid grid-rows-1 grid-cols-2 items-center gap-y-4 w-full">
        <div className="flex flex-row items-center">
          <p className="text-neutral-400 text-[0.9rem] font-medium pl-3">
            #
          </p>
          <p className="text-neutral-400 text-[0.9rem] font-medium pl-6">
            {configLocale('song-attributes.song-name')}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-neutral-400 text-[0.9rem] font-medium">
            Альбом
          </p>
          <p className="text-neutral-400 text-[0.9rem] font-medium">
            Дата добавления
          </p>
          <div className="overflow-hidden pr-3">
            <CiClock2 size={22} />
          </div>
        </div>
      </div>
      <hr className="border border-neutral-700 w-full h-[1px]" />
    </div>
  )
}