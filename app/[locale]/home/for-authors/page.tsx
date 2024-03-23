import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { Wrapper } from "@/ui/wrapper";
import { Typography } from "@/ui/typography";
import { ForAuthorsActions } from "@/components/lists/for-authors/child/for-authors-actions";

export default async function ForAuthorsPage() {
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
        <div className="flex flex-col p-4 gap-y-12">
          <div className="flex flex-col gap-y-2">
            <Typography className="text-4xl font-semibold">
              Для авторов
            </Typography>
            <Typography className="text-md font-medium !text-neutral-400">
              Здесь можно загрузить трек, создать, а также редактировать уже существующие альбомы.
              Все в ваших руках!
            </Typography>
          </div>
          <div className="flex flex-col gap-y-8">
            <ForAuthorsActions />
          </div>
        </div>
      </Wrapper>
    </HydrationBoundary>
  )
}