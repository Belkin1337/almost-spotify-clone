import { UserTracks } from "@/components/user/components/for-authors/user-tracks/components/user-tracks";
import { Typography } from "@/ui/typography";
import { Wrapper } from "@/ui/wrapper";
import { PageTypes } from "@/types/page-convention";
import { getUser } from "@/lib/helpers/get-user";

export default async function ProfileListTracksPage({
	params
}: PageTypes) {
	const { id } = await params;
	await getUser()
	
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
				<UserTracks userId={id}/>
			</div>
		</Wrapper>
	)
}