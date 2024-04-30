import { for_authors_route, profile_route, settings_route } from "@/lib/constants/routes/routes";

type UserContextMenuType = {
	push: (href: string) => void,
	locale: { sidebarLocale: Function, navbarLocale: Function }
	userId: string,
	handleLogout: () => void
}

export const USER_CONTEXT_MENUS = ({
	push,
	locale,
	userId,
	handleLogout
} : UserContextMenuType) => [
	{
		name: "Профиль",
		action: () => push(profile_route(userId)),
	},
	{
		name: "Для авторов",
		action: () => push(for_authors_route),
	},
	{
		name: locale.sidebarLocale('settings-route'),
		action: () => push(settings_route),
	},
	{
		name: locale.navbarLocale('log-out'),
		action: handleLogout,
	}
]