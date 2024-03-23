import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { HydrationBoundary } from "@tanstack/react-query";
import { Wrapper } from "@/ui/wrapper";

export default async function ForAuthorsCreateAlbumPage() {
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
        <div className="p-4">
          
        </div>
      </Wrapper>
    </HydrationBoundary>
  )
}