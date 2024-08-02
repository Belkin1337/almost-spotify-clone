import { Wrapper } from "@/ui/wrapper";

export default async function ArtistDiscographySinglesPage({
	params
}: {
	params: {
		id: string
	}
}) {
	return (
		<Wrapper variant="page">
			<div className="flex flex-col gap-y-1">
				Discography/Singles
			</div>
		</Wrapper>
	)
}