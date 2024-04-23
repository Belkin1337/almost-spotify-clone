import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { UserAlbums } from "@/components/user/components/for-authors/user-albums/components/user-albums";

export default async function ProfileListAlbumsPage() {
  return (
    <Wrapper variant="page">
      <div className="flex flex-col gap-y-8 p-4">
        <div className="flex flex-col gap-y-2">
          <Typography variant="page_title">
            Альбомы
          </Typography>
          <ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
            <li>
              <Typography variant="subtitle">
                Здесь расположен список созданных вами альбомов
              </Typography>
            </li>
          </ul>
        </div>
        <UserAlbums/>
      </div>
    </Wrapper>
  )
}