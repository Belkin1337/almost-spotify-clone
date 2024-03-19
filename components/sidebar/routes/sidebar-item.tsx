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
}

export const SidebarItem = ({ 
  icon: Icon, 
  label, 
  href 
}: SidebarItemProps) => {
  const { openDialog } = useDialog();
  const { push } = useRouter();
  const { data: user } = useUser();

  const handleRoute = useCallback(() => {
    if (!user) {
      return openDialog({
        title: "Войдите в аккаунт",
        dialogChildren: <AuthForm/>
      });
    }

    return push(href)
  }, [push, user, href])
  
  return (
    <div onClick={handleRoute} className="flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer 
      hover:text-white transition text-neutral-400 py-1">
      <Icon size={26} />
      <Typography>
        {label}
      </Typography>
    </div>
  );
}