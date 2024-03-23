import { NavbarNavigation } from "@/components/layout/main-panel/navbar/navigation/auth"
import { NavbarNavigationNoAuth } from "@/components/layout/main-panel/navbar/navigation/no-auth"
import { UserMenu } from "@/components/user/personal/user-menu"
import { WidgetMoreBrandInfo } from "@/components/static/widget/more_information"
import { UserGeneric } from "@/types/entities/user"

export const Navbar = ({
  inView,
  user 
}: {
  inView: boolean,
  user: UserGeneric
}) => {
  return (
    <div className={`${inView ? 'relative top-0 bg-transparent' : 'sticky top-0 bg-green-600/40'} 
    z-30 right-0 left-0 w-full rounded-md`}>
      <div className="h-[64px] w-full flex items-center justify-between p-4">
        <div className="hidden md:flex gap-x-2 items-center">
          <NavbarNavigation />
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <WidgetMoreBrandInfo />
          {user ? <UserMenu user={user} /> : <NavbarNavigationNoAuth user={user} />}
        </div>
      </div>
    </div>
  )
}