import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageAlbumItem } from "@/components/album/components/page/page-album-item";
import { Wrapper } from "@/ui/wrapper";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function AlbumPage({
	params
}: {
	params: {
    id: string
  }
}) {
	const queryClient = new QueryClient();
	const supabase = createClient(cookies())
	const { data: { user } } = await supabase.auth.getUser()

	if (!user) redirect('/home');

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Wrapper variant="page">
				<PageAlbumItem albumId={params.id}/>
			</Wrapper>
		</HydrationBoundary>
	)
}