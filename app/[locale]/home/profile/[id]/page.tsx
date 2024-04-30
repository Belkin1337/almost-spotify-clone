import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { ProfileUser } from '@/components/user/components/profile/components/user-profile';
import { UserEntity } from '@/types/user';
import { Wrapper } from "@/ui/wrapper";

export default async function ProfilePage({
	params
}: {
	params: { id: string }
}) {
	const supabase = createClient(cookies())
	const { data: { user }, error } = await supabase.auth.getUser()

	if (error || !user) redirect('/home')

	return (
		<Wrapper variant="page">
			<ProfileUser userId={params.id} user={user as UserEntity}/>
		</Wrapper>
	)
}