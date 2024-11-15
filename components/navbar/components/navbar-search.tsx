import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/ui/input";
import { useScopedI18n } from "@/locales/client";

export const NavbarSearch = () => {
  const [value, setValue] = useState<string>('');
  const { push } = useRouter();

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchLocale = useScopedI18n('main-service.pages.search-content')

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
  }
  
  useEffect(() => {
    if (value)
      push(pathname + '?' + createQueryString('title', value))
     else
      push(pathname);
  }, [push, value])

  return (
    <Input
      placeholder={searchLocale('navbar.input-message')}
      value={value}
      variant="global_search"
      rounded="full"
      className="w-[360px]"
      onChange={(e) => setValue(e.target.value)}
    />
  );
}