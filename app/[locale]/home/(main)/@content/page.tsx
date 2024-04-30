import { MainMusic } from "@/components/sections/main/components/category/main-music";
import { MainPodcasts } from "@/components/sections/main/components/category/main-podcasts";

export default async function HomeMainContentPage() {
	return (
		<>
			<MainMusic/>
			<MainPodcasts/>
		</>
	)
}