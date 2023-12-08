"use client"

import { useScopedI18n } from "@/locales/client";
import { LocaleProvider } from "@/providers/locale-provider";
import { useRouter } from "next/navigation";

const Github = (props: any) => (
  <svg
    fill="#000000"
    width="48px"
    height="48px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    {...props}
  >
    <path d={`M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z`} />
  </svg>
);

export const Header = () => {
  const router = useRouter();
  const header_lang = useScopedI18n('brand.main.const-components.header')

  const listComponents = [
    { name: header_lang('main'), route: "" },
    { name: header_lang('about'), route: "int/about" },
    { name: header_lang('listen'), route: "home" },
  ]

  return (
    <>
      <div className="absolute top-0 right-0 left-0 px-16 pt-8 z-10 flex flex-row h-[84px] items-center justify-between w-full">
        <div onClick={() => router.push('/')} className="flex flex-row items-center gap-x-2 cursor-pointer">
          <img src="/images/logo.png" className="w-[42px] h-[42px]" />
          <div className="center font-bold text-[1rem]">
            <p>Smotify</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-x-6">
          {listComponents.map((item, idx) => (
            <p key={idx} onClick={() => router.push(`/${item.route}`)} className="font-bold text-[1rem] text-WHITE uppercase decoration-MAIN duration-200 cursor-pointer 
          hover:underline-offset-8 hover:underline hover:duration-500 hover:transition">{item.name}</p>
          ))}
        </div>
        <div className="flex items-center justify-start">
          <Github className="rounded-md p-2 cursor-pointer bg-black fill-WHITE hover:fill-black duration-500 
        hover:bg-white hover:shadow-[3px_3px_2px_1px_#0DCECD] hover:duration-700 hover:transition" />
        </div>
      </div>
    </>
  );
}