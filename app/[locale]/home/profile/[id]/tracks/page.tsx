// impl logic sort trakcs by artist

import { UserTracksList } from "@/components/user/content/user-tracks-list";
import { Typography } from "@/ui/typography";
import { Wrapper } from "@/ui/wrapper";

export default async function ProfileListTracksPage() {
  return (
    <Wrapper variant="page">
      <div className="flex flex-col gap-y-8 p-4">
        <div className="flex flex-col gap-y-2">
          <Typography className="text-4xl font-semibold">
            Треки
          </Typography>
          <ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
            <li>
              <Typography className="text-md font-medium !text-neutral-400">
                Здесь расположен список загруженных вами треков
              </Typography>
            </li>
          </ul>
        </div>
        <UserTracksList />
      </div>
    </Wrapper>
  )
}