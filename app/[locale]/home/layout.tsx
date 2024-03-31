import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server';
import { MainLayout } from '@/components/layout/main-layout';
import { UserGeneric } from '@/types/entities/user';

export default async function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: {
    user
  } } = await supabase.auth.getUser()
  
  return (
    <MainLayout user={user as UserGeneric} >
      {children}
    </MainLayout>
  )
}