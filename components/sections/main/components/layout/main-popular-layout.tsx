import { ReactNode } from "react";
import { Typography } from "@/ui/typography";

export const MainPopularLayout = ({
	title,
	children,
}: {
	title: string,
	children: ReactNode,
}) => {
	return (
		<div className="flex flex-col gap-y-4">
			<Typography className="text-xl" font="bold">
				{title}
			</Typography>
			<div className="grid grid-flow-col-dense grid-rows-1 gap-1">
				{children}
			</div>
		</div>
	)
}