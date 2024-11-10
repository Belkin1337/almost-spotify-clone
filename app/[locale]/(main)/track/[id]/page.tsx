import { SongItemPage } from "@/components/song/components/page/page-song-item";
import { getSongById } from "@/lib/queries/song/single/get-song-by-id";
import { QueryClient } from "@tanstack/react-query";
import { songByParamIdQueryKey } from "@/lib/querykeys/song";
import { Wrapper } from "@/ui/wrapper";
import { PageTypes } from "@/types/page-convention";

export default async function SongPage({
	params
}: PageTypes) {
	const { id } = await params;
	const qc = new QueryClient();
	
	await qc.prefetchQuery({
		queryKey: songByParamIdQueryKey(id),
		queryFn: async () => await getSongById(id)
	})
	
	return (
		<Wrapper variant="page">
			<SongItemPage songId={id}/>
		</Wrapper>
	)
}