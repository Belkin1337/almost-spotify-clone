import { for_authors_route, profile_route, settings_route } from "@/lib/constants/routes/routes";

export const userContextMenu = ({
	push,
	locale,
	userId,
	handleLogout
} : {
	push: (href: string) => void,
	locale: {
		sidebarLocale: Function,
		navbarLocale: Function
	}
	userId: string,
	handleLogout: () => void
}) => [
	{
		name: "Профиль",
		action: () => push(`${profile_route}/${userId}`),
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