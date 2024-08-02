import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";

export default async function ForAuthorsCreateSinglePage() {
	const supabase = createClient(cookies());

	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user) redirect('/home');

	return (
		<Wrapper variant="page">

		</Wrapper>
	)
}