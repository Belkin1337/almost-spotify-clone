import { about } from "@/content/lang/pages";
import { getScopedI18n } from "@/locales/server"
import { setStaticParamsLocale } from "next-international/server";
import Image from "next/image";

export default async function About({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  setStaticParamsLocale(locale);
  const a_lang = await getScopedI18n('brand.about');
  const aboutLang = about(a_lang);

  return (
    <div className="flex flex-col min-h-screen bg-black w-full gap-y-12 lg:gap-y-16 xl:gap-y-24 pb-8">
      <div className="h-[440px] overflow-hidden w-full relative">
        <Image
          width={2560}
          height={1440}
          src="/images/neon-about.jpg"
          alt="d"
          className="-top-60 h-[800px] w-full relative object-center object-cover"
        />
      </div>
      {/*  */}
    </div>
  )
}