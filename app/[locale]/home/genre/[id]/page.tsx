// impl genre page 

import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {createClient} from "@/lib/utils/supabase/server/supabase-server";

export default async function GenrePage({
  params
}: {
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: {
    user
  }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/home')
  }

  return (
    <>
      {params.id}
    </>
  )
}