import { getScopedI18n } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server";

export default async function About({ params: { locale } }: { params: { locale: string } }) {
  setStaticParamsLocale(locale);
  const a_lang = await getScopedI18n('brand.about');

  const about = [
    { content: a_lang('about-widgets.explore'), image: "/images/headphones.jpg", },
    { content: a_lang('about-widgets.connect'), image: "/images/people-listen.jpg", },
    { content: a_lang('about-widgets.connect'), image: "/images/people-listen-metro.jpg", },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black w-full gap-y-12 lg:gap-y-16 xl:gap-y-24 pb-8">
      <div className="h-[440px] overflow-hidden w-full relative">
        <img src="/images/neon-about.jpg" className="-top-60 h-[800px] w-full relative object-center object-cover" />
      </div>
      <div className="flex flex-col px-2 md:px-6 lg:px-10 xl:px-16 items-center justify-center gap-y-4">
        <h1 className="text-RYZADUST text-[2.4rem] text-center">{a_lang('main-title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-2">
          {about.map((item, idx) => (
            <div key={idx} className="bg-neutral-950 p-4 rounded-md h-full w-full">
              <img src={item.image} className="w-full object-cover h-[320px]" />
              <p className="w-full text-WHITE hovers text-[0.96rem] md:text-[1.1rem] lg:text-[1.2rem] pt-4">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}