import { Wrapper } from "@/ui/wrapper";
import { ReactNode } from "react";
import { MainPopularArtists } from "@/components/sections/main/components/lists/popular/main-popular-artists";
import { MainPopularAlbums } from "@/components/sections/main/components/lists/popular/main-popular-albums";
import {
	MainPopularUserPlaylists
} from "@/components/sections/main/components/lists/popular/main-popular-user-playlists";
import { setStaticParamsLocale } from "next-international/server";
import { getScopedI18n } from "@/locales/server";
import { getUser } from "@/lib/helpers/get-user";
import { PageTypes } from "@/types/page-convention";

type HomeMainLayoutProps = {
	content: ReactNode,
	sort: ReactNode
} & PageTypes

export default async function HomeMainLayout({
	content, sort, params
}: HomeMainLayoutProps) {
	const { locale } = await params;
	
	const user = await getUser({ withValidation: false })
	setStaticParamsLocale(locale);
	
	const mainPageLocale = await getScopedI18n('main-service.pages.main-content.navbar')

	return (
		<Wrapper variant="page">
			{user ? (
				<div className="flex flex-col items-start gap-y-6 p-6">
					<h1 className="text-white text-4xl font-semibold">
						{mainPageLocale('welcome-message')}
					</h1>
					{sort}
					{content}
				</div>
			) : (
				<div className="flex flex-col items-start gap-12 p-6">
					<MainPopularArtists />
					<MainPopularAlbums/>
					<MainPopularUserPlaylists/>
				</div>
			)}
		</Wrapper>
	)
}