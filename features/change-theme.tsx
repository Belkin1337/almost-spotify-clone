import { useScopedI18n } from "@/locales/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/ui/select"
import { Typography } from "@/ui/typography"

export const ChangeTheme = () => {
  const settingsLocale = useScopedI18n('main-service.main-part.config')

  return (
    <Select>
      <SelectTrigger className="w-[40%] bg-neutral-700 p-2 rounded-md">
        <Typography>
          {settingsLocale('error.is-not-available')}
        </Typography>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="not-available">
          {settingsLocale('error.is-not-available')}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}