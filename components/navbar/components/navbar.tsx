"use client"

import { NavbarNavigation } from "@/components/navbar/components/navbar-navigation"
import { WidgetMoreBrandInfo } from "@/components/static/widget/components/more_information"
import { usePathname } from "next/navigation"
import { memo, useCallback, useEffect } from "react";
import { AuthForm } from "@/components/forms/auth/components/auth-form";
import { useDialog } from "@/lib/hooks/ui/use-dialog";
import { useScopedI18n } from "@/locales/client";
import { Button } from "@/ui/button";
import { Typography } from "@/ui/typography";
import { UserMenu } from "@/components/user/components/menu/user-menu";
import { useBackgroundStateQuery } from "@/lib/query/ui/background-state-query";
import { useControlBackgroundState } from "@/lib/hooks/ui/use-control-background-state";
import { INavbar, navbarVariants } from "@/components/navbar/types/navbar-types";
import dynamic from "next/dynamic"
import { search_route } from "@/lib/constants/routes/routes";

const SearchInput = dynamic(() => import("@/components/navbar/components/navbar-search")
	.then(mod => mod.NavbarSearch))

export const Navbar = memo(({
	user, inView, type, className
}: INavbar) => {
	const { openDialog } = useDialog();
	const { data: backgroundColor } = useBackgroundStateQuery()
	const { getBackgroundSampleImage } = useControlBackgroundState();

	const pathname = usePathname();
	const navbarLocale = useScopedI18n('main-service.main-part.config')

	const handleAuth = useCallback(() => {
		if (!user) openDialog({ dialogChildren: <AuthForm/> })
	}, [openDialog, user])

	useEffect(() => {
		const getBgImage = async () => {
			await getBackgroundSampleImage({ type: undefined, imageUrl: undefined })
		}
	}, [])

	return (
		<div
			className={navbarVariants(({ type, className }))}
			style={{ backgroundColor: inView ? 'transparent' : backgroundColor.imageUrl }}
		>
			<div className="hidden md:flex gap-x-2 items-center">
				<NavbarNavigation/>
				{pathname.includes(search_route) && (<SearchInput/>)}
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
})

Navbar.displayName = "Navbar";