import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from "@/lib/utils/supabase/server";
import { ProfileUserItem } from "@/components/user/personal/user-item";
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import { getUserById } from '@/lib/queries/get-user-by-id';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function Profile({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const queryClient = new QueryClient()
  const supabase = createClient(cookieStore)

  await prefetchQuery(queryClient, getUserById(supabase, params.id))

  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/home')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileUserItem userId={params.id} />
    </HydrationBoundary>
  )
}