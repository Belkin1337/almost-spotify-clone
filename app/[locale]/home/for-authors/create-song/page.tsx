import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { Wrapper } from "@/ui/wrapper";
import { CreateSongForm } from "@/components/forms/media/song/create-song";
import { Typography } from "@/ui/typography";

export default async function ForAuthorsCreateSongPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: {
    user
  }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/home')
  }

  return (
    <HydrationBoundary>
      <Wrapper variant="page">
        <div className="flex flex-col gap-y-8 p-4">
          <div className="flex flex-col gap-y-2">
            <Typography className="text-4xl font-semibold">
              Загрузка трека
            </Typography>
            <ul role="list" className="marker:text-red-500 list-disc pl-5 space-y-3 text-slate-400">
              <li>
                <Typography className="text-md font-medium !text-neutral-400">
                  Размер файла не более 16 МБ
                </Typography>
              </li>
              <li>
                <Typography className="text-md font-medium !text-neutral-400">
                  Треки не должны нарушать АП
                </Typography>
              </li>
              <li>
                <Typography className="text-md font-medium !text-neutral-400">
                  Это тестовая площадка, поэтому загруженный трек может быть удален в любое время без предупреждения
                </Typography>
              </li>
            </ul>
          </div>
          <CreateSongForm />
        </div>
      </Wrapper>
    </HydrationBoundary>
  )
}