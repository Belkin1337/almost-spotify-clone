"use client"

import { UpdateNameForm } from "@/components/forms/personal-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/ui/dropdown-menu"
import Image from "next/image"
import { IoIosMore } from "react-icons/io";

export const UserPersonalSection = () => {
  const { openDialog } = useDialog()

  return (
    <div className="relative -top-[144px] h-full flex flex-col gap-y-4 p-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-min">
          <IoIosMore size={42} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative left-28">
          <DropdownMenuItem onClick={() => openDialog({
            title: "Данные профиля",
            dialogChildren: <UpdateNameForm />
          })}>
            Изменение профиля
          </DropdownMenuItem>
          <DropdownMenuItem>
            Копировать ссылку на профиль
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex relative top-[124px] flex-col gap-y-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            Недавно прослушано
          </p>
          <p className="text-neutral-400 text-sm">
            Видны только тебе
          </p>
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
              <p className="text-white font-semibold">
                Тест
              </p>
              <p className="text-neutral-400 text-sm">
                Исполнитель
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}