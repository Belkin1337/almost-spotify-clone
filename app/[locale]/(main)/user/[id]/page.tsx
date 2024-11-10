import { ProfileUser } from '@/components/user/components/profile/components/user-profile';
import { UserEntity } from '@/types/user';
import { Wrapper } from "@/ui/wrapper";
import { getUser } from "@/lib/helpers/get-user";

export const fetchCache = 'force-no-store'

type ProfilePageProps = {
	params: Promise<{ id: string }>
}

export default async function ProfilePage({
	params
}: ProfilePageProps) {
	const { id } = await params;
	const user = await getUser();

	return (
		<Wrapper variant="page">
			<ProfileUser userId={id} user={user as UserEntity}/>
		</Wrapper>
	)
}