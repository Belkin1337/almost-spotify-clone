import { UserTracks } from "@/components/user/components/for-authors/user-tracks/components/user-tracks";
import { Typography } from "@/ui/typography";
import { Wrapper } from "@/ui/wrapper";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";

export default async function ProfileListTracksPage({
	params
}: {
	params: { id: string }
}) {
	const supabase = createClient(cookies());

	const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/home')

	return (
		<Wrapper variant="page">
			<div className="flex flex-col gap-y-8 p-4">
				<div className="flex flex-col gap-y-2">
					<Typography variant="page_title">
						Треки
					</Typography>
					<ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
						<li>
							<Typography variant="subtitle">
								Здесь расположен список загруженных вами треков
							</Typography>
						</li>
					</ul>
				</div>
				<UserTracks userId={params.id}/>
			</div>
		</Wrapper>
	)
}