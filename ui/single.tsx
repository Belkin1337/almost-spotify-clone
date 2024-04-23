import { HTMLAttributes } from "react";

interface ISingle extends HTMLAttributes<HTMLDivElement> {
}

const SingleImageItem = ({
	...props
}: ISingle) => {
	return (
		<div className="overflow-hidden object-cover w-[210px] h-[210px] rounded-md" {...props} />
	)
}

const SingleItem = ({
	...props
}: ISingle) => {
	return (
		<div
			className="flex flex-col p-4 min-w-[160px] min-h-[210px] gap-2 overflow-hidden rounded-md hover:bg-neutral-800 cursor-pointer outline-none border-none" {...props} />
	)
}

export {
	SingleItem,
	SingleImageItem
}