"use client"

import { ChoiceLang } from "@/components/tools/lang"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"
import { Suspense } from "react"

export const Footer = () => {
  const footer_lang = useScopedI18n('brand.main.const-components.footer')

  return (
    <div className="relative bottom-0 right-0 left-0 px-16 py-4 z-10 flex flex-row h-[84px] items-center justify-between w-full">
      <div className="flex flex-row items-center justify-between gap-x-2 cursor-pointer">
        <Link href="https://pureawake.ru">
          <img src="/images/pureawake.png" className="w-[42px] h-[42px]" />
        </Link>
        <div className="center font-bold text-[1rem]">
          <p>pureawake</p>
        </div>
      </div>
      <Suspense>
        <ChoiceLang />
      </Suspense>
      <p className="text-neutral-400 underline underline-offset-8 text-[1.4rem]">{footer_lang('not-real-project')}</p>
    </div>
  )
}