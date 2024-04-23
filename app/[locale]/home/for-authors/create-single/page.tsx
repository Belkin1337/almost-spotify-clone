import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Wrapper } from "@/ui/wrapper";

export default async function ForAuthorsCreateSinglePage() {
	const queryClient = new QueryClient();
	const supabase = createClient(cookies());

	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user) redirect('/home');

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Wrapper variant="page">

			</Wrapper>
		</HydrationBoundary>
	)
}