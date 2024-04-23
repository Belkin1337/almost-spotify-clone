import { Wrapper } from "@/ui/wrapper";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { SingleItemPage } from "@/components/single/page/single-item-page";

export default async function SinglePage({
	params
}: {
	params: { id: string }
}) {
	const queryClient = new QueryClient();
	const supabase = createClient(cookies());

	const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/home');

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Wrapper variant="page">
				<SingleItemPage singleId={params.id}/>
			</Wrapper>
		</HydrationBoundary>
	)
}