"use client"

import { useScopedI18n } from "@/locales/client"
import { CiClock2 } from "react-icons/ci";
import { Typography } from "@/ui/typography";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

const songListTableHeadVariants = cva("", {
	variants: {
		type: {
			default: "",
			page: ""
		}
	},
  defaultVariants: {
    type: "default"
  }
})

interface ISongListTableHead
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof songListTableHeadVariants> {
}

export const SongListTableHead = ({
	type,
	className,
  ...props
}: ISongListTableHead) => {
	const configLocale = useScopedI18n('main-service.main-part.config')

	return (
		<div className="flex flex-col gap-y-2 w-full h-[44px] p-6" {...props}>
			<div className="flex justify-between items-center gap-y-4 w-full">
				<div className="flex flex-row items-center w-1/2">
					<Typography variant="song_table_list_attribute" className="pl-6">
						#
					</Typography>
					<Typography variant="song_table_list_attribute" className="pl-9">
						{configLocale('song-attributes.song-name')}
					</Typography>
				</div>
				{type !== 'default' && (
					<div className="flex flex-row items-center justify-between w-2/3">
						<Typography variant="song_table_list_attribute" className="pl-[2px]">
							Альбом
						</Typography>
						<Typography variant="song_table_list_attribute" className="pl-[94px]">
							Дата добавления
						</Typography>
						<div className="overflow-hidden pr-14">
							<CiClock2 size={22}/>
						</div>
					</div>
				)}
			</div>
			<hr className="border border-neutral-700 w-full h-[1px]"/>
		</div>
	)
}