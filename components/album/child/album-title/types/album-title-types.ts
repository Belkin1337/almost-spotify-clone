import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { AlbumItemProps } from "@/components/album/types/album-types";

export const albumTitleVariants = cva("text-white truncate", {
	variants: {
		variant: {
			default: "",
			page: "font-bold text-6xl",
		}
	}
})

export interface IAlbumTitle
	extends HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof albumTitleVariants>, AlbumItemProps {
}