import { ArtistProfile } from "@/components/artist/components/profile/components/artist-profile";
import { Wrapper } from "@/ui/wrapper";
import { getUser } from "@/lib/helpers/get-user";

export default async function ArtistPage({
	params
}: {
	params: { id: string }
}) {
	await getUser()

	return (
		<Wrapper variant="page">
			<ArtistProfile artistId={params.id}/>
		</Wrapper>
	)
}