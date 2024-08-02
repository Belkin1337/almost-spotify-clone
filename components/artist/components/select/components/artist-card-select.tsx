import { ArtistImage } from "@/components/artist/child/artist-image/components/artist-image";
import { ArtistEntity } from "@/types/artist";
import { ArtistName } from "@/components/artist/child/artist-name/components/artist-name";
import { HTMLAttributes } from "react";
import { DeleteItemButton } from "@/ui/delete-item";

type ArtistCardSelect = {
	artist: ArtistEntity,
	isChecked?: boolean,
}

export interface IArtistCardSelect
	extends HTMLAttributes<HTMLDivElement>, ArtistCardSelect {}

export const ArtistCardSelect = ({
	isChecked, artist, ...props
}: IArtistCardSelect) => {
	return (
		<div className="flex rounded-lg gap-x-2 px-2 py-1 items-center
			w-max hover:border-jade-500 cursor-pointer group
		 hover:bg-neutral-800 bg-neutral-900 border border-neutral-700" {...props}>
			{isChecked && <DeleteItemButton/>}
			<ArtistImage artist={artist} variant="select"/>
			<ArtistName artistId={artist.id} artistName={artist.name} variant="select" className={isChecked ? '!text-jade-400' : ''}/>
		</div>
	)
}