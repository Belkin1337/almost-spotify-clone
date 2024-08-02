import { PagePlaylistItem } from "@/components/playlist/components/page/page-playlist-item";
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
	const supabase = createClient(cookies())

	const { data: { user }, error } = await supabase.auth.getUser()

	if (!user || error) redirect('/home');

	return (
		<PagePlaylistItem id={params.id}/>
	)
}