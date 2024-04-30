import { ToastAction } from "@/ui/toast";
import Image from "next/image";

export const LikeSongNotify = ({
	variantToast
}: {
	variantToast: {
		message: string,
		variant: "right" | "red"
	}
}) => {
	return (
		<ToastAction
			altText={`${variantToast.message}`}
			className="rounded-md p-0 overflow-hidden h-[36px] w-[36px]">
			<Image
				src="/images/liked.png"
				width={36}
				height={36}
				alt={`${variantToast.message}`}
			/>
		</ToastAction>
	)
}