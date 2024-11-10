import { PageAlbumItem } from "@/components/album/components/page/page-album-item";
import { Wrapper } from "@/ui/wrapper";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUser } from "@/lib/helpers/get-user";

export default async function AlbumPage({
	params
}: {
	params: {
		id: string
	}
}) {
	await getUser()
	
	const qc = new QueryClient();
	const dehydratedState = dehydrate(qc)
	
	return (
		<HydrationBoundary state={dehydratedState}>
			<Wrapper variant="page">
				<PageAlbumItem albumId={params.id}/>
			</Wrapper>
		</HydrationBoundary>
	)
}