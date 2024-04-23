import { PagePlaylistItem } from "@/components/playlist/components/page-playlist-item";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlaylistPage({
	params
}: {
	params: {
		id: string
	}
}) {
	const queryClient = new QueryClient();
	const supabase = createClient(cookies())

	const { data: { user } } = await supabase.auth.getUser()

	if (!user) redirect('/home');

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PagePlaylistItem playlistId={params.id}/>
		</HydrationBoundary>
	)
}