import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { CreateArtistForm } from "@/components/forms/artist/components/create-artist-form";
import { getUser } from "@/lib/helpers/get-user";

export default async function ForAuthorsCreateArtistPage() {
	await getUser()

	return (
		<Wrapper variant="page">
			<div className="flex flex-col gap-y-8 p-4">
				<div className="flex flex-col gap-y-2">
					<Typography variant="page_title">
						Cоздание артиста
					</Typography>
					<ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
						<li>
							<Typography variant="subtitle">
								Это тестовая площадка, поэтому загруженный трек может быть удален в любое время без предупреждения
							</Typography>
						</li>
					</ul>
				</div>
				<CreateArtistForm/>
			</div>
		</Wrapper>
	)
}