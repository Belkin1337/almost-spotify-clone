import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from "@/lib/utils/supabase/server";
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { ProfileUserItem } from '@/components/user/profile';
import { UserGeneric } from '@/types/entities/user';

export default async function ProfilePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const cookieStore = cookies()
  const queryClient = new QueryClient()
  const supabase = createClient(cookieStore)

  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/home')
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileUserItem userId={params.id} user={user as UserGeneric} />
    </HydrationBoundary>
  )
}