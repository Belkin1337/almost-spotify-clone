import { Navbar } from "@/components/navbar/navbar";
import { SettingsList } from "./components/settings-list";

export default function Settings() {
  return (
    <div className="bg-DARK_SECONDARY_BACKGROUND rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Navbar>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Настройки</h1>
        </div>
      </Navbar>
      <SettingsList/>
    </div>
  )
}
