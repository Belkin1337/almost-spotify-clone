import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { CreateAlbumForm } from "@/components/forms/album/components/create-album-form";
import { getUser } from "@/lib/helpers/get-user";

export default async function ForAuthorsCreateAlbumPage() {
	await getUser()

	return (
		<Wrapper variant="page">
			<div className="flex flex-col gap-y-8 p-4">
				<div className="flex flex-col gap-y-2">
					<Typography
						text_color="white"
						variant="page_title"
					>
						Cоздание альбома
					</Typography>
					<ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
						<li>
							<Typography variant="subtitle">
								Треки не должны нарушать АП
							</Typography>
						</li>
						<li>
							<Typography variant="subtitle">
								Это тестовая площадка, поэтому загруженный трек может быть удален в любое время без предупреждения
							</Typography>
						</li>
					</ul>
				</div>
				<CreateAlbumForm/>
			</div>
		</Wrapper>
	)
}