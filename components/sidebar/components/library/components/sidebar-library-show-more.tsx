import { ArrowRight } from 'lucide-react';
import { UserTips } from "@/components/tooltip/components/action";
import { Button } from "@/ui/button";

export const SidebarLibraryShowMore = () => {
	return (
		<UserTips action="Show more">
			<Button variant="selected" align="centered">
				<ArrowRight size={22} className="text-neutral-400"/>
			</Button>
		</UserTips>
	)
}