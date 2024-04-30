import {
	FollowTrackRouteButton
} from "@/components/static/button/components/follow-tracks-button/components/follow-tracks-button";
import { useUserQuery } from "@/lib/query/user/user-query";
import { useFollowedArtistsQuery } from "@/lib/query/user/followed-artists-query";
import { usePlaylistsListByUser } from "@/lib/query/playlist/playlists-by-user-query";
import { useResizePanelsQuery } from "@/lib/query/ui/resize-panels-query";
import { memo } from "react";
import { useSortSidebarLibraryQuery } from "@/lib/query/ui/sidebar-sort-query";
import { ArtistLibraryCard } from "@/components/artist/components/library/artist-library-card";
import { PlaylistLibraryCard } from "@/components/playlist/library/playlist-library-card";

export const SidebarLibraryList = memo(() => {
	const { data: user } = useUserQuery();
	const { data: followedArtist } = useFollowedArtistsQuery(user?.id)
	const { data: createdPlaylists } = usePlaylistsListByUser(user?.id, true)
	const { data: resizeState } = useResizePanelsQuery()
	const { data: sidebarSort } = useSortSidebarLibraryQuery();

	const isExpanded = resizeState.sidebarPanel.isExpanded || false;

	if (!user) return null;

	const renderPlaylistCards = () => {
		return createdPlaylists?.map(playlist => (
			<PlaylistLibraryCard
				key={playlist.id}
				playlist={playlist}
				isExpanded={isExpanded}
			/>
		));
	};

	const renderArtistCards = () => {
		return followedArtist?.map(artist => (
			<ArtistLibraryCard
				key={artist.id}
				artist={artist}
				isExpanded={isExpanded}
			/>
		));
	};

	return (
		<div className="flex flex-col gap-y-2 mt-4 overflow-x-hidden h-full pr-2">
			<FollowTrackRouteButton isExpanded={isExpanded}/>
			{(sidebarSort.sort.all || sidebarSort.sort.playlists) && renderPlaylistCards()}
			{(sidebarSort.sort.all || sidebarSort.sort.artists) && renderArtistCards()}
		</div>
	)
})
SidebarLibraryList.displayName = "SidebarLibraryList"