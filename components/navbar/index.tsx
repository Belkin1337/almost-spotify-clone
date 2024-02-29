"use client"

import { Button } from "@/ui/button";
import { UserMenu } from "@/components/user/personal/user-menu";
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { TargetToBrand } from "../widgets/brand/target-to-brand";
import { NavbarNavigation } from "./navigation/auth";
import { NavbarNavigationNoAuth } from "./navigation/no-auth";
import { usePlayer } from "@/lib/hooks/player/use-player";
import { UserGeneric } from "@/types/entities/user";

export const Navbar = ({ 
  children, user
}: { 
  children: React.ReactNode,
  user: UserGeneric
}) => {
  const { playerState } = usePlayer();

  return (
    <div className={`bg-DARK_SECONDARY_BACKGROUND overflow-y-auto relative rounded-md w-full ${playerState.activeId ? 'h-[calc(100%-100px)]' : 'h-full'}`}>
      <div className={`relative top-0 bg-gradient-to-tr from-green-400 to-green-900 right-0 left-0 w-full rounded-md`}>
        <div className="h-[84px] w-full flex items-center justify-between p-4">
          <div className="hidden md:flex gap-x-2 items-center">
            <NavbarNavigation />
          </div>
          <div className="flex md:hidden gap-x-2 items-center">
            <Button size="fixed_medium" filter="blurred" rounded="full" className="bg-black/60">
              <HiHome size={20} className="fill-neutral-400" />
            </Button>
            <Button size="fixed_medium" filter="blurred" rounded="full" className="bg-black/60">
              <BiSearch size={20} className="fill-neutral-400" />
            </Button>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            {user ? (
              <>
                <TargetToBrand />
                <UserMenu user={user} />
              </>
            ) : (
              <NavbarNavigationNoAuth user={user} />
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}