"use client"

import { useScopedI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  
  const sidebarLocale = useScopedI18n('main-service.sidebar.widgets')

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: sidebarLocale('main-route'),
      active: pathname !== '/home/search',
      href: '/home',
    },
    {
      icon: BiSearch,
      label: sidebarLocale('search-route'),
      active: pathname === '/home/search',
      href: '/home/search',
    },
  ], [pathname, sidebarLocale]);

  return (
    <div className="flex flex-col gap-y-4 p-4 bg-DARK_SECONDARY_BACKGROUND rounded-md">
      {routes.map((item) => (
        <SidebarItem key={item.label} {...item} />
      ))}
    </div>
  )
}