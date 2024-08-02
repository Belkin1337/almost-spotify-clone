import { Wrapper } from "@/ui/wrapper";
import {
	ArtistUserLikedSongsList
} from "@/components/artist/components/profile/components/artist-user-liked-songs-list";

type PageConvetion = {
	params: {
		id: string
	}
}

export default async function ArtistLikedSongsPage({
	params
}: PageConvetion) {
	return (
		<Wrapper variant="page">
			<ArtistUserLikedSongsList id={params.id}/>
		</Wrapper>
	)
}