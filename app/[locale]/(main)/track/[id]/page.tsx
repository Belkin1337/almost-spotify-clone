import { SongItemPage } from "@/components/song/components/page/page-song-item";
import { getSongById } from "@/lib/queries/song/single/get-song-by-id";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { songByParamIdQueryKey } from "@/lib/querykeys/song";
import { Wrapper } from "@/ui/wrapper";

export default async function SongPage({
	params
}: {
	params: { id: string }
}) {
	const queryClient = new QueryClient();
	const supabase = createClient(cookies())

	const { data: { user }, error } = await supabase.auth.getUser()

	await queryClient.prefetchQuery({
		queryKey: songByParamIdQueryKey(params.id),
		queryFn: async () => {
			const supabase = createClient(cookies())

			return await getSongById(supabase, params.id)
		}
	})

	if (!user || error) redirect('/home')

	return (
		<Wrapper variant="page">
			<SongItemPage songId={params.id}/>
		</Wrapper>
	)
}