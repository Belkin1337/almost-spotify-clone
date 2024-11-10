import { Wrapper } from "@/ui/wrapper";
import { CreateSongForm } from "@/components/forms/song/components/create/components/create-song-form";
import { Typography } from "@/ui/typography";
import { getUser } from "@/lib/helpers/get-user";

export default async function ForAuthorsCreateSongPage() {
	await getUser()

	return (
		<Wrapper variant="page">
			<div className="flex flex-col gap-y-8 p-4">
				<div className="flex flex-col gap-y-2">
					<Typography variant="page_title">
						Загрузка трека
					</Typography>
					<ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
						<li>
							<Typography variant="subtitle">
								Размер файла не более 16 МБ
							</Typography>
						</li>
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
				<CreateSongForm/>
			</div>
		</Wrapper>
	)
}