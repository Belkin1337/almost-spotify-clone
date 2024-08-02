import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server/supabase-server";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { ForAuthorsModule } from "@/ui/for-authors-block";
import {
	for_authors_route_albums,
	for_authors_route_artists,
	for_authors_route_create_album,
	for_authors_route_create_artist,
	for_authors_route_create_song,
	for_authors_route_tracks
} from "@/lib/constants/routes/routes";

export default async function ForAuthorsPage() {
	const supabase = createClient(cookies());

	const { data: { user }, error } = await supabase.auth.getUser()

	if (error || !user) redirect('/home');

	return (
		<Wrapper variant="page">
			<div className="flex flex-col p-4 gap-y-12">
				<div className="flex flex-col gap-y-2">
					<Typography variant="page_title">
						Для авторов
					</Typography>
					<Typography variant="subtitle">
						Здесь можно загрузить трек, создать, а также редактировать уже существующие альбомы.
						Все в ваших руках!
					</Typography>
				</div>
				<div className="flex flex-col gap-y-8">
					<div className="flex flex-col gap-y-2">
						<Typography size="medium" text_color="gray" font="medium">
							Моя авторская медиатека
						</Typography>
						<div className="flex items-center gap-4">
							<ForAuthorsModule
								route={for_authors_route_artists(user.id)}
								className="h-[80px]">
								<Typography className="text-3xl">
									Артисты
								</Typography>
							</ForAuthorsModule>
							<ForAuthorsModule
								route={for_authors_route_tracks(user.id)}
								className="h-[80px]">
								<Typography className="text-3xl">
									Треки
								</Typography>
							</ForAuthorsModule>
							<ForAuthorsModule
								route={for_authors_route_albums(user.id)}
								className="h-[80px]">
								<Typography className="text-3xl">
									Альбомы
								</Typography>
							</ForAuthorsModule>
						</div>
					</div>
					<div className="flex flex-col gap-y-4">
						<Typography size="medium" text_color="gray" font="medium">
							Действия
						</Typography>
						<ForAuthorsModule
							route={for_authors_route_create_artist}
							className="h-[120px]">
							<Typography className="text-3xl">
								Создать артиста
							</Typography>
						</ForAuthorsModule>
						<ForAuthorsModule
							route={for_authors_route_create_song}
							className="h-[120px]">
							<Typography className="text-3xl">
								Загрузить трек
							</Typography>
						</ForAuthorsModule>
						<ForAuthorsModule
							route={for_authors_route_create_album}
							className="h-[120px]">
							<Typography className="text-3xl">
								Создать альбом
							</Typography>
						</ForAuthorsModule>
					</div>
				</div>
			</div>
		</Wrapper>
	)
}