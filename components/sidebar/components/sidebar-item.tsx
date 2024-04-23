import { useUserQuery } from "@/lib/query/user/user-query";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation"
import { useCallback } from "react";
import { IconType } from 'react-icons';
import { AuthForm } from "../../forms/auth/components/auth-form";
import { Typography } from "@/ui/typography";

interface ISidebarItem {
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
}: ISidebarItem) => {
  const { openDialog } = useDialog();
  const { push } = useRouter();
  const { data: user } = useUserQuery();

  const handleRoute = useCallback(() => {
    if (!user) {
      openDialog({
        dialogChildren: <AuthForm />
      });
    }

    return push(href)
  }, [push, user, href, openDialog])

  const activePath = active ? 'text-white text-lg' : '!text-neutral-400 text-lg';

  return (
    <div onClick={handleRoute} className="flex flex-row items-center w-full gap-x-4 cursor-pointer py-2">
      <Icon size={26} className={activePath}/>
      <Typography className={`${activePath} hover:text-white`}>
        {label}
      </Typography>
    </div>
  );
}