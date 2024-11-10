import { PagePlaylistItem } from "@/components/playlist/components/page/page-playlist-item";
import { getUser } from "@/lib/helpers/get-user";
import { PageTypes } from "@/types/page-convention";

export default async function PlaylistPage({
	params
}: PageTypes) {
	const { id } = await params;
	await getUser()

	return (
		<PagePlaylistItem id={id}/>
	)
}