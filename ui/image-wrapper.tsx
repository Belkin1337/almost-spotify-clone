import { HTMLAttributes } from "react";

export const ImageWrapper = ({
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className="w-[224px] h-[224px]
		 overflow-hidden rounded-md shadow-lg
		 shadow-black cursor-pointer hover:scale-[1.06]
		 hover:duration-100 duration-100"
		/>
	)
}