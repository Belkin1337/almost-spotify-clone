import { TbPlaylist } from "react-icons/tb";

export const MediaLibraryIcon = ({ ...props }) => {
	return (
		<TbPlaylist
			className="text-neutral-400"
			size={46}
			{...props}
		/>
	)
}