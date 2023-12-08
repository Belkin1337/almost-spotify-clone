import { createI18nServer } from 'next-international/server'
 
export const { getI18n, getCurrentLocale, getScopedI18n, getStaticParams } = createI18nServer({
  ru: () => import('./dictionaries/ru'),
  en: () => import('./dictionaries/en'),
  sp: () => import('./dictionaries/sp')
})