"use client"

import { NavbarNavigation } from "@/components/layout/main-panel/navbar/components/navbar-navigation"
import { WidgetMoreBrandInfo } from "@/components/static/widget/components/more_information"
import { UserEntity } from "@/types/user"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query";
import { backgroundColorSampleQueryKey } from "@/lib/querykeys/file";
import { useCallback } from "react";
import { AuthForm } from "@/components/forms/auth/components/auth-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import dynamic from "next/dynamic"
import { UserMenu } from "@/components/user/components/menu/user-menu";

const SearchInput = dynamic(() => import("@/components/layout/main-panel/navbar/components/navbar-search")
	.then(mod => mod.NavbarSearch))

type NavbarType = {
	user: UserEntity,
	inView: boolean
}

export const Navbar = ({
	user,
	inView,
}: NavbarType) => {
	const { openDialog } = useDialog();

	const pathname = usePathname();
	const navbarLocale = useScopedI18n('main-service.main-part.config')

	const { data: backgroundColor } = useQuery<string, Error>({
		queryKey: backgroundColorSampleQueryKey
	});

	const handleAuth = useCallback(() => {
		if (!user) {
			openDialog({
				dialogChildren: <AuthForm />
			})
		}
	}, [openDialog, user])

	return (
		<div className={`${inView ? `relative bg-transparent` : 'absolute top-0 right-0 left-0 '} transition-all 
		duration-300 ease-in h-[64px] z-[1000] flex items-center justify-between p-4 w-full rounded-t-lg`}
				 style={{ backgroundColor: inView ? 'transparent' : backgroundColor }}
		>
			<div className="hidden md:flex gap-x-2 items-center">
				<NavbarNavigation/>
				{pathname.includes('/home/search') && (
					<SearchInput/>
				)}
			</div>
			<div className="flex justify-between items-center gap-x-4">
				<WidgetMoreBrandInfo/>
				{user ? <UserMenu user={user}/> : (
					<Button
						filter="blurred"
						variant="form"
						rounded="full"
						onClick={handleAuth}
					>
						<Typography>
							{navbarLocale('log-in')}
						</Typography>
					</Button>
				)}
			</div>
		</div>
	)
}