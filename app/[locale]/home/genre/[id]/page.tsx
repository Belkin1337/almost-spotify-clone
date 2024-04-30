import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { GenrePageItem } from "@/components/genre/components/page/genre-page-item";

export default async function GenrePage({
	params
}: {
	params: { id: string }
}) {
	const supabase = createClient(cookies())
	const { data: { user }, error } = await supabase.auth.getUser()

	if (error || !user) redirect('/home')

	return (
		<GenrePageItem genreId={params.id}/>
	)
}