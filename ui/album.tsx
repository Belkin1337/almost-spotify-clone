import { HTMLAttributes } from "react";

interface IAlbum extends HTMLAttributes<HTMLDivElement> {}

const AlbumImageItem = ({
	...props
}: IAlbum) => {
	return (
		<div className="overflow-hidden object-cover w-[210px] h-[210px] rounded-md" {...props} />
	)
}

const AlbumItem = ({
	...props
}: IAlbum) => {
	return (
		<div className="flex flex-col p-4 min-h-[210px] gap-2 overflow-hidden rounded-md hover:bg-neutral-800 cursor-pointer outline-none border-none" {...props} />
	)
}

export {
	AlbumItem,
	AlbumImageItem
}