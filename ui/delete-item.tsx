import { HTMLAttributes } from "react";
import { X } from "lucide-react";

export const DeleteItemButton = ({
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className="flex p-1 rounded-full group hover:bg-neutral-800 cursor-pointer"
			{...props}
		>
			<X
				size={18}
				className="group-hover:text-red-500 text-jade-400"
			/>
		</div>
	)
}