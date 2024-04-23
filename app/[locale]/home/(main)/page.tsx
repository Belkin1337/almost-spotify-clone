import { setStaticParamsLocale } from 'next-international/server';
import {
	FollowedTracksButton
} from '@/components/static/button/components/redirect-follow-button/components/redirect-follow-list-button'
import { MainTracksList } from '@/components/lists/main/main-tracks-list';
import { getScopedI18n } from '@/locales/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server/supabase-server';
import { Wrapper } from "@/ui/wrapper";
import { Badge } from "@/ui/badge";

export default async function HomeMainPage({
	params: { locale }
}: {
	params: { locale: string }
}) {
	const supabase = createClient(cookies());

	setStaticParamsLocale(locale);

	const { data: { user } } = await supabase.auth.getUser()

	const mainPageLocale = await getScopedI18n('main-service.pages.main-content.navbar')

	return (
		<Wrapper variant="page">
			{user ? (
				<div className="flex flex-col items-start gap-12 p-6">
					<h1 className="text-white text-4xl font-semibold">
						{mainPageLocale('welcome-message')}
					</h1>
					<div className="flex flex-col gap-4 w-full">
						<div className="flex items-center gap-x-2">
							<Badge>
								All
							</Badge>
							<Badge>
								Music
							</Badge>
						</div>
						<div className="grid grid-cols-4 gap-4 grid-rows-2">
							<FollowedTracksButton/>
						</div>
					</div>
					<div className="flex flex-col items-start w-full gap-4">
						<h1 className="text-white text-2xl font-semibold">
							{mainPageLocale('recommended-message')}
						</h1>
						<MainTracksList/>
					</div>
				</div>
			) : (
				<div>
					Не авторизован
				</div>
			)}
		</Wrapper>
	)
}