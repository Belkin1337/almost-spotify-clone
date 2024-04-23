import qs from "querystring"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Input } from "@/ui/input";
import { useScopedI18n } from "@/locales/client";

export const NavbarSearch = () => {
  const [value, setValue] = useState<string>('');
  const searchLocale = useScopedI18n('main-service.pages.search-content')
  const { push } = useRouter();

  useEffect(() => {
    if (value) {
      const url = qs.stringify({ title: `${value}`})
  
      push(`search/?` + url)
    } else {
      push(`search/`)
    }
  }, [push, value])

  return (
    <Input
      placeholder={searchLocale('navbar.input-message')}
      value={value}
      variant="search"
      rounded="full"
      className="w-[360px]"
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  );
}