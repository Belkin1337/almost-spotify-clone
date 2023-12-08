"use client"

import { useScopedI18n } from "@/locales/client"
import Link from "next/link"

export const Footer = () => {
  const footer_lang = useScopedI18n('brand.main.const-components.footer')

  return (
    <div className="flex flex-col md:flex-row items-center justify-between relative bottom-0 right-0 left-0 px-2 md:px-6 lg:px-10 xl:px-16 py-6 lg:py-4 h-[84px] w-full">
      <div className="flex flex-row items-center justify-between gap-x-2 cursor-pointer">
        <Link href="https://pureawake.ru">
          <img src="/images/pureawake.png" className="w-[42px] h-[42px]" />
        </Link>
        <div className="center font-bold text-[1rem]">
          <p>pureawake</p>
        </div>
      </div>
      <p className="text-neutral-400 underline underline-offset-8 text-[0.8rem] xl:text-[1.4rem]">
        {footer_lang('not-real-project')}
      </p>
    </div>
  )
}