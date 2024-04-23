import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { AlbumEntity } from "@/types/album";

export const albumTitleVariants = cva("text-white truncate", {
	variants: {
		variant: {
			default: "",
			page: "font-bold text-6xl",
		}
	}
})

export interface IAlbumTitle
	extends React.HTMLAttributes<HTMLParagraphElement>,
		VariantProps<typeof albumTitleVariants> {
	album: AlbumEntity
}