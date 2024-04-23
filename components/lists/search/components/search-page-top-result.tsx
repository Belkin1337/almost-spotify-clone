import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { SongItemTitle } from "@/components/song/child/song-title/components/song-title";
import { SongEntity } from "@/types/song";

export const SearchPageTopResult = ({
	song
}: {
	song: SongEntity
}) => {
	return (
		<div className="flex gap-y-4 flex-col w-full bg-neutral-900 hover:bg-neutral-800 cursor-pointer rounded-md p-4">
			<div className="flex rounded-full w-[100px] overflow-hidden">
				<SongImageItem
					variant="card"
					className="h-[100px] w-[100px]"
					song={song}
				/>
			</div>
			<SongItemTitle
				variant="card"
				song={song}
			/>
		</div>
	)
}