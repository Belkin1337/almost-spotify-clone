import { PreviewAlbumType } from "@/types/form"
import { Typography } from "@/ui/typography"
import Image from "next/image"
import { Disc } from "lucide-react";
import { FaCircle } from "react-icons/fa";

export const PreviewAlbumCard = ({
	preview
}: {
	preview: PreviewAlbumType
}) => {
	return (
		<>
			<div className="flex flex-col gap-4 w-fit">
				<div className="flex justify-center items-center w-[320px] h-[320px] bg-neutral-800 rounded-xl overflow-hidden">
					{preview.image ? (
						<Image
							src={preview.image}
							alt="Track"
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
						{preview?.title || 'Без названия'}
					</Typography>
					<Typography text_color="gray" size="large" className="truncate">
						{preview.artists?.length! > 0 ? (
							preview?.artists!.map(artist => artist?.name).join(', ')
						) : (
							'Неизвестен'
						)}
					</Typography>
					<div className="flex items-center gap-x-2">
						<Typography text_color="gray" size="small" font="normal">
							Album
						</Typography>
						<FaCircle size={8} className="text-neutral-400"/>
						<Typography text_color="gray" size="small" font="normal">
							{preview.artists?.length! > 0 ? (
								preview?.artists![0].name
							) : (
								'Неизвестен'
							)}
						</Typography>
					</div>
				</div>
			</div>
		</>
	)
}