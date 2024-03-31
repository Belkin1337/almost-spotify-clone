import { NavbarNavigation } from "@/components/layout/main-panel/navbar/navigation/auth"
import { NavbarNavigationNoAuth } from "@/components/layout/main-panel/navbar/navigation/no-auth"
import { WidgetMoreBrandInfo } from "@/components/static/widget/more_information"
import { UserGeneric } from "@/types/entities/user"
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"

const UserMenu = dynamic(() => import("@/components/user/personal/user-menu").then(mod => mod.UserMenu))
const SearchInput = dynamic(() => import("@/components/inputs/search-input").then(mod => mod.SearchInput))

export const Navbar = ({
  user 
}: {
  user: UserGeneric
}) => {
  const pathname = usePathname();

  return (
    <div className="relative top-0 bg-transparent z-30 right-0 left-0 w-full rounded-lg">
      <div className="h-[64px] w-full flex items-center justify-between p-4">
        <div className="hidden md:flex gap-x-2 items-center">
          <NavbarNavigation />
          {pathname.includes('/home/search') && (
            <SearchInput />
          )}
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <WidgetMoreBrandInfo />
          {user ? <UserMenu user={user} /> : <NavbarNavigationNoAuth user={user} />}
        </div>
      </div>
    </div>
  )
}