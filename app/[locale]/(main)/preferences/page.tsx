import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { Wrapper } from "@/ui/wrapper";
import { Preferences } from "@/components/sections/preferences/preferences";
import { getUser } from "@/lib/helpers/get-user";

type PreferencesPageProps = {
  params: Promise<{ locale: string }>
}

export default async function PreferencesPage({ 
  params
}: PreferencesPageProps) {
  const { locale } = await params;
  await getUser()
  
  setStaticParamsLocale(locale);
  const settingsLocale = await getScopedI18n('main-service.pages.settings-content.navbar')

  return (
    <Wrapper variant="page">
      <div className="flex flex-col gap-y-6 p-4">
        <h1 className="text-white text-4xl font-semibold">
          {settingsLocale('welcome-message')}
        </h1>
      </div>
      <Preferences />
    </Wrapper>
  )
}