import { setStaticParamsLocale } from "next-international/server";
import Image from "next/image";
import { PageTypes } from "@/types/page-convention";

export default async function About({ 
  params
}: PageTypes) {
  const { locale } = await params;
  
  setStaticParamsLocale(locale);

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