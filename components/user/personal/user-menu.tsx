"use client"

import React, { cloneElement, useCallback, useEffect } from "react";
import { useLogout } from "@/lib/hooks/actions/user/auth/use-logout";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { MdOutlineSettings } from "react-icons/md";
import { UserAvatar } from "./child/user-avatar";
import { Typography } from "@/ui/typography";
import { UserGeneric } from "@/types/entities/user";
import { for_authors_route, profile_route, settings_route } from "@/lib/constants/routes";
import { IoMdMusicalNote } from "react-icons/io";
import { useSignIn } from "@/lib/hooks/actions/user/auth/use-auth";
import { toast } from "@/lib/hooks/ui/use-toast";

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

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      toast({
        title: navbarLocale("toast.log-out"),
        variant: "right"
      });

      push("/");
    }
  }, [logoutMutation.isSuccess, navbarLocale, push])

  const userContextMenu = [
    {
      name: "Профиль",
      action: () => push(`${profile_route}/${user.id}`),
      icon: <AiOutlineUser />,
    },
    {
      name: "Для авторов",
      action: () => push(for_authors_route),
      icon: <IoMdMusicalNote />,
    },
    {
      name: sidebarLocale('settings-route'),
      action: () => push(settings_route),
      icon: <MdOutlineSettings />,
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
      <DropdownMenuContent className="relative w-[240px] right-6">
        {userContextMenu.map((item, idx) => (
          <React.Fragment key={item.name}>
            <DropdownMenuItem
              className="flex px-4 py-3 items-center cursor-pointer hover:bg-neutral-700 rounded-md group gap-x-1"
              onClick={item.action}
            >
              {/* {item.icon && cloneElement(item.icon, { 
              size: 20, 
              className: item.name === "Для авторов" ? 'fill-[#ffd700]' : 'text-neutral-400 hover:text-white'
            })} */}
              <Typography
                variant="secondary"
                size="md"
                className="text-white font-medium"
              >
                {item.name}
              </Typography>
            </DropdownMenuItem>
            {idx === userContextMenu.length - 2 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}