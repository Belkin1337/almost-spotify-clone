import { Typography } from "@/ui/typography"
import Image from "next/image"
import { Disc } from 'lucide-react';
import { FaCircle } from "react-icons/fa";
import { useSongPreviewState } from "@/components/forms/song/hooks/use-song-preview-state";

export const PreviewSongCard = () => {
	const { songPreviewState } = useSongPreviewState({
		song: undefined
	});
	
	const artist = songPreviewState.artists?.length! > 0 ? (songPreviewState?.artists![0].name) : ('Неизвестен')
	
	const artistsList = songPreviewState.artists?.length! > 0 ? (songPreviewState?.artists!.map(
		artist => artist?.name
	).join(', ')) : ('Неизвестен')
	
	const songTitle = songPreviewState?.title || 'Без названия'
	
	return (
		<>
			<div className="flex flex-col gap-4 w-fit">
				<div className="flex justify-center items-center w-[320px] h-[320px] bg-neutral-800 rounded-xl overflow-hidden">
					{songPreviewState?.image ? (
						<Image
							src={songPreviewState?.image}
							alt={songPreviewState.title || 'song'}
							width={400}
							height={400}
							className="object-cover w-full h-full"
							loading="lazy"
						/>
					) : <Disc size={128} className="text-neutral-600"/>}
				</div>
				<div className="flex flex-col gap-y-2 max-w-[250px]">
					<Typography className="truncate" size="large">
						{songTitle}
					</Typography>
					<Typography text_color="gray" size="large" className="truncate">
						{artistsList}
					</Typography>
				</div>
				<div className="flex items-center gap-x-2">
					<Typography text_color="gray" size="small" font="normal">
						Song
					</Typography>
					<FaCircle size={8} className="text-neutral-400"/>
					<Typography text_color="gray" size="small" font="normal">
						{artist}
					</Typography>
				</div>
			</div>
		</>
	)
}