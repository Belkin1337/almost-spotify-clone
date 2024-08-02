import { Wrapper } from "@/ui/wrapper";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SingleItemPage } from "@/components/single/page/single-item-page";

export default async function SinglePage({
	params
}: {
	params: { id: string }
}) {
	const supabase = createClient(cookies());

	const { data: { user }, error } = await supabase.auth.getUser();

	if (!user || error) redirect('/home');

	return (
		<Wrapper variant="page">
			<SingleItemPage singleId={params.id}/>
		</Wrapper>
	)
}