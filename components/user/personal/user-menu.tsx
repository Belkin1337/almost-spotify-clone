"use client"

import React, { cloneElement, useCallback } from "react";
import { useLogout } from "@/lib/hooks/actions/user/auth/use-logout";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { MdOutlineSettings } from "react-icons/md";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { UserAvatar } from "./child/user-avatar";
import { Typography } from "@/ui/typography";
import { UserGeneric } from "@/types/entities/user";
import { for_authors_route, profile_route, settings_route } from "@/lib/constants/routes";
import { IoMdMusicalNote } from "react-icons/io";

export const UserMenu = ({ 
  user 
}: { 
  user: UserGeneric 
}) => {
  const { push } = useRouter();

  const logoutMutation = useLogout();

  const navbarLocale = useScopedI18n('main-service.main-part.config');
  const sidebarLocale = useScopedI18n('main-service.sidebar.widgets');

  const handleLogout = useCallback(() => {
    logoutMutation.mutate()

  }, [logoutMutation])
  
  if (logoutMutation.isSuccess) {
    push("/");
  }

  const userContextMenu = [
    {
      name: "Профиль",
      action: () => push(`${profile_route}/${user.id}`),
      icon: <AiOutlineUser /> as JSX.Element,
    },
    {
      name: "Для авторов",
      action: () => push(for_authors_route),
      icon: <IoMdMusicalNote /> as JSX.Element,
    },
    {
      name: sidebarLocale('settings-route'),
      action: () => push(settings_route),
      icon: <MdOutlineSettings /> as JSX.Element,
    },
    {
      name: navbarLocale('log-out'),
      action: handleLogout,
      icon: null
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="fixed_medium"
          filter="blurred"
          rounded="full"
          className="bg-black/60 overflow-hidden"
        >
          <UserAvatar user={user} variant="navbar" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative right-6">
        {userContextMenu.map((item) => (
          <DropdownMenuItem
            key={item.name}
            className="flex p-3 items-center cursor-pointer group gap-x-1"
            onClick={item.action}
          >
            {item.icon && cloneElement(item.icon, { 
              size: 20, 
              className: item.name === "Для авторов" ? 'fill-[#ffd700]' : 'text-neutral-400 hover:text-white'
            })}
            <Typography
              variant="secondary"
              size="md"
              className="group-hover:text-white"
            >
              {item.name}
            </Typography>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}