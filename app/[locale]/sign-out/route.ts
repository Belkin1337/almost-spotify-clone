import { createClient } from '@/lib/utils/supabase/server/supabase-server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const cookie = cookies()
  const supabase = createClient(cookie)

  const { data: { user }, } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')

  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  })
}