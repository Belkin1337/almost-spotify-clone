import { MdMusicNote } from "react-icons/md";

export const SkeletonPlaylistImage = () => {
	return (
		<div className="flex w-[224px] rounded-md bg-neutral-800 h-[224px] items-center justify-center">
			<MdMusicNote size={64}/>
		</div>
	)
}