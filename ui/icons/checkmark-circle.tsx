import { IoCheckmarkCircle } from "react-icons/io5";
import React from "react";

type CheckmarkCircleVariantsType = {
	page?: boolean
}

export const CheckmarkCircleIcon = ({
	page
}: CheckmarkCircleVariantsType) => {
	return (
		<IoCheckmarkCircle
			size={page ? 44 : 18}
			className="text-jade-400"
		/>
	)
}