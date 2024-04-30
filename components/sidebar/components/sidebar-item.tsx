import { useUserQuery } from "@/lib/query/user/user-query";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useRouter } from "next/navigation"
import { useCallback } from "react";
import { IconType } from 'react-icons';
import { AuthForm } from "../../forms/auth/components/auth-form";
import { Typography } from "@/ui/typography";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

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
  const { data: user } = useUserQuery();
  const { data: resizeState } = useResizePanelsQuery()
  const { openDialog } = useDialog();
  const { push } = useRouter();

  const isExpanded = resizeState.sidebarPanel.isExpanded;
  const activePath = active ? 'text-white text-lg' : 'text-neutral-400 text-lg';

  const handleRoute = useCallback(() => {
    if (!user) openDialog({ dialogChildren: <AuthForm /> });

    return push(href)
  }, [push, user, href, openDialog])

  return (
    <div onClick={handleRoute} className="flex flex-row items-center w-full gap-x-4 cursor-pointer py-2">
      <Icon size={32} className={activePath}/>
      {isExpanded && (
        <Typography className={`${activePath} hover:text-white`}>
          {label}
        </Typography>
      )}
    </div>
  );
}