import { BookOpenIcon } from "@/ui/icons/book-open-icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";

export const Tip = ({
	action
}: {
	action: string
}) => {
	return (
		<Tooltip>
			<TooltipTrigger className="rounded-full overflow-hidden p-1">
				<BookOpenIcon/>
			</TooltipTrigger>
			<TooltipContent>
				{action}
			</TooltipContent>
		</Tooltip>
	)
}