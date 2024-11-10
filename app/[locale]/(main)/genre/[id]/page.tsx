import { GenrePageItem } from "@/components/genre/components/page/genre-page-item";
import { getUser } from "@/lib/helpers/get-user";
import { PageTypes } from "@/types/page-convention";

export default async function GenrePage({
	params
}: PageTypes) {
	const { id } = await params;
	await getUser()

	return (
		<GenrePageItem genreId={id}/>
	)
}