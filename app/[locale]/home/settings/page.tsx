import { Navbar } from "@/components/navbar/navbar";
import { SettingsList } from "./components/settings-list";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";

export default async function Settings({ params: { locale } }: { params: { locale: string } }) {
  setStaticParamsLocale(locale);
  const settingsLocale = await getScopedI18n('main-service.pages.settings-content.navbar')

  return (
    <div className="bg-DARK_SECONDARY_BACKGROUND rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Navbar>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">{settingsLocale('welcome-message')}</h1>
        </div>
      </Navbar>
      <SettingsList/>
    </div>
  )
}
