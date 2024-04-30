import { Wrapper } from "@/ui/wrapper";
import {
	ArtistUserLikedSongsList
} from "@/components/artist/components/profile/components/artist-user-liked-songs-list";

export default async function ArtistLikedSongsPage({
	params
}: {
	params: {
		id: string
	}
}) {
	return (
		<Wrapper variant="page">
			<ArtistUserLikedSongsList artistId={params.id}/>
		</Wrapper>
	)
}