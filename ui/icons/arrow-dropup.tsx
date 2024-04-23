import { IoMdArrowDropup } from "react-icons/io";
import React from "react";

export const IconArrowDropup = ({
	onClick
}: {
	onClick: () => void
}) => {
	return (
		<IoMdArrowDropup
			onClick={onClick}
			className="z-50 absolute border-none group-hover:opacity-100 opacity-0  top-1 right-0 w-[24px] h-[24px] bg-black/60 backdrop-blur backdrop-filter rounded-full hover:scale-[1.16]"
		/>
	)
}