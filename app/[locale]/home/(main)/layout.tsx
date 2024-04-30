import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { Wrapper } from "@/ui/wrapper";
import { ReactNode } from "react";
import { MainPopularArtists } from "@/components/sections/main/components/lists/popular/main-popular-artists";
import { MainPopularAlbums } from "@/components/sections/main/components/lists/popular/main-popular-albums";
import {
	MainPopularUserPlaylists
} from "@/components/sections/main/components/lists/popular/main-popular-user-playlists";
import { setStaticParamsLocale } from "next-international/server";
import { getScopedI18n } from "@/locales/server";

export default async function HomeMainLayout({
	content,
	sort,
	params: { locale }
}: {
	content: ReactNode,
	sort: ReactNode,
	params: { locale: string }
}) {
	const supabase = createClient(cookies());
	const { data: { user } } = await supabase.auth.getUser()

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