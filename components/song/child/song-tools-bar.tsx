import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/ui/dropdown-menu"
import { IoIosMore } from "react-icons/io"

export const SongToolsBar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-min">
        <IoIosMore size={22} className="text-neutral-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative ">
        <DropdownMenuItem>
          Удалить из понравившихся треков
        </DropdownMenuItem>
        <DropdownMenuItem>
          Перейти к треку
        </DropdownMenuItem>
        <DropdownMenuItem>
          Перейти к артисту
        </DropdownMenuItem>
        <DropdownMenuItem>
          Поделиться
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}