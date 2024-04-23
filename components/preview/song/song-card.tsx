import { PreviewSongType } from "@/types/preview"
import { Typography } from "@/ui/typography"
import Image from "next/image"
import { Disc } from 'lucide-react';
import { FaCircle } from "react-icons/fa";

export const PreviewSongCard = ({
	preview
}: {
	preview: PreviewSongType
}) => {
	const songType = preview.single ? 'Single' : 'Song';
	const artist = preview.artists?.length! > 0 ? (preview?.artists![0].name) : ('Неизвестен')
	const artistsList = preview.artists?.length! > 0 ? (preview?.artists!.map(artist => artist?.name).join(', ')) : ('Неизвестен')
	const songTitle = preview?.title || 'Без названия'

	return (
		<>
			<div className="flex flex-col gap-4 w-fit">
				<div className="flex justify-center items-center w-[320px] h-[320px] bg-neutral-800 rounded-xl overflow-hidden">
					{preview?.image ? (
						<Image
							src={preview?.image}
							alt={preview.title || 'song'}
							width={400}
							height={400}
							className="object-cover w-full h-full"
							loading="lazy"
						/>
					) : (
						<Disc size={128} className="text-neutral-600"/>
					)}
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
						{songType}
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