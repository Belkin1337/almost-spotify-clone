import {
	FollowTrackRouteButton
} from "@/components/static/button/components/follow-tracks-button/components/follow-tracks-button";
import { useUserQuery } from "@/lib/query/user/user-query";
import { useFollowedArtistsQuery } from "@/lib/query/user/followed-artists-query";
import { ArtistLibraryCard } from "@/components/artist/library/artist-library-card";
import { usePlaylistsListByUser } from "@/lib/query/playlist/playlists-by-user-query";
import { PlaylistLibraryCard } from "@/components/playlist/library/playlist-library-card";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";

export const SidebarLibraryList = () => {
	const { data: user } = useUserQuery();
	const { data: followedArtist } = useFollowedArtistsQuery(user?.id)
	const { data: createdPlaylists } = usePlaylistsListByUser(user?.id, true)
	const { data: resizeState } = useResizePanelsQuery()

	const isExpanded = resizeState.sidebarPanel.isExpanded;

	if (!user) return;

	return (
		<div className="flex flex-col gap-y-2 mt-4 overflow-x-hidden h-full pr-2">
			<FollowTrackRouteButton isCollapsed={isExpanded}/>
			{createdPlaylists?.map(playlist => (
				<PlaylistLibraryCard key={playlist.id} playlist={playlist} isCollapsed={isExpanded}/>
			))}
			{followedArtist?.map(artist => (
				<ArtistLibraryCard key={artist.id} artist={artist} isCollapsed={isExpanded}/>
			))}
		</div>
	)
}