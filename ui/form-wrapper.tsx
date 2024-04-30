import { ReactNode } from "react";

export const FormWrapper = ({
	children
}: {
	children: ReactNode,
}) => {
	return (
		<div className="flex flex-col rounded-md p-4 bg-neutral-800 border border-neutral-800 h-full gap-x-2 gap-y-6">
			{children}
		</div>
	)
}