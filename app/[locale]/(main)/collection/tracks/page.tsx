import { Wrapper } from "@/ui/wrapper";
import { ColoredBackground } from "@/ui/colored-background";
import { LikedSongsPreview } from "@/components/sections/collection/liked-songs/components/liked-songs-preview";
import { LikedSongsList } from "@/components/sections/collection/liked-songs/components/liked-songs-list";
import { getUser } from "@/lib/helpers/get-user";

export default async function FollowedSongsPage() {
	await getUser()

	return (
		<Wrapper variant="page">
			<ColoredBackground type="liked_songs"/>
			<LikedSongsPreview />
			<div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md min-h-screen h-full">
				<LikedSongsList />
			</div>
		</Wrapper>
	);
}