import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { SidebarItem } from "./sidebar-item";
import { home_route, search_route } from "@/lib/constants/routes/routes";

export const SidebarRoutes = () => {
  const locale = useCurrentLocale();
  const pathname = usePathname();
  const sidebarLocale = useScopedI18n('main-service.sidebar.widgets')

  const routes = [
    {
      icon: HiHome,
      label: sidebarLocale('main-route'),
      active: pathname === `/${locale}/home`,
      href: home_route,
    },
    {
      icon: BiSearch,
      label: sidebarLocale('search-route'),
      active: pathname === `/${locale}/search`,
      href: search_route,
    },
  ]

  return (
    <div className="flex flex-col gap-y-4 p-4 bg-DARK_SECONDARY_BACKGROUND rounded-md">
      {routes.map((item) => (
        <SidebarItem key={item.label} {...item}/>
      ))}
    </div>
  )
}