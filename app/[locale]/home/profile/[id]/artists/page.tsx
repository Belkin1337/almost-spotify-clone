import { UserArtistsList } from "@/components/user/components/for-authors/user-artists/components/user-artists-list";
import { Typography } from "@/ui/typography";
import { Wrapper } from "@/ui/wrapper";

export default async function ProfileListArtistsPage() {
  return (
    <Wrapper variant="page">
      <div className="flex flex-col gap-y-8 p-4">
        <div className="flex flex-col gap-y-2">
          <Typography variant="page_title">
            Артисты
          </Typography>
          <ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
            <li>
              <Typography variant="subtitle">
                Здесь расположен список созданных вами артистов
              </Typography>
            </li>
          </ul>
        </div>
        <UserArtistsList />
      </div>
    </Wrapper>
  )
}