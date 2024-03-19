import Image from "next/image";
import { getScopedI18n } from "@/locales/server";
import { setStaticParamsLocale } from "next-international/server";
import { about, widgets } from "@/content/lang/pages";
import { IntroBrand } from "@/components/preview/intro-brand";
import { WidgetCard } from "@/components/layout/card";

export default async function BrandPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  setStaticParamsLocale(locale);

  const brandLocale = await getScopedI18n('brand.main');
  const widgetsLocale = widgets(brandLocale);

  const a_lang = await getScopedI18n('brand.about');

  const aboutLang = about(a_lang);

  return (
    <div className="flex flex-col justify-center bg-black/90 gap-y-4 pb-12">
      <div className="relative w-full bg-neutral-950 border-y-[1px] border-neutral-700 rounded-t-xl rounded-b-xl">
        <div className="h-[100vh] overflow-hidden relative rounded-t-3xl rounded-b-3xl">
          <IntroBrand />
          <Image
            alt="Image"
            width={1920}
            height={1200}
            src="/images/3.jpg"
            className="object-cover h-[1080px] absolute top-0 right-0 left-0 "
          />
        </div>
      </div>
      <div className="w-[95%] mx-auto">
        <div className="flex flex-col items-center justify-center mt-6">
          <p className="text-WHITE text-[1.6rem] xl:text-[3rem]">{brandLocale('content.intro.main-title')}
            <span className="text-neutral-400 text-[1.5rem] xl:text-[2.4rem]">
              &nbsp;{brandLocale('content.intro.main-subtitle')}
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 grid-rows-1 gap-2">
            {widgetsLocale.map((item) => (
              <WidgetCard
                key={item.title}
                title={item.title}
                content={item.content}
                image={item.image}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
          <h1 className="text-RYZADUST text-[2.4rem] text-center">
            {a_lang('main-title')}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-2">
            {aboutLang.map((item, idx) => (
              <WidgetCard
                key={idx}
                content={item.content}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}