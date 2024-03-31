"use client"

import { useUser } from "@/lib/hooks/actions/user/auth/use-user";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation"
import { useCallback } from "react";
import { IconType } from 'react-icons';
import { AuthForm } from "../../forms/auth";
import { Typography } from "@/ui/typography";

interface SidebarItemProps {
  icon: IconType,
  label: string;
  href: string;
  active: boolean
}

export const SidebarItem = ({
  icon: Icon,
  label,
  active,
  href
}: SidebarItemProps) => {
  const { openDialog } = useDialog();
  const { push } = useRouter();
  const { user } = useUser();

  const handleRoute = useCallback(() => {
    if (!user) {
      return openDialog({
        dialogChildren: <AuthForm />
      });
    }

    return push(href)
  }, [push, user, href, openDialog])

  const activePath = active ? 'text-white text-lg' : '!text-neutral-400 text-lg';

  return (
    <div onClick={handleRoute} className="flex flex-row items-center w-full gap-x-4 cursor-pointer py-2">
      <Icon
        size={26}
        className={activePath}
      />
      <Typography className={`${activePath} hover:text-white`}>
        {label}
      </Typography>
    </div>
  );
}