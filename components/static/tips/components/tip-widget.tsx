import { ITipWidget, tipWidgetVariants } from "@/components/static/tips/types/tip-widget-types";
import { X } from "lucide-react";
import { HTMLAttributes, useState } from "react";

const TipWidgetClose = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
	return <div className="absolute right-1 z-20 top-1 w-4 h-4 overflow-hidden" {...props}><X size={18}/></div>
}

export const TipWidget = ({
	variant,
	className,
	children,
	...props
}: ITipWidget) => {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	return (
		isOpen && (
			<div className={tipWidgetVariants(({ variant, className }))} {...props}>
				{children}
				<TipWidgetClose onClick={(prev) => setIsOpen(!prev)}/>
			</div>
		)
	)
}