import { getScopedI18n } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server";

export function getStaticParams() {
  return getStaticParams();
}

export default async function About({ params: { locale } }: { params: { locale: string } }) {
  setStaticParamsLocale(locale);
  const a_lang = await getScopedI18n('brand.about');

  const about = [
    { content: a_lang('about-widgets.explore'), image: "/images/headphones.jpg", },
    { content: a_lang('about-widgets.connect'), image: "/images/people-listen.jpg", },
    { content: a_lang('about-widgets.connect'), image: "/images/people-listen-metro.jpg", },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black w-full gap-y-24 pb-8">
      <div className="h-[440px] overflow-hidden w-full relative">
        <img src="/images/neon-about.jpg" className="-top-60 h-[800px] w-full relative object-center object-cover" />
      </div>
      <div className="flex flex-col px-16 items-center justify-center gap-y-4">
        <h1 className="text-RYZADUST text-[2.4rem]">{a_lang('main-title')}</h1>
        <div className="grid grid-cols-3 auto-rows-auto gap-2">
          {about.map((item, idx) => (
            <div key={idx} className="bg-neutral-950 p-4 rounded-md h-full">
              <img src={item.image} className="w-full object-cover h-[320px]" />
              <p className="text-WHITE hovers text-[1.2rem] pt-4 w-3/4">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
