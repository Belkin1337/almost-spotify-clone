import { SongListTableHead } from "@/ui/song-list-table-head";
import { forwardRef, HTMLAttributes } from "react"

interface ISongListWrapper extends HTMLAttributes<HTMLDivElement> {}

export const SongListWrapper = forwardRef<HTMLDivElement, ISongListWrapper>(({
	...props
}, ref) => {
	return (
		<div className="flex flex-col gap-y-2 p-6">
			<SongListTableHead/>
			<div ref={ref} className="flex flex-col gap-y-1" {...props}/>
		</div>
	)
})

SongListWrapper.displayName = 'SongListWrapper'