import { Wrapper } from "@/ui/wrapper";
import { getUser } from "@/lib/helpers/get-user";

export default async function ForAuthorsCreateSinglePage() {
	await getUser()

	return (
		<Wrapper variant="page">

		</Wrapper>
	)
}