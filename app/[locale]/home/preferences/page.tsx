import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import { Wrapper } from "@/ui/wrapper";
import { PreferencesList } from "@/components/lists/preferences/preferences";

export default async function PreferencesPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: { 
    user 
  }, error } = await supabase.auth.getUser()

  setStaticParamsLocale(locale);
  
  const settingsLocale = await getScopedI18n('main-service.pages.settings-content.navbar')

  if (error || !user) {
    redirect('/home')
  }

  return (
    <Wrapper variant="page">
      <div className="flex flex-col gap-y-6 p-4">
        <h1 className="text-white text-4xl font-semibold">
          {settingsLocale('welcome-message')}
        </h1>
      </div>
      <PreferencesList />
    </Wrapper>
  )
}