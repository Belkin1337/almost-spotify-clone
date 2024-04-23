import { SongEntity } from "@/types/song";
import { CheckedIcon } from "@/ui/icons/checked";
import { X } from "lucide-react";
import { SongImageItem } from "@/components/song/child/song-image/components/song-image";
import { SongTitle } from "@/ui/song-title";

export const SongCardSelect = ({
	song,
	isChecked,
	...props
}: {
	song: SongEntity,
	isChecked: boolean
}) => {
	return (
		<div className="flex rounded-lg gap-x-2 px-2 py-1 items-center
		 hover:border-jade-500 cursor-pointer group w-[218px] overflow-hidden
		 hover:bg-neutral-800 bg-neutral-900 border border-neutral-700" {...props}>
			{isChecked && (
				<>
					<div className="group-hover:hidden block">
						<CheckedIcon/>
					</div>
					<div className="group-hover:block hidden">
						<X size={18} className="text-red-500"/>
					</div>
				</>
			)}
			<SongImageItem song={song} variant="select"/>
			<SongTitle title={song.title} className={isChecked ? '!text-jade-400' : ''} variant="select"/>
		</div>
	)
}