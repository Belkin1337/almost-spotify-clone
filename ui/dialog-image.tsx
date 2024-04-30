import Image from "next/image";
import { nullAvatarImage } from "@/lib/constants/files/invalid-or-null-images";
import { Typography } from "@/ui/typography";
import { useDialog } from "@/lib/hooks/ui/use-dialog";

export const DialogImage = ({
	imageUrl,
	title
}: {
	imageUrl: string,
	title?: string
}) => {
	const { closeDialog } = useDialog();

	return (
		<div className="flex flex-col items-center justify-center gap-y-6 w-[648px] overflow-hidden">
			<Image
				src={imageUrl || nullAvatarImage}
				width={660}
				height={660}
				title={title || ""}
				loading="lazy"
				alt={title || ""}
				className="w-[648px] h-[648px] rounded-md object-cover"
			/>
			<Typography
				onClick={() => closeDialog()}
				font="bold"
				size="large"
				className="cursor-pointer hover:scale-[1.02]"
			>
				Close
			</Typography>
		</div>
	)
}