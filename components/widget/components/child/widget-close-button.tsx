import { X } from "lucide-react";
import { useCallback } from "react";
import { CloseButton } from "@/ui/close-button";
import { useWidget } from "@/lib/hooks/ui/use-widget";

export const ToggleWidgetButton = () => {
	const { handleWidget } = useWidget()

	const toggleDisplay = useCallback(() => {
		handleWidget.mutate()
	}, [handleWidget]);

	return (
		<CloseButton onClick={toggleDisplay}>
			<X className="h-5 w-5"/>
		</CloseButton>
	)
}