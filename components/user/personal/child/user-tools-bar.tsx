"use client"

import { UpdateNameForm } from "@/components/forms/user/personal-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/ui/dropdown-menu"
import { IoIosMore } from "react-icons/io";

export const UserToolsBar = () => {
  const { openDialog } = useDialog()

  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="w-min">
      <IoIosMore size={42} />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="relative left-28">
      <DropdownMenuItem onClick={() => openDialog({
        dialogChildren: <UpdateNameForm />
      })}>
        Изменение профиля
      </DropdownMenuItem>
      <DropdownMenuItem>
        Копировать ссылку на профиль
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}