import { ArtistEntity } from "@/types/artist";
import { ArtistCard } from "@/components/artist/components/card/components/artist-card";

export const SearchSimilarArtistsList = ({
	searchedArtists
}: {
	searchedArtists: ArtistEntity[]
}) => {
	return (
		<div className="flex items-center gap-2 w-full">
			{searchedArtists.slice(0, 8).map((artist, idx) => (
				<ArtistCard variant="search" key={artist.id} artist={artist} />
			))}
		</div>
	)
}