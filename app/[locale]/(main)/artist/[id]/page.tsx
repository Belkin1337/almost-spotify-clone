import { ArtistProfile } from "@/components/artist/components/profile/components/artist-profile";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";

export default async function ArtistPage({
	params
}: {
	params: { id: string }
}) {
	const supabase = createClient(cookies())

	const { data: { user }, error } = await supabase.auth.getUser()

	if (error || !user) redirect('/home');

	return (
		<Wrapper variant="page">
			<ArtistProfile artistId={params.id}/>
		</Wrapper>
	)
}