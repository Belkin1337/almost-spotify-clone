"use client";

import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { Song } from "@/types";
import { twMerge } from "tailwind-merge";
import { usePlayer } from "@/hooks/use-player";

import { HiHome } from "react-icons/hi"
import { Box } from "../ui/box";
import { SidebarItem } from "./sidebar-item";
import { Library } from "../library/library";
import { Settings } from 'lucide-react';
import { useScopedI18n } from "@/locales/client";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[]
};

export const Sidebar = ({ children, songs }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();
  const sidebarLocale = useScopedI18n('main-service.sidebar.widgets')
  
  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: sidebarLocale('main-route'),
      active: pathname !== '/home/search',
      href: '/home',
    },
    // {
    //   icon: BiSearch,
    //   label: sidebarLocale('search-route'),
    //   active: pathname === '/home/search',
    //   href: '/home/search',
    // },
    {
      icon: Settings,
      label: sidebarLocale('settings-route'),
      active: pathname === '/home/settings',
      href: '/home/settings',
    }
  ], [pathname]);

  return (
    <div className={twMerge(`flex h-full bg-black`, player.activeId && "h-[calc(100%-80px)")}>
      <div className="hidden md:flex flex-col gap-y-2 bg-black w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="min-h-screen flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}