import { Wrapper } from "@/ui/wrapper";

export default async function ArtistDiscographyAllPage({
	params
}: {
	params: { id: string }
}) {
	return (
		<Wrapper variant="page">
			<div className="flex flex-col gap-y-1">
				Discography/All
			</div>
		</Wrapper>
	)
}