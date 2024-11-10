import { Wrapper } from "@/ui/wrapper";
import { SingleItemPage } from "@/components/single/page/single-item-page";
import { PageTypes } from "@/types/page-convention";
import { getUser } from "@/lib/helpers/get-user";

export default async function SinglePage({
	params
}: PageTypes) {
	const { id } = await params;
	await getUser()

	return (
		<Wrapper variant="page">
			<SingleItemPage singleId={id}/>
		</Wrapper>
	)
}