import { LuPlusCircle } from "react-icons/lu";
import React from "react";

type PlusIconVariantsType = {
	page?: boolean
}

export const PlusIcon = ({
	page
}: PlusIconVariantsType) => {
	return (
		<LuPlusCircle
			className={page ? "text-neutral-400" : ''}
			size={page ? 44 : 22}
		/>
	)
}