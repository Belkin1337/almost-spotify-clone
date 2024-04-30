import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";
import { ColoredBackground } from "@/ui/colored-background";
import { LikedSongsPreview } from "@/components/sections/collection/liked-songs/components/liked-songs-preview";
import { LikedSongsList } from "@/components/sections/collection/liked-songs/components/liked-songs-list";

export default async function FollowedSongsPage() {
	const supabase = createClient(cookies())
	const { data: { user }, error } = await supabase.auth.getUser()

	if (error || !user) redirect('/home')

	return (
		<Wrapper variant="page">
			<ColoredBackground type="liked_songs"/>
			<LikedSongsPreview userId={user.id}/>
			<div className="flex flex-col bg-black/20 backdrop-filter backdrop-blur-md min-h-screen h-full">
				<LikedSongsList userId={user.id}/>
			</div>
		</Wrapper>
	);
}