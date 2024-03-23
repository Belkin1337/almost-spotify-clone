import { useScopedI18n } from "@/locales/client"
import { Typography } from "@/ui/typography"
import React from "react"

export const FollowedPreviewTitle = () => {
  const likedPageLocale = useScopedI18n('main-service.pages.liked-content.navbar')

  return (
    <>
      <Typography className="hidden md:block text-white font-semibold text-xl">
        {likedPageLocale('welcome-message')}
      </Typography>
      <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
        {likedPageLocale('subtitle-message')}
      </h1>
    </>
  )
}