import { Fragment } from "react";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { Typography } from "@/ui/typography";
import { UserEntity } from "@/types/user";
import { UserAvatar } from "@/components/user/components/child/user-avatar/components/user-avatar";
import { USER_CONTEXT_MENUS } from "@/lib/constants/ui/menus";
import { useLogout } from "@/components/forms/auth/hooks/use-logout";

export const UserMenu = ({
	user
}: {
	user: UserEntity
}) => {
	const { push } = useRouter();
	const { logoutMutation } = useLogout()

	const navbarLocale = useScopedI18n('main-service.main-part.config');
	const sidebarLocale = useScopedI18n('main-service.sidebar.widgets');

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="fixed_medium"
					filter="blurred"
					rounded="full"
					align="centered"
					background_color="black_60"
				>
					<UserAvatar user={user} variant="navbar"/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="relative w-[200px]">
				{USER_CONTEXT_MENUS({
					locale: { navbarLocale: navbarLocale, sidebarLocale: sidebarLocale },
					userId: user?.id!,
					push: push,
					handleLogout: async () => logoutMutation.mutateAsync()
				}).map((item,
					idx) => (
					<Fragment key={item.name}>
						<DropdownMenuItem className="flex items-center py-3" onClick={item.action}>
							<Typography text_color="white" size="small" font="normal">
								{item.name}
							</Typography>
						</DropdownMenuItem>
						{idx === USER_CONTEXT_MENUS.length - 2 && <DropdownMenuSeparator/>}
					</Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}